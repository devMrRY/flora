const fetch = require("../../helpers/Api");
const Services = require("../../../services/network");
const AddNote = require("../../../services/addNote");
const ImageUpload = require("../../../services/imageUpload");

const CreateTicket = async (req, res) => {
  try {
    let body = {
      fieldData: {
        ...req.body,
        zzId_LESE: req.leaseId,
      },
    };
    console.log(body)
    const result1 = await fetch({
      name: "create_record",
      method: "POST",
      body: body,
      layout: "web_maintenance",
      authToken: req.token,
    });
    console.log(result1)

    const result2 = await fetch({
      name: "get_record",
      method: "GET",
      layout: "web_maintenance",
      record: result1.response.recordId,
      authToken: req.token,
    });
    console.log(result2)

    if (result2) {
      body = {
        fieldData: {
          zzId_MAIN: result2.response.data[0].fieldData.zzID,
        },
      };
    }
    
    const result3 = await AddNote({ token: req.token, body });
    console.log(result3)
    const result4 = await ImageUpload({
      files: req.files,
      token: req.token,
      recordId: result3.response.recordId,
    });
console.log(result4)
    if (result4.messages[0].message === "OK") {
      let data = result4.response;
      return Services._response({
        res,
        data,
        msg: "Ticket created successfully",
      });
    }
    Services._handleError({ res, err: "", data: result4 });
  } catch (error) {
    Services._handleError({ res, err: "", msg: '"Internal server error"' });
  }
};

module.exports = { CreateTicket };
