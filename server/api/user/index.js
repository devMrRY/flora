const express = require("express");
const userAuth = require("../../middlewares/userAuth");
const { checkFMToken } = require("../../middlewares/fmTokenValidity");
const router = express.Router();

const { login } = require("./controllers/login");
const { metaData } = require("./controllers/metaData");

router.post("/login", checkFMToken, login);
router.get("/metaData", userAuth, checkFMToken, metaData);

module.exports = router;
