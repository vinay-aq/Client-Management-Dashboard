import jwt from "jsonwebtoken";
import AppError from "../../utils/AppError.js";
import prisma from "../../db/prisma.js";

export async function authMiddleware(req, res, next) {
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

export function authorize(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      next(new AppError("Access denied", 403));
    }
    next();
  };
}

export function permissionAuthorize(requiredPermissions) {
  return (req, res, next) => {
    const rolePermissions = req?.user?.permissions || [];
    const hasPermission = rolePermissions.includes(requiredPermissions);
    if (!hasPermission) {
      next(new AppError("Forbidden", 403));
    }
    next();
  };
}
