const express = require("express");
const path = require("path");
require("dotenv").config(path.resolve(process.cwd(), "./.env"));
const bodyParser = require("body-parser");
const CORS = require("cors");

const app = express();
app.use(CORS());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes")(app);

app.listen(process.env.PORT||5000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
