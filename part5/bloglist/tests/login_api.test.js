const { describe, test, after, before } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')

const api = supertest(app)

describe('existing user logs in, creates and deletes a blog', () => {
  let token = ""
  let decodedToken = ""
  
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "example.com",
    likes: 2,
  }

  before(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 1)
    const user = new User({ username: 'test', passwordHash })

    await user.save()
  })

  test('can not login with wrong credentials', async () => {
    const userBadPass = {
      username: 'test',
      password: 'badpass'
    }

    const userBadName = {
      username: 'test123',
      password: 'sekret'
    }

    let result = await api
      .post('/api/login')
      .send(userBadPass)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.statusCode, 401)
    assert(result.body.error.includes("invalid username or password"))

    result = await api
      .post('/api/login')
      .send(userBadName)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.statusCode, 401)
    assert(result.body.error.includes("invalid username or password"))
  })

  test('login succeeds with correct username and password', async () => {
    const user = {
      username: 'test',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    token = result.body.token
    decodedToken = jwt.verify(token, process.env.SECRET)

    assert.strictEqual(result.statusCode, 200)
    assert(token && token.length > 0)
    assert(decodedToken.username.includes('test'))
  })

  test('user with invalid token can not post', async () => {
    const result = await api 
      .post('/api/blogs')
      .set('Authorization', 'Bearer 123')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.statusCode, 401)
    assert(result.body.error.includes('token invalid'))
  })

  test('authorized user can post a new blog', async () => {
    const blogsBefore = await helper.blogsInDB()

    const result = await api 
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDB()
    
    assert.strictEqual(blogsAfter.length, blogsBefore.length + 1)
  })

  test('users and blogs are linked by reference', async () => {
    const blogsAfter = await helper.blogsInDB()
    const usersAfter = await helper.usersInDB()

    assert.strictEqual(blogsAfter[0].id, usersAfter[0].blogs[0].toString())
    assert.strictEqual(blogsAfter[0].user.toString(), usersAfter[0].id)
  })

  test('user with invalid token can not delete a blog', async () => {
    const blogsBefore = await helper.blogsInDB()

    const result = await api 
      .delete(`/api/blogs/${blogsBefore[0].id}`)
      .set('Authorization', `Bearer 123`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDB()

    assert.strictEqual(blogsAfter.length, blogsBefore.length)
    assert.strictEqual(result.statusCode, 401)
    assert(result.body.error.includes('token invalid'))
  })

  test('user without a token can not delete a blog', async () => {
    const blogsBefore = await helper.blogsInDB()

    const result = await api 
      .delete(`/api/blogs/${blogsBefore[0].id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDB()

    assert.strictEqual(blogsAfter.length, blogsBefore.length)
    assert.strictEqual(result.statusCode, 401)
    assert(result.body.error.includes('token invalid'))
  })

  test('authorized user can delete a blog', async () => {
    const blogsBefore = await helper.blogsInDB()

    const result = await api 
      .delete(`/api/blogs/${blogsBefore[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAfter = await helper.blogsInDB()

    assert.strictEqual(blogsAfter.length, blogsBefore.length - 1)
    assert.strictEqual(result.statusCode, 204)
  })
})

after(async () => {
  await mongoose.connection.close()
})
