const express = require("express");
const cors = require("cors");

const app = express();

//middile ware

app.use(cors());
app.use(express.json());
