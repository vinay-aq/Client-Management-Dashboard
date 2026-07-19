const express = require("express");
const router = express.Router();
const masterController = require("./master.controller");
const {
  authMiddleware,
  permissionAuthorize,
} = require("../auth/auth.middleware");
const { PERMISSIONS } = require("../../constants/permissions");

// router.get(
//   "/",
//   authMiddleware,
//   permissionAuthorize(PERMISSIONS.MASTER_VIEW),
//   masterController.getMasters,
// );

router.get(
  "/",
  masterController.getMasters,
);
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

module.exports = router;
