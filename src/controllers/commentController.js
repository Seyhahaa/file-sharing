const expressAsyncHandler = require("express-async-handler");
const commentModel = require("../models/commentModel");

const commentController = {
    createComment: expressAsyncHandler(async (req, res, next) => {
        const eventId = req.params.eventId;
        const userId = req.user._id; // assuming req.user is set with the logged-in user data
        const { content } = req.body;
        const comment = new commentModel({
            content,
            event: eventId,
            byUser: userId
        })
        const newComment = await comment.save()
        res.status(201).json({ message: 'Comment created successfully', comment: newComment})
    }),
    getAllComments: expressAsyncHandler(async (req, res) => {
        const comments = await commentModel.find({ event: req.params.eventId }).populate('byUser').populate('event');
        res.status(200).json(comments);
    }),
    editComment: expressAsyncHandler(async (req, res) => {
        const commentId = req.params.commentId;
        const { content } = req.body;
        const updatedComment = await commentModel.findByIdAndUpdate(commentId, { content }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
    }),
    deleteComment: expressAsyncHandler(async (req, res) => {
        const commentId = req.params.commentId;
        const deletedComment = await commentModel.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    }),
}

module.exports = commentController