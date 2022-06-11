const mongoose = require('mongoose')
// the mongoose object has a property called schema and assign it to a variable
const { Schema } = mongoose

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
})

module.exports = recipientSchema
