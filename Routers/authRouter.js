const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/userModels");

authRouter
  .route("/signup")
  .get(middleware1, getSignUp, middleware2)
  .post(postSignUp);

authRouter.route("/login").post(loginUser);

function middleware1(req, res, next) {
  console.log("middleware one called");
  next();
}

function middleware2(req, res, next) {
  console.log("Middleware Two  ended req/res cycle");
  res.sendFile("/public/index.html", { root: __dirname });
}

function getSignUp(req, res) {
  console.log("Get Sign Up Called");
  next();
}

async function postSignUp(req, res) {
  let data = req.body;
  let user = await userModel.create(data);
  res.json({
    message: "Signed up successfully!",
    data: user,
  });
}

async function loginUser(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        // bcrypt compare
        if (user.password === data.password) {
          return res.json({
            message: "Logged in successfully!",
            userDetails: data,
          });
        } else {
          return res.json({
            message: "Wrong Credentials!",
          });
        }
      } else {
        return res.json({
          message: "Invalid username or password!",
        });
      }
    } else {
      return res.json({
        message: "Empty field found!",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
}

module.exports = authRouter;
