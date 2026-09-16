import express from "express";
import {
  authMiddleware,
  permissionAuthorize,
} from "../auth/auth.middleware.js";
import * as userController from "./user.controller.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  permissionAuthorize(PERMISSIONS.USERS_VIEW),
  userController.getUsers,
);
router.patch(
  "/:id/role",
  authMiddleware,
  permissionAuthorize(PERMISSIONS.USER_ROLE_UPDATE),
  userController.updateUserRole,
);
router.patch(
  "/:id/status",
  authMiddleware,
  permissionAuthorize(PERMISSIONS.USER_STATUS_UPDATE),
  userController.toggleUserStatus,
);

export default router;
