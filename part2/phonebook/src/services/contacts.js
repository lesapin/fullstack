import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const post = newContact => {
    const request = axios.post(baseUrl, newContact)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newContact) => {
    return axios.put(`${baseUrl}/${id}`, newContact)
}

export default { post, getAll, remove, update }
