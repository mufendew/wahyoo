require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const router = require("./routes")
const errorHandler = require('./middleware/errHandle')
app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(router)
app.use(errorHandler)


//add grpahql server
const server = require("./apollo-server")
server.applyMiddleware({ app, path: '/graphql' });

module.exports = app