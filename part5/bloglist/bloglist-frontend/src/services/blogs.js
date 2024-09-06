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

  const response = await axios.post(baseUrl, blog, config)
  return response
}

export default { getAll, setAuth, create }
