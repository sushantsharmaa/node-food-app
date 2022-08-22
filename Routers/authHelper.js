const jwt = require("jsonwebtoken");
const JWT_KEY = "abcuyw7ygewf76ti2t";

// check user logged in or not
function protectRoute(req, res, next) {
  if (req.cookies.accessToken) {
    let isVerified = jwt.verify(req.cookies.accessToken, JWT_KEY);
    if (isVerified) {
      next();
    } else {
      return res.json({
        message: "User not verified!",
      });
    }
  } else {
    return res.json({
      message: "Operation not allowed!",
    });
  }
}

module.exports = protectRoute;
