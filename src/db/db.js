const mongoose = require('mongoose');

const dbName = 'event-calendar'
const containerMongo = 'mongodb'
// Test editing
// MongoDB connection URI
const mongoURI = `mongodb://${containerMongo}:27017`;

async function dbConnect() {
    mongoose.connection.on('connected', () => {
        console.log("Connected: ", dbName)
    })
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
        dbName: dbName
    })
}

module.exports = dbConnect