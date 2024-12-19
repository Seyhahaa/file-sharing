const Joi = require("@hapi/joi");

module.exports = {
  0: {
    body: {
      title: Joi.string().required(),
      address: Joi.string().required(),
      category: Joi.string().required(),
      date: Joi.date().required(),
      description: Joi.string().required(),
      uploadBy: Joi.string(),
    },
    model: "upload", // Name of the model
    group: "Events", // Swagger tag for apis.
    description: "Upload your upcoming events",
  },
  1: {
    model: "get-all", 
    group: "Events",  
    description: "get all events",
  },
  2: {
    path: {
          id: Joi.string().required(),
        },
    model: "getEventById", // Name of the model
    group: "Events", // Swagger tag for apis.
    description: "get event by id",
  },
  3: {
    path: {
          id: Joi.string().required(),
        },
    body: {
        title: Joi.string().required(),
        address: Joi.string().required(),
        category: Joi.string().required(),
        date: Joi.string().required(),
        description: Joi.string().required(),
        uploadBy: Joi.string(),
    },
    model: "edit-event", // Name of the model
    group: "Events", // Swagger tag for apis.
    description: "Edit your information",
  },
  4: {
    path: {
          id: Joi.string().required(),
        },
    model: "delete-event", // Name of the model
    group: "Events", // Swagger tag for apis.
    description: "delete your event",
  },
 
};
