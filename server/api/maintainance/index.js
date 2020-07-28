const express = require("express");
const userAuth = require("../../middlewares/userAuth");
const { checkFMToken } = require("../../middlewares/fmTokenValidity");

const multer = require("multer");
const upload = multer();
const router = express.Router();

const { CreateTicket } = require("./controllers/createTicket");
const { EditTicket } = require("./controllers/EditTicket");
const {GetTicket}=require('./controllers/getTicket')

router.get('/getTicket/:id', userAuth, checkFMToken, GetTicket)
router.post(
  "/addTicket",
  userAuth,
  checkFMToken,
  upload.array("upload", 6),
  CreateTicket
);
router.post(
  "/editTicket",
  userAuth,
  checkFMToken,
  upload.array("upload", 6),
  EditTicket
);

module.exports = router;
