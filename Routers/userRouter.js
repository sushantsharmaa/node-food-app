const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModels");

userRouter
  .route("/")
  .get(getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/setCookies").get(setCookies);
userRouter.route("/getCookies").get(getCookies);

userRouter.route("/:id").get(getUserById);

async function getUsers(req, res) {
  let allUsers = await userModel.find();
  res.json({
    message: "Users found",
    data: allUsers,
  });
}

function postUser(req, res) {
  users = req.body;
  res.json({
    message: "Data Send Successfully",
    user: req.body,
  });
}

async function updateUser(req, res) {
  let updateUser = req.body;
  let user = await userModel.findOneAndUpdate(
    {
      email: "abhi@gmail.com",
    },
    updateUser
  );
  res.json({
    message: "User Update Successfully",
  });
}

async function deleteUser(req, res) {
  let user = await userModel.findOneAndDelete({ email: "abhi@gmail.com" });
  res.json({
    message: "User Delete Successfully",
    data: user,
  });
}

function getUserById(req, res) {
  let paramId = req.params.id;
  let obj = {};
  for (let i = 0; i < users.length; i++) {
    if (users[i]["id"] == paramId) {
      obj = users[i];
    }
    break;
  }
  res.json({
    message: "Data Request Successfully",
    data: obj,
  });
}

function setCookies(req, res) {
  res.cookie("isLogin", true, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
  });
  res.send("Cookies has been set!");
}

function getCookies(req, res) {
  let cookies = req.cookies;
  console.log(cookies);
  res.send("Cookies received!");
}

module.exports = userRouter;
