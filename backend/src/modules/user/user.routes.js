const express = require("express");
const router = express.Router();
const {authorize, authMiddleware, permissionAuthorize} = require("../auth/auth.middleware")
const userController = require("../user/user.controller");
const {PERMISSIONS} = require("../../constants/permissions")

router.get("/",authMiddleware,permissionAuthorize(PERMISSIONS.USERS_VIEW), userController.getUsers);
router.patch("/:id/role",authMiddleware,permissionAuthorize(PERMISSIONS.USER_ROLE_UPDATE), userController.updateUserRole);
router.patch("/:id/status",authMiddleware,permissionAuthorize(PERMISSIONS.USER_STATUS_UPDATE), userController.toggleUserStatus);


module.exports = router;