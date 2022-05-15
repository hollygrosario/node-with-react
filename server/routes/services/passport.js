// import passport
const passport = require('passport')

// import passport strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const mongoose = require('mongoose')

// require client id and secret keys
const keys = require('../config/keys')

const User = mongoose.model('users')

// user.id shortcute to the mongo _id
// stuff that id into a cookie
// turn the user into an id
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// take the id stuffed in the cookie and turn it back into a user models
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    console.log('user:', user)
    done(null, user)
  } catch (e) {
    console.log('e:', e)
  }
})

// create a new instance of the google strategy
// configuration of google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) {
          // we have a user already
          console.log('existingUser:', existingUser)
          return done(null, existingUser)
        }
        // query the db and find one user with the matching  google id
        const user = await new User({ googleId: profile.id }).save()
        done(null, user)
      } catch (e) {
        console.log('e:', e)
      }
    }
  )
)
