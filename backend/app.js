const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser")
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

module.exports = app;