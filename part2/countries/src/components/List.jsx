const List = ({ countries, handleShow }) => {
    if (countries === null) {
        return ("Too many countries match, specify another filter")
    }

    return (
        <>
        {countries.map(country => 
            <div key={country.code}>
                {country.name} 
                <button value={country.name} onClick={handleShow}>show</button>
            </div>)
        }
        </>
    )
}

export default List
