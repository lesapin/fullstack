const List = ({ countries }) => {
    if (countries === null) {
        return ("Too many countries match, specify another filter")
    }

    return (
        <>
        {countries.map(country => 
            <div key={country.code}>
                {country.name}
            </div>)
        }
        </>
    )
}

export default List
