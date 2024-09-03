const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
  Blog.find({}).then(blog => {
    res.json(blog)
  })
  .catch(err => next(err))
})

blogRouter.get('/:id', (req, res, next) => {
  Blog
    .findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(err => next(err))
})

module.exports = blogRouter
