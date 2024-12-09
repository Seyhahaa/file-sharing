
// The name of each response payload should be model name defined in Request model schema.

// The name of each response payload should be  model name defined in Request model schema and should sufix with ResponseModel.

module.exports = {
    login: {
        201: {
            message: {
                type: 'Successfully logged in'
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
    signup: {
        201: {
            message: {
                type: 'Successfully Signed Up'
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
    editUser: {
        201: {
            message: {
                type: 'Updated Successfully'
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
    deleteUser: {
        201: {
            message: {
                type: 'Successfully deleted user'
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
};