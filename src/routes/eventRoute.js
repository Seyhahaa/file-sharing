const express = require('express');
const eventController = require('../controllers/eventController');
const {handleUpload, uploadPartner, uploadS3} = require('../middleware/uploadS3');
const { singleUpload } = require('../middleware');

const eventRouter = express.Router()


eventRouter.post('' ,handleUpload ,eventController.uploadEvent)
eventRouter.get('/all-events',eventController.getAllEvents)
eventRouter.get('/:id',eventController.getEventById)
eventRouter.put('/:id',handleUpload,eventController.updateEvent)
eventRouter.delete('/delete/:id',eventController.deleteEvent)
eventRouter.get('',eventController.getCategory)

eventRouter.post('/partner/:id',uploadPartner ,eventController.uploadPartner)
eventRouter.get('/partner/:id',eventController.getPartnerByEventId)

eventRouter.post('/speaker/:id',uploadS3,eventController.addSpeaker)
eventRouter.get('/speaker/:id',eventController.getSpeakerByEventId)




module.exports = eventRouter