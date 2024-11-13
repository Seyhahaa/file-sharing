const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const userController = {
  signUp: expressAsyncHandler(async (req, res) => {
    const {
      firstname,
      lastname,
      password,
      confirmPassword,
      phone,
      email,
      
      company,
      position,
      gender,
      date_of_birth,
      address,
    } = req.body;
    const {location}= req.file;

    if (password !== confirmPassword) {
      throw new Error("Passwords missmatch");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      firstname,
      lastname,
      gender,
      password: hashPassword,
      phone,
      email,
      address,
      path: location,
      company,
      position,
      date_of_birth,
    });
    const createdUser = await user.save();
    return res.status(201).json({
      message: "User registered successfully",
      user: createdUser,
    });
  }),
};

module.exports = userController;
