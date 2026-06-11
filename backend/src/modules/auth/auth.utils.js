const jwt = require("jsonwebtoken");

function generateAccessToken(user, permissions) {
  const token = jwt.sign(
    { id: user._id, email:user.email, role: user.role , permissions: permissions},
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  return token;
}

function generateRefreshToken(user) {
  const token = jwt.sign(
    { id: user._id, email:user.email },
    process.env.JWT_SECRET_REFRESH,
    { expiresIn: "7d" },
  );

  return token;
}

function verifyRefreshToken(token) {
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET_REFRESH);
  return decodedUser;
}

module.exports = { generateAccessToken, generateRefreshToken, verifyRefreshToken };
