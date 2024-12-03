const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  signUp: expressAsyncHandler(async (req, res) => {
    const {
      firstname,
      lastname,
      password,
      phone,
      email,
      organization,
      position,
      gender,
      date_of_birth,
      address,
    } = req.body;
    const {location}= req.file;
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
      organization,
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
  signIn: expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({ token });
  }),
  getAllUsers: expressAsyncHandler(async (req, res) => {
    const users = await userModel.find({});
    res.json(users);
  }),
  updateUser: expressAsyncHandler(async (req, res) => {
    const {
      firstname,
      lastname,
      phone,
      email,
      organization,
      position,
      gender,
      dob,
      address,
    } = req.body;
    const { location } = req.file;
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, {
      firstname,
      lastname,
      gender,
      phone,
      email,
      path: location,
      organization,
      position,
      dob,
      address,
    }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  }),
  logout: expressAsyncHandler(async (req, res) => {
    res.clearCookie("token");
    return res.json({ message: "User logged out" });
  })
};

module.exports = userController;
