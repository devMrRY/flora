const ApiUrl = require("./apiUrls");
const request = require("request");

module.exports = function ({ username, password, db }) {
  let body = {
    fmDataSource: [
      {
        database: db || "JCM_Development",
        username: username || "node-server",
        password: password || "h3mvLZEj6M6VLY",
      },
    ],
  };
  return new Promise((resolve, reject) => {
    request(
      {
        method: "POST",
        url: ApiUrl({ name: "generateFMToken" }),
        body,
        headers: {
          "content-type": "application/json",
          Accept: "*/*",
          Authorization: "Basic YWRtaW46Y2I5OzNZVXZhd0A=",
        },
        json: true,
      },
      (e, r, body) => {
        if (e) return reject(e);
        if (body.messages[0].code != 0) reject(body);
        resolve(body.response.token);
      }
    );
  });
};
