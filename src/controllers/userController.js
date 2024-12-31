const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const eventModel = require("../models/eventModel");

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
      dob,
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
      dob,
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
    return res.status(200).json({ token });
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
    return res.status(200).json(user);
  }),
  logout: expressAsyncHandler(async (req, res) => {
    res.clearCookie("token");
    return res.json({ message: "User logged out" });
  }),
  deleteUser: expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User deleted successfully" });
  }),
  exchangeJWTToUser: expressAsyncHandler(async (req, res) => {
    console.log(req.user)
    return res.json(req.user);
  }),
  getAllEventByUser: expressAsyncHandler(async (req, res) => {
    const user = req.user
   const {limit} = req.query
    const options = {
      limit: limit ? limit : -1,
      pagination: limit ? true : false,
      populate: 'uploadBy'
  }
  //const options = new PaginationParameters(req).get();
  const events = await eventModel.paginate({uploadBy: user.id},options);

  return res.json(events);
  }),
};

module.exports = userController;
