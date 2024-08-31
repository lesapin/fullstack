import { useState, useEffect } from 'react'

import Search from './components/Search'
import List from './components/List'
import Data from './components/Data'
import Weather from './components/Weather'

import restService from './services/rest'

const App = () => {
    // Contain a list of all the countries gathered from Uni. Helsinki 
    const [countries, setCountries] = useState(null)
    
    // Control user query parameter and list of matching countries
    const [list, setList] = useState([])
    const [query, setQuery] = useState('')
    
    // Show country specific information
    const [data, setData] = useState(null)
    const [weather, setWeather] = useState(null)

    const handleQuery = (event) => {
        setQuery(event.target.value)
    }

    const handleShow = (event) => {
        event.preventDefault()
        setQuery(event.target.value)
    }

    useEffect(() => {
        restService
            .getAll()
            .then(response => {
                setCountries(response)
            })
    }, [])

    useEffect(() => {
        setData(null)

        if (countries) {
            const newList = countries
                .filter(country =>
                    country.name.common.toLowerCase().includes(
                        query.toLowerCase()
                    )
                )
                .map(country =>
                    ({
                        code: country.cca2, 
                        name: country.name.common,
                        capital: country.capital
                    })
                )
            if (newList.length > 10) {
                setList(null)
            } else if (newList.length === 1) {
                setList([])
                restService.get(newList[0].name)
                    .then(response => { 
                        setData(response)
                    })
                restService.weather(newList[0].code, newList[0].capital)
                    .then(response => {
                        setWeather(response)
                    })
            } else {
                setList(newList)
            }
        }
    }, [query])

    return (
        <>
            <Search query={query} handleQuery={handleQuery} />
            {data === null 
                ?   <List countries={list} handleShow={handleShow} />
                :   
                    <>
                        <Data data={data} /> 
                        <Weather data={weather} capital={data.capital} />
                    </>
            }
        </>
    )
}

export default App
