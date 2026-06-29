const express = require("express");
const router = express.Router();
const masterController = require("./master.controller");
const { authMiddleware, permissionAuthorize } = require("../auth/auth.middleware");
const { PERMISSIONS } = require("../../constants/permissions")


router.get("/", authMiddleware, masterController.getMasters);
router.post("/", authMiddleware, masterController.createMaster);
router.put("/:id", authMiddleware, masterController.updateMaster);
router.delete("/:id", authMiddleware, masterController.deleteMaster);


module.exports = router;
