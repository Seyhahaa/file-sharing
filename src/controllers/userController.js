const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const userController = {
  signUp: expressAsyncHandler(async (req, res) => {
    const {
      firstname,
      lastname,
      password,
      phone,
      email,
      company,
      position,
      gender,
      date_of_birth,
      address,
    } = req.body;
    //const {location}= req.file;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      firstname,
      lastname,
      gender,
      password: hashPassword,
      phone,
      email,
      address,
      company,
      position,
      date_of_birth,
    });
    const createdUser = await user.save();
    delete user.password
    return res.status(201).json({
      message: "User registered successfully",
      user: createdUser,
    });
  }),
};

module.exports = userController;
