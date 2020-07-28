const request = require("request");
const ApiUrl = require("./apiUrls");

const Api = async ({ method, name, body, layout, authToken, formData, record }) => {
  return new Promise((resolve, reject) => {
    request(
      {
        method,
        url: ApiUrl({ layout, name, record }),
        body:body?body:undefined,
        auth: {
          bearer: authToken,
        },
        headers: {
          Accept: "*/*",
          'Content-Type': body?"application/json":'multipart/form-data',
        },
        formData:formData,
        json:true
      },
      (e, r, body) => {
        if (e) return reject(e);
        resolve(body);
      }
    );
  });
};

module.exports = Api;
