const jwt = require("jsonwebtoken");
const Services=require('../services/network');

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(402).send("No token,authorization failed");
  }
  try {
    const decoded = jwt.decode(token, "secretKey");
    if(!decoded){
      Services._validationError({ res, err: "Session expired , please login again", msg: '"Session expired , please login again"' });
    }
    req.id = decoded.id;
    req.leaseId = decoded.leaseId;
    next();
  } catch (error) {
    res.status(402).send("Session expired , please login again");
  }
};
