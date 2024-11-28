const express = require('express');
const userController = require('../controllers/userController');
const {uploadS3} = require('../middleware/uploadS3');
const { signUpSchema } = require('../strategy/checkSchema');
const { handleValidation } = require('../middleware');
const userRouter = express.Router()


userRouter.post('/signup',uploadS3 ,userController.signUp)
userRouter.post('/signin',userController.signIn)
userRouter.get('/all-users',userController.getAllUsers)
userRouter.put('/update-user/:id',uploadS3 ,userController.updateUser)


module.exports = userRouter