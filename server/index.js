// import express library
const express = require('express')
// import mongoose
const mongoose = require('mongoose')
// require helper library for cookies
// library to help identify the current user who is making the request
// data stored in the cookie
// the cookie contains all the data related to the user session- ie the user id!
// it contains the value stored in the cookie
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
// require users model
require('./models/User')
// require surveys model
require('./models/Survey')
// require passport
require('../server/services/passport')

// mongo connection
mongoose.connect(keys.mongoURI)
//  everything from here up can pase into the node cli to test queries

// generate a new running express app
const app = express()

// middlewares app.use

// middleware to parse the body and assign to req.body req object
app.use(bodyParser.json())
// make use of cookies in the app
// 30 days before expiration
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
// tell passport to make use of the cookies for auth
app.use(passport.initialize())
app.use(passport.session())

// require authRoutes file that returns a function and pass the app instance to the function
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

// dynamically set the port
const PORT = process.env.PORT || 4000
// express is telling node to listen for traffic on this  port
app.listen(PORT)
