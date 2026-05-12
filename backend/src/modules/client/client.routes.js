const express = require("express");
const router = express.Router();
const clientController = require("./client.controller");
const authMiddleware = require("../auth/auth.middleware")

router.get("/",authMiddleware, clientController.getClients);
router.get("/:id",authMiddleware, clientController.getClientById);
router.post("/",authMiddleware, clientController.createClient);


module.exports = router;