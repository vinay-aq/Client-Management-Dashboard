const errorMiddleware = require("../../middlewares/err.middleware");
const {
  fetchUsers,
  updateUserRoleService,
  toggleUserStatusService,
} = require("./user.service");

async function getUsers(req, res, next) {
    console.log('get users controller called')
  try {
    const users = await fetchUsers();
    return res.status(200).json({ success: true, ...users });
  } catch (err) {
    next(err);
  }
}

async function updateUserRole(req, res, next) {
  const userId = req.params.id;
  const role = req.body.role;
  try {
    const res = await updateUserRoleService();
    return res.data;
  } catch (err) {
    next(err);
  }
}

async function toggleUserStatus(req, res, next) {
  const userId = req.params.id;
  const role = req.body.isActive;
  try {
    const res = await toggleUserStatusService();
    return res.data;
  } catch (err) {
    next(err);
  }
}

module.exports = { getUsers, updateUserRole, toggleUserStatus };
