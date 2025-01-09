const express = require('express');
const eventController = require('../controllers/eventController');
const {handleUpload, uploadPartner, uploadS3} = require('../middleware/uploadS3');
const { singleUpload, verifyJWT } = require('../middleware');

const eventRouter = express.Router()

eventRouter.post('' ,verifyJWT,uploadS3 ,eventController.uploadEvent)
eventRouter.get('/all-events',eventController.getAllEvents)
eventRouter.get('/:id',eventController.getEventById)
eventRouter.put('/:id',verifyJWT,uploadS3,eventController.updateEvent)
eventRouter.delete('/delete/:id',eventController.deleteEvent)

eventRouter.get('/search-events',eventController.getSearch)
eventRouter.get('',eventController.getCategory)
eventRouter.get('/speaker/:id',eventController.getSpeakerByEventId)
eventRouter.post('/partner/:id',uploadPartner ,eventController.uploadPartner)
eventRouter.get('/category/:id', eventController.getEventByCategory)
eventRouter.post('/speaker/:id',uploadS3,eventController.addSpeaker)
eventRouter.get('/partner/:id',eventController.getPartnerByEventId)







module.exports = eventRouter