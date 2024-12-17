const Joi = require("@hapi/joi");

module.exports = {
  0: {
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    },
    model: "Register", // Name of the model
    group: "Admin", // Swagger tag for apis.
    description: "Sign Up with your credentials",
  },
  1: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
    model: "Login", // Name of the model
    group: "Admin", // Swagger tag for apis.
    description: "login with your credentials",
  },
}