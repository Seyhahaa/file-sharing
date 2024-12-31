const express = require('express');
const userController = require('../controllers/userController');
const {uploadS3} = require('../middleware/uploadS3');
const { signUpSchema } = require('../strategy/checkSchema');
const { handleValidation, verifyJWT } = require('../middleware');
const userRouter = express.Router()


userRouter.post('/signin',userController.signIn)
userRouter.post('/signup', uploadS3, userController.signUp)
userRouter.put('/update-user/:id',uploadS3 ,userController.updateUser)

userRouter.delete('/delete-user/:id',userController.deleteUser)
userRouter.get('/all-event',verifyJWT,userController.getAllEventByUser)
userRouter.get('/me',verifyJWT,userController.exchangeJWTToUser)


module.exports = userRouter