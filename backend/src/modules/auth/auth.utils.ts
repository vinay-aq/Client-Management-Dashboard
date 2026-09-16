import jwt from "jsonwebtoken";

export function generateAccessToken(user, permissions) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      permissions: permissions,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  return token;
}

export function generateRefreshToken(user, permissions) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      permissions: permissions,
      name: user.name,
    },
    process.env.JWT_SECRET_REFRESH,
    { expiresIn: "7d" },
  );

  return token;
}

export function verifyRefreshToken(token) {
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET_REFRESH);
  return decodedUser;
}
