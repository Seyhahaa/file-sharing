const express = require('express');
const eventController = require('../controllers/eventController');
const {handleUpload, uploadPartner, uploadS3} = require('../middleware/uploadS3');
const { singleUpload, verifyJWT } = require('../middleware');

const eventRouter = express.Router()


// no JWT
eventRouter.get('/all-events',eventController.getAllEvents)
eventRouter.get('/search-events',eventController.getSearch)
eventRouter.get('',eventController.getCategory)
eventRouter.get('/speaker/:id',eventController.getSpeakerByEventId)
eventRouter.post('/partner/:id',uploadPartner ,eventController.uploadPartner)
eventRouter.get('/category/:id', eventController.getEventByCategory)

//JWT
eventRouter.post('' ,verifyJWT,uploadS3 ,eventController.uploadEvent)
eventRouter.get('/:id',eventController.getEventById)
eventRouter.put('/:id',verifyJWT,uploadS3,eventController.updateEvent)
eventRouter.delete('/delete/:id',verifyJWT,eventController.deleteEvent)

eventRouter.get('/partner/:id',eventController.getPartnerByEventId)

eventRouter.post('/speaker/:id',verifyJWT,uploadS3,eventController.addSpeaker)




module.exports = eventRouter