import jwt from "jsonwebtoken";
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
    const decodedUser = jwt.verify(accessToken, process.env.JWT_SECRET);
    let user = await prisma.user.findUnique({ where: { id: decodedUser.id } });
    if (!user) {
      next(new AppError("User does not exist", 400));
    }
    req.user = decodedUser;
    next();
  } catch (err) {
    next(new AppError(err || "Invalid token", 401));
  }
}

export function authorize(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = String(req.user.role);
    if (!allowedRoles.includes(userRole)) {
      next(new AppError("Access denied", 403));
    }
    next();
  };
}

export function permissionAuthorize(requiredPermissions: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const rolePermissions = req?.user?.permissions || [];
    const hasPermission = rolePermissions.includes(requiredPermissions);
    if (!hasPermission) {
      next(new AppError("Forbidden", 403));
    }
    next();
  };
}
