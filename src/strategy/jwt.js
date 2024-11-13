const { Strategy, ExtractJwt } = require('passport-jwt')
const asyncHandler = require('express-async-handler');
const userModel = require('../models/authModel');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
const jwtStrategy = new Strategy(opts, asyncHandler(async (payload, done) => {
      const user = await userModel.findById(payload.id)
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
  }));

  module.exports = jwtStrategy;