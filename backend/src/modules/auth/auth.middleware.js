const UserModel = require("../user/user.model");
const jwt = require("jsonwebtoken");
const AppError = require("../../utils/AppError");

async function authMiddleware(req, res, next) {
  let accessToken = req.headers?.authorization?.split(" ")[1] ?? "";
  try {
    const decodedUser = jwt.verify(accessToken, process.env.JWT_SECRET);
    let user = await UserModel.findOne({ _id: decodedUser.id });
    if (!user) {
      next(new AppError("User does not exist", 400));
    }
    req.user = decodedUser;
    next();
  } catch (err) {
    next(new AppError("Invalid token", 401));
  }
}

function authorize(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      next(new AppError("Access denied", 403));
    }
    next();
  };
}

module.exports = { authMiddleware, authorize };
