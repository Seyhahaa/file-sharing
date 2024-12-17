const Joi = require("@hapi/joi");

module.exports = {
  0: {
    body: {
      content: Joi.string().required(),
    },
    model: "comment", // Name of the model
    group: "Comments", // Swagger tag for apis.
    description: "post your comment",
  },
  1: {
    body: {
      content: Joi.string().required(),
    },
    model: "editComment", // Name of the model
    group: "Comments", // Swagger tag for apis.
    description: "Edit your comment",
  },
  2: {
    model: "getComment", // Name of the model
    group: "Comments", // Swagger tag for apis.
    description: "get your comment",
  },
  3: {
    model: "deleteComment", // Name of the model
    group: "Comments", // Swagger tag for apis.
    description: "delete your comment",
  },
}