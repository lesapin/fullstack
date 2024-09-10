import axios from 'axios'
const baseUrl = '/api/blogs'

let auth = null

const setAuth = (token) => {
  auth = `Bearer ${token}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: auth }
  }

  const result = await axios.post(baseUrl, blog, config)
  return result
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: auth }
  }

  const result = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return result
}

const addLike = async (blog) => {
  const config = {
    headers: { Authorization: auth }
  }

  const newBlog = {
    ...blog,
    likes: blog.likes + 1
  }

  const result = await axios.put(`${baseUrl}/${blog.id}`, newBlog, config)
  return result
}

export default { getAll, setAuth, create, remove, addLike }
