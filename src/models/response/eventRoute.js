module.exports = {
    upload: {
        201: {
            message: {
                type: 'Event created',
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
    getAll: {
        201: {
            message: {
                type: 'All Events received',
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
    editEvent: {
        201: {
            message: {
                type: 'All Events received',
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
}