const express = require('express');
const router = express.Router();
const {authMiddleware} = require("../auth/auth.middleware");
const {getActivity} = require("./activity.controller")

router.get('/', authMiddleware, getActivity);



module.exports = router;