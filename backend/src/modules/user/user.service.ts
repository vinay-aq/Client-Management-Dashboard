import AppError from "../../utils/AppError.js";
import { createActivityService } from "../activity/activity.service.js";
import { ActivityEntityType } from "../../generated/prisma/client.js";
import prisma from "../../db/prisma.js";
import type { AuthUser } from "../auth/auth.types.js";

async function fetchUsers() {
  let users = await prisma.user.findMany({
    omit: {
      passwordHash: true,
    },
    include: {
      role: {
        select: {
          name: true,
        },
      },
    },
  });

  return users.map((user) => ({
    ...user,
    role: user?.role?.name,
    id: user.id,
  }));
}

async function updateUserRoleService(
  userId: string,
  roleId: number,
  authUser: AuthUser,
) {
  let id = Number(userId);

  if (authUser.id === id) {
    throw new AppError("You cannot modify your own role", 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    omit: {
      passwordHash: true,
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new AppError("user is invalid", 400);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { roleId },
    omit: {
      passwordHash: true,
    },
    include: {
      role: true,
    },
  });

  await createActivityService({
    message: `User ${updatedUser.name} role updated to ${updatedUser.role}`,
    entityType: ActivityEntityType.user,
    entityId: updatedUser.id,
    actorId: authUser.id,
    oldValue: {
      status: user.role,
    },
    newValue: {
      status: updatedUser.role,
    },
  });
  return updatedUser;
}

async function toggleUserStatusService(
  userId: string,
  isActive: boolean,
  authUser: AuthUser,
) {
  let id = Number(userId);

  if (authUser.id === id) {
    throw new AppError("You cannot change your own status", 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new AppError("user not found", 400);
  }

  if (typeof isActive !== "boolean") {
    throw new AppError("isActive should be boolean value", 400);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { isActive },
    omit: {
      passwordHash: true,
    },
  });

  await createActivityService({
    message: `User ${updatedUser.name} is marked as ${isActive ? "active" : "inactive"}`,
    entityType: ActivityEntityType.user,
    entityId: updatedUser.id,
    actorId: authUser.id,
    oldValue: {
      status: isActive ? "inactive" : "active",
    },
    newValue: {
      status: isActive ? "active" : "inactive",
    },
  });

  return updatedUser;
}

export { fetchUsers, updateUserRoleService, toggleUserStatusService };
