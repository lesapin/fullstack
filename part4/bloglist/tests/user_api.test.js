const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 1)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'hurtsi',
      name: 'Roope Hurttia',
      password: 'salasana'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username is taken', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'root',
      name: 'superuser',
      password: 'salasana'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    assert(result.body.error.includes('expected `username` to be unique'))
  })

  test('cannot create user with a too short username or password', async () => {
    const usersAtStart = await helper.usersInDB()

    const shortUsername = {
      username: 'ro',
      name: 'shortusername',
      password: 'salasana'
    }

    const shortPassword = {
      username: 'roba',
      name: 'shortpassword',
      password: 'sa'
    }

    let res = await api
      .post('/api/users')
      .send(shortUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(res.statusCode, 400)
    assert(res.error.text.length > 0)

    res = await api
      .post('/api/users')
      .send(shortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(res.statusCode, 400)
    assert(res.body.error.includes('password is too short'))

    const usersAfter = await helper.usersInDB()

    assert.strictEqual(usersAfter.length, usersAtStart.length)
  })
})
