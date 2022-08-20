const mongoose = require("mongoose");
var validator = require("email-validator");
const bcrypt = require("bcrypt");

const dbLink =
  "mongodb+srv://foodappbysushant:tY5D2soUDWSOo8Ke@cluster0.rmptetq.mongodb.net/foodApp?retryWrites=true&w=majority";

mongoose
  .connect(dbLink)
  .then((db) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: () => {
    //   return validator.validate(this.email);
    // },
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    min: 8,
    validate: () => {
      return this.confirmPassword === this.password;
    },
  },
});

// userSchema.pre("save", function (doc) {
//   console.log("Before saving!", doc);
// });

// userSchema.post("save", function () {
//   console.log("After saving!", this);
// });

userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});

// userSchema.pre("save", async function () {
//   let salt = await bcrypt.genSalt();
//   let hashedString = await bcrypt.hash(this.password, salt);
//   this.password = hashedString;
//   //let myPlainText
// });

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
