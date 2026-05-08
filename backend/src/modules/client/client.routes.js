const express = require("express");
const router = express.Router();
const clientController = require("./client.controller");
const authMiddleware = require("../auth/auth.middleware")

router.get("/",authMiddleware, clientController.getClients);


module.exports = router;