// import passport
const passport = require('passport')

// import passport strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const mongoose = require('mongoose')

// require client id and secret keys
const keys = require('../config/keys')

const User = mongoose.model('users')

// create a new instance of the google strategy
// configuration of google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // create a new instance of a user and save it to the db
      new User({ googleId: profile.id }).save()
    }
  )
)
