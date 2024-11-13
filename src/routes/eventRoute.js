const express = require('express');
const fileController = require('../controllers/fileController');
const uploadS3 = require('../middleware/uploadS3');

const fileRouter = express.Router()


fileRouter.post('/upload', uploadS3, fileController.handleS3Upload)
fileRouter.get('/getfile', fileController.getAllfileS3)



module.exports = fileRouter