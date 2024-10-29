const asyncHandler = require("express-async-handler");
const fileModel = require("../models/fileModel");
const { S3Client } = require("@aws-sdk/client-s3");

const fileController = {
    s3Client: new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      }),

      handleS3Upload: asyncHandler(async (req, res) => {
        const user = req.user;
        const { location, originalname, ...self } = req.file;
        
        console.log(req.file)
        const file = new fileModel({
          path: location,
          title: originalname,
          uploadBy: user._id,

          ...self,
        });
        file.save();
        return res.json(file);
      }),

      getAllfileS3: asyncHandler(async (req, res) => {
        const files = await fileModel.find({}).populate('uploadBy');
        return res.json(files);
      }),

      // handleUpload: asyncHandler((req, res) => {
      //   const file = new fileModel(req.file);
      //   file.save();
      //   return res.json(file);
      // }),

}

module.exports = fileController