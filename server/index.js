// import express library
const express = require('express')
// import mongoose
const mongoose = require('mongoose')
const keys = require('./config/keys')
// require users model
require('./models/User')
// require passport
require('./services/passport')
// mongo connection
mongoose.connect(keys.mongoURI)

// generate a new running express app
const app = express()

// require authRoutes file that returns a function and pass the app instance to the function
require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 3000
// express is telling node to listen for traffic on this  port
app.listen(PORT)
