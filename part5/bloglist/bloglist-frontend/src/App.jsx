import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Create from './components/Create'
import Login from './components/Login'
import Status from './components/Status'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const blogFormRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ message: '', color: '' })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const error = msg => {
    setMessage({ message: msg, color: 'red' })
    setTimeout(() => {
      setMessage({ message: '', color: '' })
    }, 2000)
  }

  const info = msg => {
    setMessage({ message: msg, color: 'green' })
    setTimeout(() => {
      setMessage({ message: '', color: '' })
    }, 2000)
  }

  const handleLike = async (blog) => {
    const result = await blogService.addLike(blog)
    setBlogs(
      blogs
        .map(blog => blog.id === result.data.id ? result.data : blog)
        .sort((first, second) => first.likes < second.likes)
    )
  }

  const handleDelete = async (deletedBlog) => {
    if (window.confirm(`Remove blog ${deletedBlog.title} by ${deletedBlog.author}`)) {
      blogService.remove(deletedBlog)
      blogs.splice(blogs.findIndex(blog => deletedBlog.id === blog.id), 1)
      setBlogs(blogs)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    const title = event.target[0].value
    const author = event.target[1].value
    const url = event.target[2].value

    const response = await blogService.create(
      { title, author, url }
    )

    if (response.status === 201) {
      info(`a new blog ${title} by ${author} added`)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(response.data))
      console.log(response.data)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setAuth(user.token)
      setPassword('')
      setUsername('')
    }
    catch (exception) {
      error('Wrong username or password')
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((first, second) => first.likes < second.likes))
    )

    const user = JSON.parse(window.localStorage.getItem('user'))

    if (user !== null) {
      setUser(user)
      blogService.setAuth(user.token)
    }
  }, [])

  return (
    <div>
      <Status message={message.message} color={message.color} />
      {user === null
        ? <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
        : <>
          <h2>blogs</h2>
          {user.username} logged in<button onClick={handleLogout}>logout</button>
          <h2>create new</h2>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <Create handleCreate={handleCreate} />
          </Togglable>
          <br />
          {blogs.map(blog => <Blog key={blog.id}
            handleLike={handleLike}
            handleDelete={handleDelete}
            blog={blog}
            user={user} />
          )}
        </>
      }
    </div>
  )
}

export default App
