import jwt from "jsonwebtoken";
import AppError from "../../utils/AppError.js";
import type { Request, Response, NextFunction } from "express";
import { ROLE_PERMISSIONS } from "../../constants/rolePermissions.js";
import { isRoleType } from "../../constants/roles.js";
import path from "node:path";
import fs from "node:fs";

const PUBLIC_KEY = fs.readFileSync(
  path.join(process.cwd(), "keys/public_key.pem"),
  "utf8",
);

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let accessToken = req.headers?.authorization?.split(" ")[1] ?? "";
  try {
    if (!PUBLIC_KEY) {
      return next(new AppError("PUBLIC_KEY is not configured", 400));
    }

    const user = jwt.verify(accessToken, PUBLIC_KEY);

    if (typeof user === "string") {
      return next(new AppError("Invalid token", 400));
    }

    const role = user?.role?.name;

    if (!isRoleType(role)) {
      return next(new AppError("Invalid role", 400));
    }

    const permissions = ROLE_PERMISSIONS[role] || [];

    req.user = {
      id: user.id,
      name: user.name,
      role: {
        id: user.role.id,
        name: user.role.name,
        description: user.role.description,
        code: user.role.code,
        isActive: user.role.isActive,
        createdAt: user.role.createdAt,
        updatedAt: user.role.updatedAt,
      },
      permissions,
    };
    next();
  } catch (err) {
    return next(
      new AppError(
        err instanceof Error ? err.message : "Something went wrong, in auth",
        401,
      ),
    );
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
