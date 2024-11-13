const express = require('express');
const userController = require('../controllers/userController');
const uploadS3 = require('../middleware/uploadS3');

const userRouter = express.Router()


userRouter.post('/signup',uploadS3 ,userController.signUp)
//userRouter.get('/getfile', fileController.getAllfileS3)



module.exports = userRouter