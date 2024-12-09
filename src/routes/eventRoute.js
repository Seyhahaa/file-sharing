const express = require('express');
const eventController = require('../controllers/eventController');
const {handleUpload, uploadPartner} = require('../middleware/uploadS3');

const eventRouter = express.Router()


eventRouter.post('/upload' ,handleUpload ,eventController.uploadEvent)
//eventRouter.post('/partner/:id',uploadPartner ,eventController.uploadPartner)
eventRouter.get('/all-events',eventController.getAllEvents)
eventRouter.put('/update/:id',handleUpload,eventController.updateEvent)
eventRouter.delete('/delete/:id',eventController.deleteEvent)



module.exports = eventRouter