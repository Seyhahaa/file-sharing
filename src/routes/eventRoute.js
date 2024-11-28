const express = require('express');
const eventController = require('../controllers/eventController');
const {uploadS3,multipleUploads, upload, uploadPartner} = require('../middleware/uploadS3');

const eventRouter = express.Router()


eventRouter.post('/upload' ,upload ,eventController.uploadEvent)
eventRouter.post('/partner/:id',uploadPartner ,eventController.uploadPartner)
eventRouter.get('/all-events',eventController.getAllEvents)



module.exports = eventRouter