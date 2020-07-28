const fetch = require("../../helpers/Api");
const Services = require("../../../services/network");

const metaData = async (req, res) => {
  try {
    let body = {
      query: [
        {
          zzId: req.leaseId,
        },
      ],
    };
    fetch({
      name: "find",
      method: "POST",
      body: body,
      layout: "web_lease",
      authToken: req.token,
    }).then((result) => {
      if (result.messages[0].code == 401) {
        return Services._noContent({ res, msg: "No record found" });
      }
      if (result.messages[0].message === "OK") {
        let data = result.response.data[0].portalData;
        return Services._response({ res, data, msg: "Logged in successfully" });
      }
      Services._handleError({ res, err: "", data: result });
    });
  } catch (error) {
    Services._handleError({ res, err: "", msg: '"internal server error"' });
  }
};

module.exports = { metaData };
