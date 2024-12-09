const express = require('express');
const userController = require('../controllers/userController');
const {uploadS3} = require('../middleware/uploadS3');
const { signUpSchema } = require('../strategy/checkSchema');
const { handleValidation } = require('../middleware');
const userRouter = express.Router()


userRouter.post('/signin',userController.signIn)
userRouter.post('/signup', userController.signUp)
userRouter.put('/update-user/:id',uploadS3 ,userController.updateUser)
userRouter.delete('/delete-user/:id',userController.deleteUser)
//userRouter.get('/all-users',userController.getAllUsers)


module.exports = userRouter