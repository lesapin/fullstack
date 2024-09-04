const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  try {
    const blog = await Blog.find({})
    res.json(blog)
  } 
  catch(exception) {
    next(exception)
  }
})

blogRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  }
  catch (exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }
  catch (exception) {
    next(exception)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } 
  catch (exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  try {
    const newBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(newBlog)    
  }
  catch (exception) {
    next(exception)
  }
})
module.exports = blogRouter
