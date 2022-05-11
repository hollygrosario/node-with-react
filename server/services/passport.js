// import passport
const passport = require('passport')

// import passport strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

// require client id and secret keys
const keys = require('../config/keys')

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
      console.log('accessToken:', accessToken)
      console.log('refreshToken:', refreshToken)
      console.log('profile:', profile)
    }
  )
)
