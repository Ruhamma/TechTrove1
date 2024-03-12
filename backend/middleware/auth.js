const ErrorHandler = require("../utils/ErrorHandler");
const catchError = require("./catchError");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Checks whether the user is an authenticated or not

exports.isAuthenticated = catchError(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token)
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  // console.log("Decoded token:", decoded);
  req.user = await User.findById(decoded.id);
  next();
});

// Checks whether the user is an admin or not
exports.isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler(
        `Role (${req.user.role}) is not allowed to access this resource`,
        403
      )
    );
  }
  next();
}
