import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Status from './components/Status'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ message: '', color: '' })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleCreate = async (event) => {
    event.preventDefault()

    if (title.length > 0 && author.length > 0 && url.length > 0) {
      const response = await blogService.create({ title, author, url })

      if (response.status === 201) {
        info(`a new blog ${title} by ${author} added`)
        setTitle('')
        setAuthor('')
        setUrl('')
      }
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
      setBlogs( blogs )
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
              <form onSubmit={handleCreate}>
                <div>
                  title: <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                  author: <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                  url: <input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button type="submit">create</button>
              </form>
              <br /><br />
              {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
            </>
      }
    </div>
  )
}

export default App
