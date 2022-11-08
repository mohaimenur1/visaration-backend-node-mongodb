const express = require("express");
const cors = require("cors");

const app = express();

//middile ware

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`port running on port ${port}`);
});
