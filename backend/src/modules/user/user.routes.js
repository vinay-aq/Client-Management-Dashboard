const express = require("express");
const router = express.Router();
const {authorize, authMiddleware} = require("../auth/auth.middleware")
const userController = require("../user/user.controller");

router.get("/",authMiddleware,authorize("admin"), userController.getUsers);
router.patch("/:id/role",authMiddleware,authorize("admin"), userController.updateUserRole);
router.patch("/:id/status",authMiddleware,authorize("admin"), userController.toggleUserStatus);


module.exports = router;