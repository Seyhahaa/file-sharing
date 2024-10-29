const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");

const authController = {
  register: expressAsyncHandler(async (req, res) => {
    const { firstname, lastname, password, email, role, confirmPassword } =
      req.body;

    if (password !== confirmPassword) {
      throw new Error("Passwords missmatch");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const username = firstname.concat(" ", lastname);

    const user = new userModel({
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: hashPassword,
      email: email,
      role: role,
    });
    const createdUser = await user.save();
    return res.status(201).json({
      message: "User registered successfully",
      user: createdUser,
    });
  }),

  login: expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign({data:user._id}, process.env.JWT_SECRET,{expiresIn: '2h'})
    return res.status(200).json({ 
      message:"User logged in successfully", 
       token });
  }),

  showGoogleConsentScreen: (req, res) => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}&response_type=code&scope=openid%20profile%20email&access_type=offline`;
    return res.redirect(googleAuthUrl);
  },

  handleGoogle: expressAsyncHandler(async(req,res,next)=>{
    const { code } = req.query;
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        grant_type: 'authorization_code',
      });
     // Fetch user information using access token
    const {access_token} = data;
    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    // Perform user registration or login based on userprofile
    const user = await userModel.findOne({ email: response.data.email });
    if (!user) {
      const newUser = new userModel({
        username: response.data.name,
        firstname: response.data.given_name,
        lastname: response.data.family_name,
        email: response.data.email,
        password: access_token,
      });
      await newUser.save();
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  }),

  facebookLogin: (req, res) => {
    const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${process.env.APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=email`;
    res.redirect(url);
  },

  handleFacebook: expressAsyncHandler(async (req, res, next) => {
    const { code } = req.query;
  
      // Exchange authorization code for access token
      const { data } = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&code=${code}&redirect_uri=${process.env.REDIRECT_URI}`);
  
      const { access_token } = data;
  
      // Use access_token to fetch user profile
      const { data: profile } = await axios.get(`https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`);
      // Code to handle user authentication and retrieval using the profile data
      const user = await userModel.findOne({ email: profile.email });
      if (!user) {
        const newUser = new userModel({
          username: profile.name,
          firstname: profile.name,
          email: profile.email,
          password: access_token,
        });
        await newUser.save();
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
      res.json({ token });
  }),

};

module.exports = authController
