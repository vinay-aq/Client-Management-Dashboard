const bcrypt = require("bcryptjs");
const userModel = require("../user/user.model");
const refreshTokenModel = require("./auth.model");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("./auth.utils.js");

const { ROLE_PERMISSIONS } = require("../../constants/rolePermissions");

const AppError = require("../../utils/AppError");

async function registerUser(email, password, name) {
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exist", 400);
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    password: hashedPass,
    name,
  });

  return user;
}

async function loginUser(email, password) {
  let user = await userModel.findOne({ email });
  if (!user) {
    throw new AppError(
      "Email id not present. Please register with email id, then retry again",
      400,
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Password Incorrect. Please try again", 401);
  }

  const role = user?.role;
  const permissions = ROLE_PERMISSIONS[role] || [];

  let accessToken = generateAccessToken(user, permissions);
  let refreshToken = generateRefreshToken(user);

  await refreshTokenModel.create({
    user: user.id,
    refreshToken: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { accessToken, refreshToken, user, permissions };
}

async function handleRefreshToken(oldRefreshToken) {
  if (!oldRefreshToken) {
    throw new AppError("No refresh token found!", 401);
  }
  let decodedUser = verifyRefreshToken(oldRefreshToken);
  let refreshToken = await refreshTokenModel.findOne({
    refreshToken: oldRefreshToken,
  });
  if (!refreshToken) {
    await refreshTokenModel.deleteMany({ user: decodedUser.id });
    throw new AppError(
      "Refresh token reuse detected. All sessions are revoked",
      401,
    );
  }

  if (refreshToken.expiresAt < Date.now()) {
    throw new AppError("Refresh token is exired.", 403);
  }

  let user = await userModel.findOne({ _id: decodedUser.id });
  if (!user) {
    throw new AppError("User does not exist", 400);
  }

  let newRefreshToken = generateRefreshToken(user);

  // await refreshTokenModel.deleteOne({ refreshToken: oldRefreshToken });
  await refreshTokenModel.deleteMany({ user: user._id });
  //here all the sessions of the user are revoked instead of the particular session which is requested to be refreshed.

  await refreshTokenModel.create({
    user: user.id,
    refreshToken: newRefreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  const role = user?.role;
  const permissions = ROLE_PERMISSIONS[role] || [];

  let newAccessToken = generateAccessToken(user, permissions);
  return { newAccessToken, newRefreshToken, user, permissions };
}

async function handleLogout(userId) {
  await refreshTokenModel.deleteOne({ user: userId });
}

async function handleLogoutAll(userId) {
  await refreshTokenModel.deleteMany({ user: userId });
}

module.exports = {
  registerUser,
  loginUser,
  handleRefreshToken,
  handleLogout,
  handleLogoutAll,
};
