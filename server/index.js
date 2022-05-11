// import express library
const express = require('express')
// import passport
const passport = require('passport')
// import passport strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
// require client id and secret keys
const keys = require('./config/keys')

// generate a new running express app
const app = express()

// console.developers.google.com

// create a new instance of the google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken:', accessToken)
      console.log('refreshToken:', refreshToken)
      console.log('profile:', profile)
    }
  )
)

// route handler to get directed into the passport authentication flow
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

// second route handler for passport to exchange a code to get the profile info from google
app.get('/auth/google/callback', passport.authenticate('google'))

const PORT = process.env.PORT || 3000
// express is telling node to listen for traffic on this  port
app.listen(PORT)
