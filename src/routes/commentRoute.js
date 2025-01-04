
const express = require('express');
const commentController = require('../controllers/commentController');
const { verifyJWT } = require('../middleware');
const authController = require('../controllers/authController');
const commentRoute = express.Router()


commentRoute.post('/:eventId', authController.verifyJWT,commentController.createComment)
commentRoute.put('/:commentId',verifyJWT, commentController.editComment)
commentRoute.get('/:eventId', commentController.getAllComments)
commentRoute.delete('/:commentId',verifyJWT, commentController.deleteComment)


module.exports = commentRoute