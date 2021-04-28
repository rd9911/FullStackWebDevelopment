import React, {useState} from 'react';
import { Contact } from './components/Contact'
import { Filter } from './components/Filter'
import { Name } from './components/Name'
import { Number } from './components/Number'
import { nanoid } from 'nanoid'

const App = () => {
    const [ persons, setPersons ] = useState([
      { name: 'Arto Hellas', number: '123-234-432' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ]) 
      const [ newName, setNewName ] = useState('')
      const [ newNumber, setNewNumber ] = useState('')
      const [ searchingItem, setSearchingItem ] = useState('')
      const [ showAll, setShowAll ] = useState(true)       
      
      const isExist = (arr, item) => {
        arr.map(arrItem => {
          console.log(arrItem.name, item)
          if (arrItem.name === item) {
            alert(`${newName} is already exist`);
          } else {
            return false;
          }
        })
      }

      const handleChangeName = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
      }
      const handleChangeNumber = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
      }
      const handleChangeSearch = (event) => {
        console.log(event.target.value);
        setSearchingItem(event.target.value)
        setShowAll(false)
        }
      const addPerson = (event) => {
          event.preventDefault();
          if (!isExist(persons, newName)) {
            const newOne = { 
              name: newName,
              number: newNumber
            }
            setPersons(persons.concat(newOne))
            console.log(newName)
            setNewName('')
        }
      }

      const contactsToShow = showAll
          ? persons
          : persons.filter(person => person.name.indexOf(searchingItem) !== -1);

      return (
        <div>
          <h2>Phonebook</h2>
          <div>
            Search a name <Filter value={searchingItem} onChange={handleChangeSearch} />
          </div>
          <h2>Add a new contact</h2>
          <form onSubmit={addPerson}>
            <div>
              name <Name value={newName} onChange={handleChangeName} />
            </div>
            <div>
              number <Number value={newNumber} onChange={handleChangeNumber} />
            </div>
            <div>
              <button type="submit">add</button>
            </div>
          </form>
          <h2>{showAll ? 'Numbers' : 'Result'}</h2>
          <div>debug: {newName}</div>
          <ul>
            
            {contactsToShow.map(contact => <Contact key={nanoid()} contact={contact} />)}
          </ul>
        </div>
      )
}
export default App;