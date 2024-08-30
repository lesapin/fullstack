const Search = ({ query, handleQuery }) => {
    return (
        <div>
            find countries <input value={query} onChange={handleQuery} />
        </div>
    )
}

export default Search
