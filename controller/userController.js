const userModel = require("../models/userModels");

module.exports.getUser = async function getUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    if (user) {
      return res.json(user);
    } else {
      res.json({
        message: "User not found.",
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.updateUser = async function updateUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToUpdate = req.body;
    if (user) {
      const keys = [];
      for (let key in dataToUpdate) {
        keys.push(key);
      }
      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToUpdate[keys[i]];
      }
      const updatedData = await userModel.save();
      res.json({
        message: "User's Information Update Successfully.",
      });
    } else {
      res.json({
        message: "User not found.",
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if (user) {
      res.json({
        message: "User Delete Successfully",
        data: user,
      });
    } else {
      res.json({
        message: "User not found.",
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
  
};

module.exports.getAllUser = function getAllUser(req, res) {
   try {
    let users = await userModel.find();
   if (users){
    res.json({
      message: "All Users Recieved.",
    });
   } else {
    res.json({
      message: "Users not found.",
    });
   }
   } catch (error) {
    res.json({ message: error.message });
   }
};
