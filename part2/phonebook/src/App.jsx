import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Numbers from './components/Numbers'
import Form from './components/Form'

const App = () => {
      const [persons, setPersons] = useState([]) 
      const [newName, setNewName] = useState('')
      const [newNumber, setNewNumber] = useState('')
      const [filter, setFilter] = useState('')

      const handleName = (event) => {
            setNewName(event.target.value)
      }

      const handleNumber = (event) => {
            setNewNumber(event.target.value)
      }

      const handleFilter = (event) => {
            setFilter(event.target.value)
      }

      const saveContact = (event) => {
            event.preventDefault()

            const contact = {
                name: newName,
                number: newNumber
            }

            if (persons.every(person => person.name.toLowerCase() != newName.toLowerCase())) {
                setPersons(persons.concat(contact))
            }
            else {
                alert(`${newName} is already added to phonebook`)
            }

            setNewName('')
            setNewNumber('')
      }

      useEffect(() => {
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            setPersons(response.data)
          })
      }, [])
    
      return (
        <>
            <h2>Phonebook</h2>
            <div>
                <Filter value={filter} handler={handleFilter} />
            </div>
            <h2>add a new</h2>
            <div>
                <Form   newName={newName} handleName={handleName} 
                        newNumber={newNumber} handleNumber={handleNumber} 
                        saveContact={saveContact} />
            </div>
            <h2>Numbers</h2>
            <div>
                <Numbers persons={persons} filter={filter} />
            </div>
        </>
      )
}

export default App
