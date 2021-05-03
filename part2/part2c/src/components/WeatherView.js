export const WeatherView = ({weather}) => 
    <div>
        <h4>Weather in {weather.location.name}</h4>
        <p>temperature: {weather.current.temperature} Celcius</p> 
        <img src={weather.current.weather_icons[0]} alt='weather photo'/>
        <p>wind: {weather.current.wind_speed} m/h direction {weather.current.wind_dir}</p>
    </div>
