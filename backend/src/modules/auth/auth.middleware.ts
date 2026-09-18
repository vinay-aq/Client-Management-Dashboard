import jwt, { Secret } from "jsonwebtoken";
import AppError from "../../utils/AppError.js";
import prisma from "../../db/prisma.js";
import type { Request, Response, NextFunction } from "express";
import { ROLE_PERMISSIONS } from "../../constants/rolePermissions.js";
import { isRoleType } from "../../constants/roles.js";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let accessToken = req.headers?.authorization?.split(" ")[1] ?? "";
  try {
    if (!process.env.JWT_SECRET) {
      return next(new AppError("JWT_SECRET is not configured", 400));
    }

    const decodedUser = jwt.verify(accessToken, process.env.JWT_SECRET);

    if (typeof decodedUser === "string") {
      return next(new AppError("Invalid token", 400));
    }

    let user = await prisma.user.findUnique({
      where: { id: decodedUser.id },
      include: {
        role: true,
      },
    });
    if (!user) {
      return next(new AppError("User does not exist", 400));
    }

    const role = user?.role?.name;

    if (!isRoleType(role)) {
      return next(new AppError("Invalid role", 400));
    }

    const permissions = ROLE_PERMISSIONS[role] || [];
    console.log(user);

    req.user = {
      id: user.id,
      name: user.name,
      role: {
        id: user.role.id,
        name: user.role.name,
        description: user.role.description,
        code: user.role.code,
        isActive: user.role.isActive,
        createdAt: user.role.createdAt.toISOString(),
        updatedAt: user.role.updatedAt.toISOString(),
      },
      permissions,
    };
    next();
  } catch (err) {
    return next(new AppError("Something went wrong, auth unsuccessful", 401));
  }
}

export function authorize(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = String(req.user.role);
    if (!allowedRoles.includes(userRole)) {
      return next(new AppError("Access denied", 403));
    }
    next();
  };
}

export function permissionAuthorize(requiredPermissions: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const rolePermissions = req?.user?.permissions || [];
    const hasPermission = rolePermissions.includes(requiredPermissions);
    if (!hasPermission) {
      return next(new AppError("Forbidden", 403));
    }
    next();
  };
}
