const expressAsyncHandler = require("express-async-handler");
const newsModel = require("../models/newsModel");

const newsController = {
  uploadNews: expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const { location } = req.file
    const { title, subTitle,content,  } = req.body;
    const news = new newsModel({
        title,
        subTitle,
        content,
        image: location,
        uploadBy: user._id,
    })
    const newBlog = await news.save()
    res.status(201).json(newBlog);
  }),
  getAllNews: expressAsyncHandler(async (req, res) => {
    const news = await newsModel.find({}).populate('uploadBy');
    res.json(news);
  }),
  getAllNews: expressAsyncHandler(async (req, res) => {
    const news = await newsModel.find({}).populate('uploadBy');
    res.json(news);
  })
};

module.exports = newsController;
