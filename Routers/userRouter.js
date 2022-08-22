const express = require("express");
const userRouter = express.Router();
const protectRoute = require("./authHelper");
const {
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const { application } = require("express");

// User Options
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

// Profile Page
app.user(protectRoute);

userRouter.route("userProfile").get(getUser);

// Admin Specific Function
app.use(isAuthorised(["admin"]));

userRouter.route("").get(getAllUser);

module.exports = userRouter;
