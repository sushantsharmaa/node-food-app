const express = require("express");

const app = express();

app.use(express.json());

const authRouter = express.Router();

app.use("/auth/signup", authRouter);

authRouter.route("/").get(getSignUp).post(postSignUp);

function getSignUp(req, res) {
  res.sendFile("/public/index.html", { root: __dirname });
}

function postSignUp(req, res) {
  let userData = req.body;
  console.log(userData);
  res.json({
    message: "signed up!",
    data: userData,
  });
}

app.listen(5500, () => {
  console.log("Server running at http://localhost:5500");
});
