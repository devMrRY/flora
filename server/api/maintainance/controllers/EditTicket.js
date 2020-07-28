const Services = require("../../../services/network");
const ImageUpload = require("../../../services/imageUpload");
const AddNote = require("../../../services/addNote");

const EditTicket = async (req, res) => {
  try {
    if (req.body) {
      var body = {
        fieldData: {
          zzId_MAIN: req.body.zzId_MAIN,
          Note: req.body.note,
        },
      };
    }
    if (req.body.note) {
      var result1 = await AddNote({ token: req.token, body });
      body.fieldData.Note = undefined;
    }
    if (req.files[0]) {
      var result = await AddNote({ token: req.token, body });
      var result2 = await ImageUpload({
        files: req.files,
        recordId: result.response.recordId,
        token: req.token,
      });
    }
    if (
      (result1 && result1.messages[0].message === "OK") ||
      (result2 && result2.messages[0].message === "OK")
    ) {
      let data = result2 || result1;
      return Services._response({
        res,
        data,
        msg: "Ticket updated successfully",
      });
    }
    Services._handleError({ res, err: "", data: result2 || result1 });
  } catch (error) {
    Services._handleError({ res, err: "", msg: error.message });
  }
};

module.exports = { EditTicket };
