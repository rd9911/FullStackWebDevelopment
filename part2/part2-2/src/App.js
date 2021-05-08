import React, {useEffect, useState} from 'react';
import { Contact } from './components/Contact';
import { Filter } from './components/Filter';
import { Name } from './components/Name';
import { Number } from './components/Number';
import contactServices from './services/contacts';
import { isExist } from './helperFuncs/findTheSame'
import styleFormats from './styles/styles';
import { nanoid } from 'nanoid';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchingItem, setSearchingItem ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ showAll, setShowAll ] = useState(true)       
    

  
  useEffect(() => {
    contactServices
      .getAll()
      .then(allContacts => setPersons(allContacts))
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (isExist(persons, newName) === false) {
      const newOne = {
        id: nanoid(),
        name: newName,
        number: newNumber
      }
      contactServices
        .create(newOne)
        .then(newContact => {
          setPersons(persons.concat(newContact))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`${newContact.name} is added.`)
        })
      } else {
        if (window.confirm(`${newName} is already exist. Thus, we can replace ${newName}'s number. Do you want to replace his number?`)) {
          const contact = persons.find(person => person.name === newName)
          const changedPerson = {...contact, number: newNumber}

          contactServices
            .update(contact.id, changedPerson)
            .then(updatedContact => {
              setPersons(persons.map(person => person.id === contact.id ? updatedContact : person))
              console.log(persons)
              setNewNumber('')
              setNewName('')
              setErrorMessage(`${updatedContact.name}'s number is changed`)
            })
            .catch(err => {
              if (err.response.status === 404) {
                setErrorMessage(`${contact.name}'s data have already removed.`)
              }
            })
        }
         
      }
  }

  const deletePerson = (id) => {
    console.log(id)
    contactServices
      .deleteContact(id)
      .then(remainedContacts => {
        setPersons(persons.filter(person => person.id !== id))
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

  const contactsToShow = showAll
      ? persons
      : persons.filter(person => person.name.indexOf(searchingItem) !== -1);

  return (
    <div> 
      <h2>Phonebook</h2>
      
        {errorMessage === '' ? '' : 
          <div style={styleFormats.messageToUser}>
            <h1 style={{fontColor: 'red'}}>{errorMessage}</h1>
          </div>}
      
      
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
        {contactsToShow.map(contact => <Contact key={nanoid()} contact={contact} deleteClick={() => deletePerson(contact.id)} />)}
      </ul>
    </div>
  )
}
export default App;