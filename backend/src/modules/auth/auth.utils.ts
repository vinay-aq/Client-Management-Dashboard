import jwt from "jsonwebtoken";
import AppError from "../../utils/AppError.js";

type UserType = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  roleId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: {
    id: number;
    name: string;
    description: string | null;
    code: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

export function generateAccessToken(user: UserType, permissions: string[]) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new AppError("Invalid JWT secret", 400);
  }
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      permissions: permissions,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: "15m" },
  );

  return token;
}

export function generateRefreshToken(user: UserType, permissions: string[]) {
  const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH;
  if (!JWT_SECRET_REFRESH) {
    throw new AppError("Invalid JWT secret", 400);
  }
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      permissions: permissions,
      name: user.name,
    },
    JWT_SECRET_REFRESH,
    { expiresIn: "7d" },
  );

  return token;
}

export function verifyRefreshToken(token: string) {
  const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH;
  if (!JWT_SECRET_REFRESH) {
    throw new AppError("Invalid JWT secret", 400);
  }
  const decodedUser = jwt.verify(token, JWT_SECRET_REFRESH);
  return decodedUser;
}
