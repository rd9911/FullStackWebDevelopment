import React, {useEffect, useState} from 'react';
import { Filter } from './components/Filter'
import { View } from './components/View'
import { WeatherView } from './components/WeatherView'
import { nanoid } from 'nanoid'
import axios from 'axios'

const App = () => {
      const [ countries, setCountries ] = useState([]) 
      const [ searchingItem, setSearchingItem ] = useState('')
      const [ showAll, setShowAll ] = useState(true)
      const [ weatherData, setWeatherData ] = useState([])
      const [ capital, setCapital ] = useState('')
      const api_key = process.env.REACT_APP_WEATHER_API
      
      useEffect(() => {
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
            setCountries(countries.concat(response.data))
          })
      }, [])

      useEffect(() => {
        if (!capital) { return; }
        console.log(capital, searchingItem)
        axios
          .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
          .then( response => {

            setWeatherData(weatherData.concat(response.data))
          })
          .catch((err) => console.log(err))
      }, [capital])
      

      const handleChangeSearch = (event) => {
        setSearchingItem(event.target.value)
        setShowAll(false)
        }
  
      let countriesToShow = showAll
          ? countries
          : countries.filter(country => country.name.indexOf(searchingItem) !== -1);

      const handleClick = (country) => {
        setCapital(country.capital)
        setSearchingItem(country.name)
      }


      return (
        <div id='App'>
          <h2>Phonebook</h2>
          <div>
            Search a name <Filter value={searchingItem} onChange={handleChangeSearch} />
            <div>
            { countriesToShow.length === 250 
              ? '' 
              : countriesToShow.length >= 10 
              ? <div><p>Too many matches, specify another filter</p></div> 
              : countriesToShow.length > 1 
              ? countriesToShow.map(country => <div>
                <li key={nanoid()}>{country.name}
                <button type='button' onClick={() => handleClick(country)}>Show</button></li></div>)
              : countriesToShow.length === 1
              ? <div>
                  <View country={countriesToShow[0]} key={nanoid()}/>
                </div>
              : 'No results occured'}
            </div>
            <div>
              {console.log(weatherData)}
              {weatherData[0]  ? <WeatherView weather={weatherData[0]} /> : ''}
            </div>
          </div>
        </div>
      )
}
export default App;