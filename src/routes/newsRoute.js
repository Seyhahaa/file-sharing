const express = require('express');
const {uploadS3} = require('../middleware/uploadS3');
const { signUpSchema } = require('../strategy/checkSchema');
const { handleValidation, verifyJWT } = require('../middleware');
const newsController = require('../controllers/newsController');
const newsRouter = express.Router()


 newsRouter.post('/' ,verifyJWT, uploadS3,newsController.uploadNews);
 newsRouter.get('/all-news',newsController.getAllNews)
 newsRouter.get('/:id',newsController.getNewsById)
 newsRouter.put('/update/:id',verifyJWT , newsController.updateNews)
 newsRouter.delete('/delete/:id',verifyJWT,newsController.deleteNews);


module.exports = newsRouter