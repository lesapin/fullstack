import { useState } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import Form from './components/Form'

const App = () => {
      const [persons, setPersons] = useState([
              { name: 'Arto Hellas', number: '040-123456' }
            ]) 
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

            if (persons.every(person => person.name != newName)) {
                setPersons(persons.concat(contact))
            }
            else {
                alert(`${newName} is already added to phonebook`)
            }

            setNewName('')
            setNewNumber('')
      }

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
