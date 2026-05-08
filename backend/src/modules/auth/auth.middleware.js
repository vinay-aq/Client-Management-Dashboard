const UserModel = require("../user/user.model");
const jwt = require("jsonwebtoken");
const AppError = require("../../utils/AppError");

async function authMiddleware(req, res, next) {
  let accessToken = req.headers?.authorization?.split(" ")[1] ?? "";
  try {
    const decodedUser = jwt.verify(accessToken, process.env.JWT_SECRET);
    let user =  await UserModel.findOne( {_id: decodedUser.id});
    if(!user) {
      next(new AppError("User does not exist", 400));
    }
    req.user = decodedUser;
    next();
  } catch (err) {
    next(new AppError("Invalid token", 401));
  }
}

module.exports = authMiddleware;
