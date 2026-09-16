import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./auth.utils.js";
import prisma from "../../db/prisma.js";
import { ROLE_PERMISSIONS } from "../../constants/rolePermissions.js";
import AppError from "../../utils/AppError.js";

export async function registerUser(email, password, name) {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new AppError("User already exist", 400);
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPass,
      name,
      roleId: 9,
      isActive: true,
    },
  });

  return user;
}

export async function loginUser(email, password) {
  let user = await prisma.user.findUnique({
    where: { email },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new AppError(
      "Email id not present. Please register with email id, then retry again",
      400,
    );
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new AppError("Password Incorrect. Please try again", 401);
  }
  const role = user?.role?.name;
  const permissions = ROLE_PERMISSIONS[role] || [];

  let accessToken = generateAccessToken(user, permissions);
  let refreshToken = generateRefreshToken(user, permissions);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      refreshTokenHash: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { accessToken, refreshToken, user, permissions };
}

export async function handleRefreshToken(oldRefreshToken) {
  if (!oldRefreshToken) {
    throw new AppError("No refresh token found!", 401);
  }
  let decodedUser = verifyRefreshToken(oldRefreshToken);
  let refreshToken = await prisma.refreshToken.findFirst({
    where: {
      refreshTokenHash: oldRefreshToken,
    },
  });

  if (!refreshToken) {
    await prisma.refreshToken.deleteMany({ where: { userId: decodedUser.id } });
    throw new AppError(
      "Refresh token reuse detected. All sessions are revoked",
      401,
    );
  }

  if (refreshToken.expiresAt < Date.now()) {
    throw new AppError("Refresh token is exired.", 403);
  }

  let user = await prisma.user.findUnique({
    where: { email: decodedUser.email },
    include: {
      role: true,
    },
  });
  if (!user) {
    throw new AppError("User does not exist", 400);
  }

  let newRefreshToken = generateRefreshToken(user);

  await prisma.refreshToken.deleteMany({ where: { userId: Number(user.id) } });
  //here all the sessions of the user are revoked instead of the particular session which is requested to be refreshed.

  await prisma.refreshToken.create({
    data: {
      userId: Number(user.id),
      refreshTokenHash: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const role = user?.role?.name;
  const permissions = ROLE_PERMISSIONS[role] || [];

  let newAccessToken = generateAccessToken(user, permissions);
  return { newAccessToken, newRefreshToken, user, permissions };
}

export async function handleLogout(userId) {
  await prisma.refreshToken.deleteOne({ where: { userId } });
}

export async function handleLogoutAll(userId) {
  await prisma.refreshToken.deleteMany({ where: { userId } });
}
