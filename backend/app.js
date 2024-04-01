const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser")
app.use(
  cors({
    origin: "https://tech-trove1-wu6u.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/test", (req, res) => {
  res.send("Hello world!");
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./.env",
  });
}

const userRouter = require("./routes/userRoutes.js");
const productRouter=require("./routes/productRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);



if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./.env",
  });
}
module.exports = app;
