const express = require('express');
const {uploadS3} = require('../middleware/uploadS3');
const { signUpSchema } = require('../strategy/checkSchema');
const { handleValidation } = require('../middleware');
const newsController = require('../controllers/newsController');
const newsRouter = express.Router()


 newsRouter.post('/' ,newsController.uploadNews);
 newsRouter.get('/all-news',newsController.getAllNews)
 newsRouter.put('/update/:id' , newsController.updateNews)
 newsRouter.delete('/delete/:id',newsController.deleteNews);


module.exports = newsRouter