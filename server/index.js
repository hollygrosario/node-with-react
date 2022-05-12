// import express library
const express = require('express')
// import mongoose
const mongoose = require('mongoose')
// require helper library for cookies
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
// require users model
require('./models/User')
// require passport
require('./services/passport')
// mongo connection
mongoose.connect(keys.mongoURI)

// generate a new running express app
const app = express()

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

const PORT = process.env.PORT || 3000
// express is telling node to listen for traffic on this  port
app.listen(PORT)
