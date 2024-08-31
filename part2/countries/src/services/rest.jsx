import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const apiKey = import.meta.env.VITE_SOME_KEY
const weatherUrl = 'http://api.openweathermap.org'

const getAll = () => {
    const request = axios.get(`${baseUrl}/api/all`)
    return request.then(response => response.data)
}

const get = (name) => {
    const request = axios.get(`${baseUrl}/api/name/${name}`)
    return request.then(response => response.data)
}

const weather = (country, city) =>
    axios
        .get(`${weatherUrl}/geo/1.0/direct?q=${city},${country}&limit=1&appid=${apiKey}`)
        .then(response => {
            const request = axios.get(
                `${weatherUrl}/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric&appid=${apiKey}`
            )
            return request.then(response => response.data)
        })

export default { getAll, get, weather }
