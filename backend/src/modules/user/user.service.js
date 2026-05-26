const userModel = require("./user.model");

async function fetchUsers() {
  const users = await userModel.find().select("-password");
  return users;
}

async function updateUserRoleService(userId, role) {
  const updatedUser = await userModel
    .findByIdAndUpdate(userId, { role }, { new: true })
    .select("-password");
  return updatedUser.toObject();
}

async function toggleUserStatusService(userId, isActive) {
  const updatedUser = await userModel
    .findByIdAndUpdate(userId, { isActive }, { new: true })
    .select("-password");
  return updatedUser.toObject();
}

module.exports = {
  fetchUsers,
  updateUserRoleService,
  toggleUserStatusService,
};
