const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(5500, () => {
  console.log("Server running at http://localhost:5500");
});
