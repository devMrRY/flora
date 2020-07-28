const fetch = require("../api/helpers/Api");

module.exports = function ImageUpload({files, recordId, token}) {
  const server = "https://dev.jcminvestors.com";
  const database = "JCM_Development";

  return fetch({  
    server,
    database,
    name: "uploadImage",
    method: "POST",
    formData: {
      upload: {
        value: files[0].buffer,
        options: {
          filename: `${files[0].originalname}`,
          contentType: null,
        },
      },
    },
    record: recordId,
    layout: "web_note",
    authToken: token,
  })
};
