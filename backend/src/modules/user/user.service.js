const AppError = require("../../utils/AppError");
const { createActivityService } = require("../activity/activity.service");
const { ROLE_VALUES } = require("../../constants/roles");
const { ActivityEntityType } = require("../../generated/prisma");
const prisma = require("../../db/prisma");

async function fetchUsers() {
  const users = await prisma.user.findMany({
    omit: {
      passwordHash: true,
    },
  });
  return users;
}

async function updateUserRoleService(userId, role, authUser) {
  if (authUser.id === userId) {
    throw new AppError("You cannot modify your own role", 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("user is invalid", 400);
  }

  if (!ROLE_VALUES.includes(role)) {
    throw new AppError("Invalid role", 400);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role },
    omit: {
      passwordHash: true,
    },
  });

  await createActivityService({
    message: `User ${updatedUser.name} role updated to ${updatedUser.role}`,
    entityType: ActivityEntityType.user,
    entityId: updatedUser.id,
    actorId: authUser.id,
    actorName: authUser.name,
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

  const updatedUser = await prisma.user
    .update({
      where: { id: userId },
      data: { isActive },
      omit: {
        passwordHash: true,
      },
    })
   

  await createActivityService({
    message: `User ${updatedUser.name} is marked as ${isActive ? "active" : "inactive"}`,
    entityType: ActivityEntityType.user,
    entityId: updatedUser._id,
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
