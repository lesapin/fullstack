const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const mongoUrl = process.env.MONGODB
console.log('connecting to', mongoUrl)

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(err => {
    console.log('error:', err.message)
  })

module.exports =  mongoose.model('Blog', blogSchema)
