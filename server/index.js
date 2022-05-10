// import express library
const express = require('express')
// generate a new running express app
const app = express()

// create a route handler and associate it with a given route
app.get('/', (req, res) => {
  res.send({ hi: 'there' })
})

// express is telling node to listen for traffic on this  port
app.listen(3000)
