
const express = require('express');
const commentController = require('../controllers/commentController');
const commentRoute = express.Router()


commentRoute.post('/:eventId', commentController.createComment)
commentRoute.put('/:commentId', commentController.editComment)
commentRoute.get('/:eventId', commentController.getAllComments)
commentRoute.delete('/:commentId', commentController.deleteComment)


module.exports = commentRoute