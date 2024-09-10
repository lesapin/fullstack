const { describe, test, after, before, beforeEach } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when the database has many blogs', () => {
  const password = "salasana"
  let token = ""
  let decryptedToken = ""

  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  }

  before(async () => {
    await User.deleteMany({})

    const username = 'blogapitest'
    const passwordHash = await bcrypt.hash(password, 1)

    const user = new User({ username, passwordHash })
    await user.save()

    const result = await api
      .post('/api/login')
      .send({ username, password })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    token = result.body.token
    decodedToken = jwt.verify(token, process.env.SECRET)

    assert(decodedToken.username.includes(username))
  })

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog/*, user: decodedToken.id*/ }))
    const promiseArray = blogObjects.map(blog => blog.save())

    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
 
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    assert(titles.includes('React patterns'))
  })

  test('a valid blog can be added', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const afterBlogs = await helper.blogsInDB()
    assert.strictEqual(afterBlogs.length, helper.initialBlogs.length + 1)

    const titles = afterBlogs.map(r => r.title)
    assert(titles.includes(newBlog.title))
  })

  test('blog has a default like value of 0', async () => {
    await Blog.deleteMany({})

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogFromDB = await helper.blogsInDB()

    assert.strictEqual(blogFromDB[0].likes, 0)
  })

  test('new blogs without title or url result in bad request', async () => {
    await Blog.deleteMany({})

    const blogNoTitle = {
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }

    const blogNoUrl = {
      title: "Type wars",
      author: "Robert C. Martin",
    }

    let request = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogNoTitle)
      .expect(400)

    assert.strictEqual(request.res.statusCode, 400)

    request = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogNoUrl)
      .expect(400)

    assert.strictEqual(request.res.statusCode, 400)
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body, blogToView)
  })

  test('a blog can be deleted', async () => {
    await Blog.deleteMany({})
  
    await api 
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()
    const titles = blogsAtEnd.map(r => r.title)

    assert(!titles.includes(blogToDelete.title))
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })

  test('likes in a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToUpdate = blogsAtStart[0]

    const update = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 5
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    const updatedBlog = blogsAtEnd[0]

    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 5)
  })

  test('blog has a property called id', async () => {
    const blogs = await helper.blogsInDB()
    const blogKeys = Object.keys(blogs[0])

    assert(blogKeys.includes('id') && !blogKeys.includes('_id'))
  })

  after(async () => {
    await mongoose.connection.close()
  })
  
})
