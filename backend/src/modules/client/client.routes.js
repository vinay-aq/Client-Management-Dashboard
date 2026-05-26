const express = require("express");
const router = express.Router();
const clientController = require("./client.controller");
const {authMiddleware, authorize} = require("../auth/auth.middleware")
const upload = require("../../middlewares/upload.middleware");

router.get("/",authMiddleware, clientController.getClients);
router.get("/:id",authMiddleware, clientController.getClientById);
router.post("/",authMiddleware,upload.single("avatar"),authorize("admin","manager"),  clientController.createClient);
router.put("/:id",authMiddleware, upload.single("avatar"),authorize("admin","manager"), clientController.updateClient);
router.delete("/:id",authMiddleware,authorize("admin"), clientController.deleteClient);


module.exports = router;