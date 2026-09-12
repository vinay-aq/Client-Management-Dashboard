import * as authService from "./auth.service.js";

export async function signupUser(req, res, next) {
  const { password, email, name } = req.body;
  try {
    await authService.registerUser(email, password, name);
    res.status(201).json("User created successfully !");
  } catch (err) {
    next(err);
  }
}

export async function loginUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const { accessToken, refreshToken, user, permissions } =
      await authService.loginUser(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.send({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        permissions,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function refreshToken(req, res, next) {
  const oldRefreshToken = req.cookies?.refreshToken;
  try {
    let { newAccessToken, newRefreshToken, user, permissions } =
      await authService.handleRefreshToken(oldRefreshToken);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.send({
      accessToken: newAccessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        permissions,
      },
    });
  } catch (err) {
    next(err);
  }
}
