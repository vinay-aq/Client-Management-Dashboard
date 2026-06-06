const userModel = require("./user.model");
const AppError = require("../../utils/AppError");
const mongoose = require("mongoose");
const { createActivityService } = require("../activity/activity.service");
const { ROLE_VALUES } = require("../../constants/roles");

async function fetchUsers() {
  const users = await userModel.find().select("-password");
  return users;
}

async function updateUserRoleService(userId, role) {
  const isValid = mongoose.Types.ObjectId.isValid(userId);
  if (!isValid) {
    throw new AppError("Id is invalid", 400);
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

  await createActivityService(
    `User ${updatedUser.name} role updated to ${updatedUser.role}`,
  );
  return updatedUser.toObject();
}

async function toggleUserStatusService(userId, isActive) {
  const isValid = mongoose.Types.ObjectId.isValid(userId);

  if (!isValid) {
    throw new AppError("Id is invalid", 400);
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

  await createActivityService(
    `User ${updatedUser.name} is marked as ${isActive ? "active" : "inactive"}`,
  );

  return updatedUser.toObject();
}

module.exports = {
  fetchUsers,
  updateUserRoleService,
  toggleUserStatusService,
};
