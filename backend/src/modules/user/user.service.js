const userModel = require("./user.model");
const AppError = require("../../utils/AppError");
const mongoose = require("mongoose");
const { createActivityService } = require("../activity/activity.service");
const { ROLE_VALUES } = require("../../constants/roles");

async function fetchUsers() {
  const users = await userModel.find().select("-password");
  return users;
}

async function updateUserRoleService(userId, role, authUser) {
  const isValid = mongoose.Types.ObjectId.isValid(userId);
  if (!isValid) {
    throw new AppError("Id is invalid", 400);
  }

  if (authUser.id === userId) {
    throw new AppError("You cannot modify your own role", 400);
  }

  const user = await userModel.findById(userId);
  if (!user) {
    throw new AppError("user is invalid", 400);
  }

  if (!ROLE_VALUES.includes(role)) {
    throw new AppError("Invalid role", 400);
  }
  const updatedUser = await userModel
    .findByIdAndUpdate(userId, { role }, { new: true })
    .select("-password");

  await createActivityService({
    message: `User ${updatedUser.name} role updated to ${updatedUser.role}`,
    entityType: "user",
    entityId: updatedUser._id,
    action: "role_updated",
    actorId: authUser.id,
    actorName: authUser.name,
    oldValue: {
      status: user.role
    },
    newValue: {
      status: updatedUser.role,
    },
  });
  return updatedUser.toObject();
}

async function toggleUserStatusService(userId, isActive, authUser) {
  const isValid = mongoose.Types.ObjectId.isValid(userId);

  if (!isValid) {
    throw new AppError("Id is invalid", 400);
  }

  if (authUser.id === userId) {
    throw new AppError("You cannot change your own status", 400);
  }

  const user = await userModel.findById(userId);
  if (!user) {
    throw new AppError("user not found", 400);
  }

  if (typeof isActive !== "boolean") {
    throw new AppError("isActive should be boolean value", 400);
  }

  const updatedUser = await userModel
    .findByIdAndUpdate(userId, { isActive }, { new: true })
    .select("-password");

  await createActivityService({
    message: `User ${updatedUser.name} is marked as ${isActive ? "active" : "inactive"}`,
    entityType: "user",
    entityId: updatedUser._id,
    action: "status_updated",
    actorId: authUser.id,
    actorName: authUser.name,
    oldValue: {
      status: isActive ? "inactive":"active"
    },
    newValue: {
      status: isActive ? "active":"inactive"
    },
  });

  return updatedUser.toObject();
}

module.exports = {
  fetchUsers,
  updateUserRoleService,
  toggleUserStatusService,
};
