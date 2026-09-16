import jwt, { Secret } from "jsonwebtoken";
import AppError from "../../utils/AppError.js";
import prisma from "../../db/prisma.js";
import type { Request, Response, NextFunction } from "express";

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

    const decodedUser = jwt.verify(accessToken, process.env.JWT_SECRET) ;
    let user = await prisma.user.findUnique({ where: { id: decodedUser.id } });
    if (!user) {
      return next(new AppError("User does not exist", 400));
    }
    req.user = decodedUser;
    next();
  } catch (err) {
    return next(new AppError(err || "Invalid token", 401));
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
