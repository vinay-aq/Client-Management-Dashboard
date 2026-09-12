const AppError = require("../../utils/AppError");
const { createActivityService } = require("../activity/activity.service.ts");
const { ActivityEntityType } = require("../../generated/prisma");
const prisma = require("../../db/prisma");

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

  users = users.map((user) => ({
    ...user,
    role: user?.role?.name,
    id: user.id,
  }));

  return users;
}

async function updateUserRoleService(userId, roleId, authUser) {
  if (authUser.id === userId) {
    throw new AppError("You cannot modify your own role", 400);
  }
  userId = Number(userId);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("user is invalid", 400);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { roleId },
    omit: {
      passwordHash: true,
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

async function toggleUserStatusService(userId, isActive, authUser) {
  if (authUser.id === userId) {
    throw new AppError("You cannot change your own status", 400);
  }

  userId = Number(userId);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("user not found", 400);
  }

  if (typeof isActive !== "boolean") {
    throw new AppError("isActive should be boolean value", 400);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
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

module.exports = {
  fetchUsers,
  updateUserRoleService,
  toggleUserStatusService,
};
