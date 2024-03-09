const ErrorHandler = require("../utils/ErrorHandler");
const catchError = require("./catchError");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticated = catchError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  req.user = await User.findById(decoded.id);
  next();
});

// Checks whether the user is an admin or not
// exports.isAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return next(
//       new ErrorHandler(
//         `Role (${req.user.role}) is not allowed to access this resource`,
//         403
//       )
//     );
//   }
//   next();
// }
