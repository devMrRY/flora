const Services = require("../../../services/network");
const fetch = require("../../helpers/Api");

const GetTicket = async (req, res) => {
  try {
    if (!req.params.id) {
      return Services._handleError({ res, msg: "Id is required" });
    }
    const result2 = await fetch({
      name: "getTicket",
      method: "GET",
      layout: "web_maintenance",
      authToken: req.token,
      record:req.params.id
    });
    if (result2.messages[0].message === "OK") {
      let data = result2.response.data[0];
      return Services._response({
        res,
        data,
        msg: "Ticket data fetched successfully",
      });
    }
    Services._handleError({ res, data: result2 });
  } catch (error) {
    console.log(error)
    Services._handleError({ res, msg: '"Internal server error"' });
  }
};

module.exports = { GetTicket };
