const asyncHandler = require("express-async-handler");
const eventModel = require("../models/eventModel");
const { S3Client,DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { events } = require("../models/partnerModel");
const { uploadPartner } = require("../middleware/uploadS3");
const partnerModel = require("../models/partnerModel");

const s3Client= new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})
const eventController = {
    
      uploadEvent: async (req, res) => {
        const user = req.user;
        const {title, address,category, date, description} = req.body;
        //const key = req.files[0].key;
        //console.log(user)
        const event = new eventModel({
          title,
          address,
          category,
          date,
          //key: key,
          description,
          uploadBy: user.id,
        });
        if(req.files){
          let path = ""
          req.files.forEach(function(files, index, arr){
            path = path + files.location + ','
          })
          path = path.substring(0, path.lastIndexOf(','))
          event.images = path
        }
        const newEvent = await event.save();
        return res.json({msg: 'event saved successfully', event: newEvent}).status(201);
      },
      getAllEvents: asyncHandler(async (req, res) => {
        const files = await fileModel.find({}).populate('uploadBy');
        return res.json(files);
      }),
      updateEvent: asyncHandler(async (req, res) => {
        const {title, address, date, description} = req.body;
        const eventId = req.params.id;
        //const key = req.files[0].key;
        
        const event = await eventModel.findByIdAndUpdate(eventId, {title, address, date, description, key}, {new: true});
        if(req.files){
          let path = ""
          req.files.forEach(function(files, index, arr){
            path = path + files.location + ','
          })
          path = path.substring(0, path.lastIndexOf(','))
          event.images = path
        }
        if (!event) {
          return res.status(404).json({ message: "Event not found" });
        }
        await event.save();
        return res.json({ msg: "Event updated successfully", event: event });
      }),
      getAllEvents: asyncHandler(async (req, res) => {
        const events = await eventModel.find({}).populate('uploadBy');
        return res.json(events);
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
      deleteEvent: asyncHandler(async (req, res) => {
        const eventId = req.params.id;
        const event = await eventModel.findByIdAndDelete(eventId);
        if (!event) {
          return res.status(404).json({ message: "Event not found" });
        }

        const imagesString = event.images;
        const keys = extractS3Keys(imagesString);
        console.log(keys);
        keys.forEach((file, index) => {
        const deleteParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: file,
        };
        s3Client.send(new DeleteObjectCommand(deleteParams));
      })
        return res.json({ msg: "Event deleted successfully" });
      })



}

module.exports = eventController

function extractS3Keys(imagesString) {
  // Remove any whitespace and split the string by comma
  const imageUrls = imagesString.trim().split(',');
  
  // Extract the keys using the S3 URL structure
  const s3Keys = imageUrls.map(url => {
    // Trim any whitespace from the URL
    const cleanUrl = url.trim();
    
    // Split the URL by the bucket name and extract the last part (the key)
    const bucketName = 'filesharing-bucket.s3.ap-southeast-1.amazonaws.com/';
    const key = cleanUrl.split(bucketName)[1];
    
    return key;
  });
  
  return s3Keys;
}