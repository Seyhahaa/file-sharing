const asyncHandler = require("express-async-handler");
const eventModel = require("../models/eventModel");
const { S3Client } = require("@aws-sdk/client-s3");
const { events } = require("../models/partnerModel");
const { uploadPartner } = require("../middleware/uploadS3");
const partnerModel = require("../models/partnerModel");

const eventController = {
    s3Client: new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      }),
      uploadEvent: async (req, res) => {
        const user = req.user;
        const location  = req.files;
        console.log(location)
        const {title, address, date, description} = req.body;
        const event = new eventModel({
          title,
          address,
          date,
          description,
          images: location,
          uploadBy: user._id,
        });
        const newEvent = await event.save();
        return res.json({msg: 'event saved successfully', event: newEvent}).status(201);
      },

      getAllfileS3: asyncHandler(async (req, res) => {
        const files = await fileModel.find({}).populate('uploadBy');
        return res.json(files);
      }),
      uploadPartner: asyncHandler(async (req, res) => {
        const event = req.params.id
        //console.log(event)
        let partner = new partnerModel({
          event: event,
        })
        if(req.files){
          let path = ""
          req.files.forEach(function(files, index, arr){
            path = path + files.location + ','
          })
          path = path.substring(0, path.lastIndexOf(','))
          partner.logo = path
        }
        const newPartner = await partner.save()
        return res.json({msg: 'partner saved successfully', partner: newPartner}).status(201);
      }),
      getAllEvents: asyncHandler(async (req, res) => {
        const events = await eventModel.find({}).populate('uploadBy');
        return res.json(events);
      })

      // handleUpload: asyncHandler((req, res) => {
      //   const file = new fileModel(req.file);
      //   file.save();
      //   return res.json(file);
      // }),

}

module.exports = eventController