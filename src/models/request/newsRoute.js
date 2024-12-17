const Joi = require("@hapi/joi");

module.exports = {
  0: {
    body: {
      title: Joi.string().required(),
      subTitle: Joi.string().required(),
      content: Joi.string().required(),
      uploadBy: Joi.string(),
    },
    model: "post", // Name of the model
    group: "News", // Swagger tag for apis.
    description: "Upload your Events'news articles",
  },
  1: {
    model: "get-all", 
    group: "News",  
    description: "get all news articles",
  },
  2: {
    path: {
          id: Joi.string().required(),
        },
    body: {
      title: Joi.string().required(),
      subTitle: Joi.string().required(),
      content: Joi.string().required(),
      uploadBy: Joi.string(),
    },
    model: "update", // Name of the model
    group: "News", // Swagger tag for apis.
    description: "update your Events'news articles",
  },
  3: {
    path: {
          id: Joi.string().required(),
        },
    body: {
      title: Joi.string().required(),
      subTitle: Joi.string().required(),
      content: Joi.string().required(),
      uploadBy: Joi.string(),
    },
    model: "delete", // Name of the model
    group: "News", // Swagger tag for apis.
    description: "delete your Events'news articles",
  },
}