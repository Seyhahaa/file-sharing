module.exports = {
    Register: {
        201: {
            message: {
                type: 'Admin created',
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
    login: {
        200: {
            message: {
                type: 'Admin created',
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
}