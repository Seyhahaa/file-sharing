
module.exports = {
    post: {
        201: {
            message: {
                type: 'comment posted',
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
    edit: {
        201: {
            message: {
                type: 'comment posted',
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
    get: {
        200: {
            message: {
                type: 'comment posted',
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
    delete: {
        201: {
            message: {
                type: 'comment posted',
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
}