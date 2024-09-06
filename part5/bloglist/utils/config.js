require('dotenv').config()

const PORT = process.env.PORT

const MONGODB = process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_TEST
  : process.env.MONGODB

module.exports = { PORT, MONGODB }

