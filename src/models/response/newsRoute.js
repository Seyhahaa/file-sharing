
module.exports = {
    post: {
        201: {
            message: {
                type: 'News post',
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
    getAllNews: {
        200: {
            message: {
                type: 'All News post',
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
    updateNews: {
        200: {
            message: {
                type: 'News updated successfully',
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
    deleteNews: {
        200: {
            message: {
                type: 'News delete successfully',
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
}