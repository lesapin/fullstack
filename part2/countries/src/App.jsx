import { useState, useEffect } from 'react'

import Search from './components/Search'
import List from './components/List'
import Data from './components/Data'

import restService from './services/restcountries'

const App = () => {
    const [countries, setCountries] = useState(null)
    const [list, setList] = useState([])
    const [query, setQuery] = useState('')
    const [data, setData] = useState(null)

    const handleQuery = (event) => {
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
                    ({code: country.cca2, name: country.name.common})
                )
            if (newList.length > 10) {
                setList(null)
            } else if (newList.length === 1) {
                setList([])
                restService.get(newList[0].name)
                    .then(response => { 
                        setData(response)
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
                ?   <List countries={list} />
                :   <Data data={data} />
            }
        </>
    )
}

export default App
