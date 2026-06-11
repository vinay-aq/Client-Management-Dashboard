const express = require("express");
const router = express.Router();
const clientController = require("./client.controller");
const {authMiddleware, authorize, permissionAuthorize} = require("../auth/auth.middleware");
const {PERMISSIONS} = require("../../constants/permissions")
const upload = require("../../middlewares/upload.middleware");

router.get("/",authMiddleware, clientController.getClients);
router.get("/:id",authMiddleware, clientController.getClientById);
router.post("/",authMiddleware,upload.single("avatar"),permissionAuthorize(PERMISSIONS.CLIENT_CREATE),  clientController.createClient);
router.put("/:id",authMiddleware, upload.single("avatar"),permissionAuthorize(PERMISSIONS.updateClient), clientController.updateClient);
router.delete("/:id",authMiddleware,authorize("admin"), clientController.deleteClient);


module.exports = router;