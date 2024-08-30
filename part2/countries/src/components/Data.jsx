const Flag = ({ code }) => { 
    const baseUrl = `https://flagcdn.com/w320/${code}.png`
    return (
        <img src={baseUrl} />    
    )
}

const Languages = ({ langs }) => {
    return Object.keys(langs).map(key =>
        <li key={key}>
            {langs[key]}
        </li>
    )
}

const Data = ({ data }) => {
    return (
        <>
            <h1>{data.name.common}</h1>
            <div>
                capital {data.capital[0]}
            </div>
            <div>
                area {data.area}
            </div>
            <h4>languages:</h4>
            <ul>
                <Languages langs={data.languages} />
            </ul>
            <Flag code={data.cca2.toLowerCase()} />
        </>
    )   
}

export default Data
