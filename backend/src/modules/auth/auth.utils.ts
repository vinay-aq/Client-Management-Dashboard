import jwt from "jsonwebtoken";
import AppError from "../../utils/AppError.js";
import path from "node:path";
import fs from "node:fs";


const PRIVATE_KEY = fs.readFileSync(
  path.join(process.cwd(), "../keys/private_key.pem"),
  "utf8"
);

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
  if (!PRIVATE_KEY) {
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
    PRIVATE_KEY,
    { expiresIn: "15m" },
  );

  return token;
}

export function generateRefreshToken(user: UserType, permissions: string[]) {
  if (!PRIVATE_KEY) {
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
    PRIVATE_KEY,
    { expiresIn: "7d" },
  );

  return token;
}

export function verifyRefreshToken(token: string) {
  if (!PRIVATE_KEY) {
    throw new AppError("Invalid JWT secret", 400);
  }
  const decodedUser = jwt.verify(token, PRIVATE_KEY);
  return decodedUser;
}
