const expressAsyncHandler = require("express-async-handler");
const newsModel = require("../models/newsModel");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3Client= new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})
const newsController = {
  uploadNews: expressAsyncHandler(async (req, res) => {
    const user = req.user;
    //const { location,key } = req.file

    const { title, subTitle,content,  } = req.body;
    const news = new newsModel({
        title,
        subTitle,
        content,
        //key:key,
        //image: location,
        uploadBy: user._id,
    })
    const newBlog = await news.save()
    res.status(201).json(newBlog);
  }),
  getAllNews: expressAsyncHandler(async (req, res) => {
    const user = req.user
    console.log(user.id)
    const news = await newsModel.find({uploadBy: user.id});
    res.status(200).json(news);
  }),
  updateNews: expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    //const {location} = req.file
    const { title, subTitle, content, image } = req.body;
    const news = await newsModel.findByIdAndUpdate(id, { title, subTitle, content }, { new: true });
    
    if (!news) {
      return res.status(404).json({ message: "Event not found" });
    }
    await news.save();
    return res.json({ msg: "Event updated successfully", news: news });
  }),
  deleteNews: expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const news = await newsModel.findByIdAndDelete(id);
    if (!news) {
      return res.status(404).json({ message: "Event not found" });
    }
    // const params = {
    //   Bucket: process.env.AWS_S3_BUCKET_NAME,
    //   Key: news.key,
    // }
    // await s3Client.send(new DeleteObjectCommand(params));
    return res.json({ message: "Event deleted successfully", news: news });
  }),

};

module.exports = newsController;
