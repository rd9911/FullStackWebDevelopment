import React, { useState } from 'react';

const Button = ({handleClick, text}) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  )
}

const Best = ({anecdote}) => {
  return (
    <div>
      <p>{anecdote}</p>
    </div>
  )
}

function App() {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleNewSelection = () => {
    const newSelection = Math.floor(Math.random() * (anecdotes.length - 1))
    setSelected(newSelection)
  }
  const handleVotes = () => {
    const newVote = [...votes]
    const item = document.querySelector('#anecdote-of-day').textContent
    const indexOfItem = anecdotes.indexOf(item)
    newVote[indexOfItem] += 1
    setVotes(newVote)
  }

  const findTheMax = (arrOfItems, arrOfNumbers) => {
    const indexOfItem = arrOfNumbers.indexOf(Math.max(...arrOfNumbers))
    return arrOfItems[indexOfItem];
  }
  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p id='anecdote-of-day'>{anecdotes[selected]}</p>
        <p>Has {votes[anecdotes.indexOf(anecdotes[selected])]} votes</p>
        <Button handleClick={handleNewSelection} text='Next anectode' />
        <Button handleClick={handleVotes} text='Vote' />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <Best anecdote={findTheMax(anecdotes, votes)} />
      </div>
    </div>
  )
}

export default App;