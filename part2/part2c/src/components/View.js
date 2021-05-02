import { nanoid } from 'nanoid'

export const View = ({country}) =>  {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <ul>
            {country.languages.map(language => <li key={nanoid()}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt="Country's flag" style={{height: '355px', width: '355px'}} />
        </div>
    )
}





