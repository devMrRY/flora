const jwt = require("jsonwebtoken");
const { getFMToken, updateToken } = require("../config");
const generateFMToken = require("../api/helpers/generateFMToken");

const checkFMToken = async (req, res, next) => {
  try {
    getFMToken()
      .then((token) => {
        if (token) {
          req.token = token;
        }
        next();
      })
      .catch((err) => {
        generateFMToken({}).then((freshtoken) => {
          updateToken(freshtoken);
          req.token = freshtoken;
          next();
        });
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { checkFMToken };
