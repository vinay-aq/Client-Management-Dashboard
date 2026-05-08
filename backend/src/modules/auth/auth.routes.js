const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

router.post("/signup", authController.signupUser);
router.post("/login",  authController.loginUser);
router.post("/refresh", authController.refreshToken);

module.exports = router;