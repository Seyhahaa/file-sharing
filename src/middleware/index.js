const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/authModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const handleError = (err, req, res, next) => {
    return res.status(400).json(err.message)
}

function handleValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
const verifyJWT = expressAsyncHandler(async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const extract = token.split(' ')[1]
    const decoded = jwt.verify(extract, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.data)
    //console.log(user)
    req.user = user;
    next();
  })

module.exports = {handleError,verifyJWT,handleValidation}