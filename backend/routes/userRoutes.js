const express = require("express");
const User = require("../models/user");
const userRouter = express.Router();
const sendToken = require("../utils/jwtToken");
const catchError = require("../middleware/catchError");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated } = require("../middleware/auth");
const cloudinary = require("cloudinary");
//Sign Up
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

//Login
userRouter.post(
  "/login",
  catchError(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      // console.log(res)
      // res.status(200).json({
      //   _id: user._id,
      //   name: user.name,
      //   email: user.email,
      // });
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Get User
userRouter.get(
  "/getUser",
  isAuthenticated,
  catchError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User doesn't exist", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Update Avatar
userRouter.put(
  "/update-avatar",
  isAuthenticated,
  catchError(async (req, res, next) => {
    try {
      let existUser = await User.findById(req.user.id);
      if (req.body.avatar !== "") {
        if (!existUser) {
          return next(new ErrorHandler("User doesn't exist", 400));
        }
        if (existUser.avatar && existUser.avatar.public_id) {
          await cloudinary.v2.uploader.destroy(existUser.avatar.public_id);
        }

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "users",
        });

        existUser.avatar = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }

      await existUser.save();

      res.status(201).json({
        success: true,
        user: existUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = userRouter;
