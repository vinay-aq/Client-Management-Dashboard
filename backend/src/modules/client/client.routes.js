import express from "express";
import * as clientController from "./client.controller.ts";
import {
  authMiddleware,
  permissionAuthorize,
} from "../auth/auth.middleware.js";
import { PERMISSIONS } from "../../constants/permissions.js";
import upload from "../../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, clientController.getClients);
router.post(
  "/:id/workflow",
  authMiddleware,
  clientController.updateClientWorkflow,
);
router.get("/:id", authMiddleware, clientController.getClientById);
router.post(
  "/",
  authMiddleware,
  upload.single("avatar"),
  permissionAuthorize(PERMISSIONS.CLIENT_CREATE),
  clientController.createClient,
);
router.put(
  "/:id",
  authMiddleware,
  upload.single("avatar"),
  permissionAuthorize(PERMISSIONS.CLIENT_EDIT),
  clientController.updateClient,
);
router.delete(
  "/:id",
  authMiddleware,
  permissionAuthorize(PERMISSIONS.CLIENT_DELETE),
  clientController.deleteClient,
);

export default router;
