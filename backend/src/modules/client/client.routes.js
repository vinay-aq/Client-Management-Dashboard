const express = require("express");
const router = express.Router();
const clientController = require("./client.controller");
const authMiddleware = require("../auth/auth.middleware")

router.get("/",authMiddleware, clientController.getClients);
router.get("/:id",authMiddleware, clientController.getClientById);
router.post("/",authMiddleware, clientController.createClient);
router.put("/:id",authMiddleware, clientController.updateClient);
router.delete("/:id",authMiddleware, clientController.deleteClient);


module.exports = router;