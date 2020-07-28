const fetch = require("../api/helpers/Api");

module.exports = function AddNote({token, body}) {
  const server = "https://dev.jcminvestors.com";
  const database = "JCM_Development";

  return fetch({
    server,
    database,
    name: "create_note",
    method: "POST",
    body: body,
    layout: "web_note",
    authToken: token,
  });
};
