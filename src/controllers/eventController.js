const asyncHandler = require("express-async-handler");
const eventModel = require("../models/eventModel");
const { S3Client,DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { events } = require("../models/partnerModel");
const { uploadPartner } = require("../middleware/uploadS3");
const partnerModel = require("../models/partnerModel");
const { deleteModel } = require("mongoose");
const { PaginationParameters } = require("mongoose-paginate-v2");
const speakerModel = require("../models/speakerModel");

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
        const {title, address,category, startdate, enddate, description} = req.body;
        //const key = req.file.key;
        const location = req?.file?.location

        //console.log(req.file)
        //console.log(user)
        const event = new eventModel({
          title,
          address,
          category,
          startdate,
          enddate,
          images: location,
        
          description,
          uploadBy: user._id,
        });
        // if(req.files){
        //   let path = ""
        //   req.files.forEach(function(files, index, arr){
        //     path = path + files.location + ','
        //   })
        //   path = path.substring(0, path.lastIndexOf(','))
        //   event.images = path
        // }
        const newEvent = await event.save();
        return res.status(201).json({msg: 'event saved successfully', event: newEvent}).status(201);
      },
      getEventById: asyncHandler(async (req, res) => {
        const eventId = req.params.id;
        const event = await eventModel.findById(eventId).populate('uploadBy');
        if (!event) {
          return res.status(404).json({ message: "Event not found" });
        }
        return res.json(event);
      }),
      updateEvent: asyncHandler(async (req, res) => {
        const {title, address, startdate, enddate, description} = req.body;
        const eventId = req.params.id;
        //const key = req.files[0].key;
        const location = req.file.location
        
        const event = await eventModel.findByIdAndUpdate(eventId, {title, address, startdate, enddate, description, images:location}, {new: true});
        // if(req.files){
        //   let path = ""
        //   req.files.forEach(function(files, index, arr){
        //     path = path + files.location + ','
        //   })
        //   path = path.substring(0, path.lastIndexOf(','))
        //   event.images = path
        // }
        if (!event) {
          return res.status(404).json({ message: "Event not found" });
        }
        await event.save();
        return res.status(200).json({ msg: "Event updated successfully", event: event });
      }),
      getAllEvents: asyncHandler(async (req, res) => {
        //const events = await eventModel.find({ uploadBy: user.id }).populate('uploadBy');
        const {limit,sort} = req.query
          const options = {
            limit: limit ? limit : -1,
            sort: sort ? sort : { startdate: -1 },
            pagination: limit ? true : false,
            populate: 'uploadBy'
        }
        //const options = new PaginationParameters(req).get();
        const events = await eventModel.paginate({},options);
      
        return res.json(events);
      }),
      getSearch: asyncHandler(async (req, res) => {
        const {title, address, category} = req.query
        const events = await eventModel.find({
          $text: { $search: `${category} ${title} ${address}` }
        }).populate('uploadBy');
        return res.status(200).json(events);
      }),
      getCategory: asyncHandler(async (req, res) =>{
        
        const items = await eventModel.aggregate([
          // Group by category and get the first document from each
          {
            $group: {
              _id: "$category",
              item: { $first: "$$ROOT" }
            }
          },
          // Reshape the output to be more readable
          {
            $project: {
              _id: 0,
              category: "$_id",
              title: "$item.title",
              address: "$item.address",
              date: "$item.date",
              description: "$item.description",
              uploadBy: "$item.uploadBy",
              images: "$item.images",
            }
          },
          // Sort by category name for consistent results
          {
            $sort: { category: 1 }
          }
        ]);
    
        res.json({
          success: true,
          count: items.length,
          data: items
        });
      }),
      getEventByCategory: asyncHandler(async (req, res) => {
        const category = req.params.id;
        const events = await eventModel.find({ category }).populate('uploadBy');
        return res.status(200).json(events);
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

      getPartnerByEventId: asyncHandler(async (req, res) => {
        const eventId = req.params.id;
        const partner = await partnerModel.find({ event: eventId });
        if (!partner) {
          return res.status(404).json({ message: "Partner not found" });
        }
        return res.status(200).json(partner);
      }),


      deleteEvent: asyncHandler(async (req, res) => {
        const eventId = req.params.id;
        const event = await eventModel.findByIdAndDelete(eventId);
        if (!event) {
          return res.status(404).json({ message: "Event not found" });
        }
        return res.status(200).json({msg: 'event deleted', Event: event});

      //   const imagesString = event.images;
      //   const keys = extractS3Keys(imagesString);
      //   console.log(keys);
      //   keys.forEach((file, index) => {
      //   const deleteParams = {
      //     Bucket: process.env.AWS_S3_BUCKET_NAME,
      //     Key: file,
      //   };
      //   s3Client.send(new DeleteObjectCommand(deleteParams));
      // })
      //   return res.json({ msg: "Event deleted successfully" });
      }),

      addSpeaker: asyncHandler(async (req, res) => {
        const { name, company, position } = req.body;
        const {location} = req.file
        const eventId = req.params.id;
        const speaker = new speakerModel({
          event: eventId,
          name,
          company,
          position,
          photo: location,
        });
        const newSpeaker = await speaker.save();
        return res.status(201).json({ msg: "Speaker saved successfully", speaker: newSpeaker });
      }),
      getSpeakerByEventId: asyncHandler(async (req, res) => {
        const eventId = req.params.id;
        const speakers = await speakerModel.find({ event: eventId });
        if (!speakers) {
          return res.status(404).json({ message: "Speakers not found" });
        }
        return res.status(200).json(speakers);
      }),



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