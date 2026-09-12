import express from "express";
import * as masterController from "./master.controller.js";
import {
  authMiddleware,
  permissionAuthorize,
} from "../auth/auth.middleware.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = express.Router();

// router.get(
//   "/",
//   authMiddleware,
//   permissionAuthorize(PERMISSIONS.MASTER_VIEW),
//   masterController.getMasters,
// );

router.get("/", masterController.getMasters);
router.post(
  "/",
  authMiddleware,
  permissionAuthorize(PERMISSIONS.MASTER_MANAGE),
  masterController.createMaster,
);
router.put(
  "/:id",
  authMiddleware,
  permissionAuthorize(PERMISSIONS.MASTER_MANAGE),
  masterController.updateMaster,
);

router.delete(
  "/:id",
  authMiddleware,
  permissionAuthorize(PERMISSIONS.MASTER_MANAGE),
  masterController.deleteMaster,
);

export default router;
