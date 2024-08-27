const Numbers = ({ persons, filter }) =>
        persons.filter(person => 
            filter === '' || person.name.toLowerCase().includes(filter.toLowerCase())
        ).map(person =>
            <p key={String(person.name)}>{person.name} {person.number}</p>
        )

export default Numbers
