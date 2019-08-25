

import mongoose from 'mongoose'
require('dotenv').config()

// Initialize connection to database
const dbUrl = "mongodb+srv://admin:" + process.env.DB_PASS + "@cluster0-mcmuo.mongodb.net/test?retryWrites=true&w=majority";
const dbOptions = {
        useNewUrlParser: true,
        useFindAndModify: false
      }

// Set DB from mongoose connection
mongoose.connect(dbUrl, dbOptions)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

export default db