// import mongoose
const mongoose = require('mongoose')
// the mongoose object has a property called schema and assign it to a variable
const { Schema } = mongoose

// create the schema
const userSchema = new Schema({
  googleId: String
})

mongoose.model('users', userSchema)
