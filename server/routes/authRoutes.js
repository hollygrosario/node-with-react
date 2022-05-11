// import passport
const passport = require('passport')

// wrap the routes in module.export to pass in the original instance of the express app
module.exports = (app) => {
// console.developers.google.com
// route handler to get directed into the passport authentication flow
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

// second route handler for passport to exchange a code to get the profile info from google
app.get('/auth/google/callback', passport.authenticate('google'))
}
