const Joi = require("@hapi/joi");

module.exports = {
  0: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
    model: "login", // Name of the model
    group: "User", // Swagger tag for apis.
    description: "login with your credentials",
  },

  1: {
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      address: Joi.string().required(),
      //path: Joi.string(),
      organization: Joi.string(),
      position: Joi.string(),
      dob: Joi.date(),
      gender: Joi.string(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required().valid(Joi.ref("password")),
    },
    model: "signup", // Name of the model
    group: "User", // Swagger tag for apis.
    description: "Signup with your information",
  },
  
  2: {
    path: {
          id: Joi.string().required(),
        },
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      address: Joi.string().required(),
      //path: Joi.string(),
      organization: Joi.string(),
      position: Joi.string(),
      dob: Joi.date(),
      gender: Joi.string(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required().valid(Joi.ref("password")),
    },
    model: "edit-user", // Name of the model
    group: "User", // Swagger tag for apis.
    description: "Edit your information",
  },
  3: {
    path: {
          id: Joi.string().required(),
        },
    model: "delete-user", // Name of the model
    group: "User", // Swagger tag for apis.
    description: "delete your user",
  },
  4: {

    model: "all-event", // Name of the model
    group: "User", // Swagger tag for apis.
    description: "Get all events post by user",
  },
  5: {
    model: "get-user", // Name of the model
    group: "User", // Swagger tag for apis.
    description: "Get user info by token",
  },

};
