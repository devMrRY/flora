const fs = require("fs");
const jwt = require("jsonwebtoken");

function updateToken(value) {
  let token = jwt.sign({ token: value }, "secretKey", { expiresIn: 15 * 60 });
  return new Promise((resolve, reject) => {
    fs.writeFile("server/fmtoken.json", JSON.stringify(token), (err, data) => {
      if (err) throw err;
      resolve(data);
    });
  });
}

function getFMToken() {
  return new Promise((resolve, reject) => {
    fs.readFile("server/fmtoken.json", "utf8", (err, data) => {
      if (err) reject(err);
      try {
        let decoded = jwt.verify(JSON.parse(data), "secretKey");
        resolve(decoded.token);
      } catch (error) {
        reject(error);
      }
    });
  });
}

module.exports = { updateToken, getFMToken };
