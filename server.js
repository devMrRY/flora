const express = require("express");
require('./connection')
// require('./crud')
const app = express();

app.listen(5000, () => {
  console.log(`Server is listening on port 5000`);
});
