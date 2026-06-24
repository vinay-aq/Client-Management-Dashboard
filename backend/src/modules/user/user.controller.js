const errorMiddleware = require("../../middlewares/err.middleware");
const {
  fetchUsers,
  updateUserRoleService,
  toggleUserStatusService,
} = require("./user.service");

async function getUsers(req, res, next) {
  console.log("get users controller called");
  try {
    const users = await fetchUsers();
    return res.status(200).json({ success: true, users: users });
  } catch (err) {
    next(err);
  }
}

async function updateUserRole(req, res, next) {
  const userId = req.params.id;
  const role = req.body.role;
  const authUser = req.user;
  try {
    const updatedUser = await updateUserRoleService(userId, role, authUser,);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

async function toggleUserStatus(req, res, next) {
  const userId = req.params.id;
  const role = req.body.isActive;
  const authUser = req.user;
  try {
    const updatedUser = await toggleUserStatusService(userId, role,authUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

module.exports = { getUsers, updateUserRole, toggleUserStatus };
