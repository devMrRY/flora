const jwt = require("jsonwebtoken");
const fetch = require("../../helpers/Api");
const Services = require("../../../services/network");
const login = (req, res) => {
  try {
    console.log("fmToken", req.token);
    let body = {
      query: [
        {
          Email_01: "==" + req.body.email.replace("@", "\\@"),
        },
      ],
    };
    fetch({
      name: "find",
      method: "POST",
      body: body,
      layout: "web_people",
      authToken: req.token,
    }).then((result) => {
      console.log(result.response.data)
      if (result.messages[0].code == 401) {
        return Services._noContent({ res, msg: "Email Does not exist" });
      }
      if (result.messages[0].message === "OK") {
        if (
          result.response.data[0].fieldData.web_Password !== req.body.password
        ) {
          return Services._validationError({
            res,
            msg: "Password does not match",
          });
        }
        const token = jwt.sign(
          {
            id: result.response.data[0].fieldData.zzID,
            leaseId:
              result.response.data[0].portalData["People_LEPE_LeasePeople"][0][
                "People_LEPE_LeasePeople::zzid_LESE"
              ],
          },
          "secretKey"
        );
        let data = {
          token,
          userData: {
            ...result.response.data[0].fieldData,
            web_Password: undefined,
          },
        };
        return Services._response({ res, data, msg: "Logged in successfully" });
      }
      Services._handleError({ res, err: "", data: result });
    });
  } catch (error) {
    Services._handleError({ res, err: "", msg: '"Internal Server Error"' });
  }
};

module.exports = { login };
