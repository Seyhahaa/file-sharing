const express = require('express');
const authController = require('../controllers/authController');
 
const authRouter = express.Router()


authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)

//google service
authRouter.get('/oauth', authController.showGoogleConsentScreen)
authRouter.get('/oauth-callback', authController.handleGoogle)

//facebook service
authRouter.get('/facebook', authController.facebookLogin)
authRouter.get('/facebook-callback', authController.handleFacebook)

module.exports = {authRouter}