const express = require('express')
require('express-async-errors')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(err => {
    logger.error('error:', err.message)
  })

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use(middleware.requestLogger)
//app.use(middleware.tokenExtractor)
app.use('/api/blogs/', middleware.userExtractor, blogRouter)
app.use('/api/users/', userRouter)
app.use('/api/login/', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
