const express = require('express');
const {uploadS3} = require('../middleware/uploadS3');
const { signUpSchema } = require('../strategy/checkSchema');
const { handleValidation } = require('../middleware');
const newsController = require('../controllers/newsController');
const newsRouter = express.Router()


newsRouter.post('/',uploadS3 ,newsController.uploadNews);
// userRouter.post('/signin',userController.signIn)
 newsRouter.get('/all-news',newsController.getAllNews)
// userRouter.put('/update-user/:id',uploadS3 ,userController.updateUser)


module.exports = newsRouter