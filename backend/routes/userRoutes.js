const express = require("express");
const User = require("../models/User");
const userRouter = express.Router();

userRouter.post("/signUp", async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User Already Exists" });
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({ message: "User doesn't exists!" });
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid Email or Password" });
  }
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

module.exports = userRouter;
