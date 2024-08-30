import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Numbers from './components/Numbers'
import Form from './components/Form'

import contactService from './services/contacts'

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

      const handleDelete = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            contactService.remove(id)
            setPersons(persons.filter(person => person.id != id))
        }
      }

      const saveContact = (event) => {
            event.preventDefault()

            const contact = {
                name: newName,
                number: newNumber,
            }

            const person = persons.find(person => 
                person.name.toLowerCase() === newName.toLowerCase())

            if (typeof person === 'undefined') {
                contactService
                    .post(contact)
                    .then(response => {
                        setPersons(persons.concat(response))
                    })
            } else {
                if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                    contactService
                        .update(person.id, {...person, number: contact.number})
                        .then(response => {
                            setPersons(persons.map(person => person.id === response.data.id ? response.data : person))
                        })
                }
            }

            setNewName('')
            setNewNumber('')
      }

      useEffect(() => {
        contactService
            .getAll()
            .then(response => {
                setPersons(response)
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
                <Numbers persons={persons} filter={filter} handleDelete={handleDelete} />
            </div>
        </>
      )
}

export default App
