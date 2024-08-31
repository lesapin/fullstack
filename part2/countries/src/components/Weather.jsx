const Weather = ({ data, capital }) => {
    if (data === null) {
        return (<></>)
    }

    const weatherImgUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png` 

    return (
        <>
            <h2>Weather in {capital}</h2>
            <p>temperature {data.main.temp} Celcius</p>
            <img width={200} height={200} src={weatherImgUrl} />
            <p>wind {data.wind.speed} m/s </p>
        </>
    )
}

export default Weather
