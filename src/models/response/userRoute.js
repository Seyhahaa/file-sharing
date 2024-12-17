
// The name of each response payload should be model name defined in Request model schema.

// The name of each response payload should be  model name defined in Request model schema and should sufix with ResponseModel.

module.exports = {
    login: {
        200: {
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
        200: {
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
        200: {
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
        200: {
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
    getEvent: {
        200: {
            message: {
                type: "All User's Event"
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
    getEvent: {
        200: {
            message: {
                type: "User's info"
            }
        },
        500: {
            internal: {
                type: 'Internal server error!'
            }
        }
    },
};