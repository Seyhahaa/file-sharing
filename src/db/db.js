const mongoose = require('mongoose');

const dbName = process.env.DB_NAME
// Test editing
// MongoDB connection URI
const mongoURI = `mongodb://localhost:27018`;

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