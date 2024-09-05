const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const auth = request.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('/', async (req, res, next) => {
  try {
    const blog = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })

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
  const user = req.user

  try {
    const blog = await Blog.findById(req.params.id)
    
    if (user && user.id === blog.user.toString()) {
      await Blog.findByIdAndDelete(req.params.id)
      return res.status(204).end()
    } else {
      return res.status(401).json({ error: 'token invalid' })
    }
  }
  catch (exception) {
    next(exception)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  /*
  //const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
*/
  const user = request.user

  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
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
