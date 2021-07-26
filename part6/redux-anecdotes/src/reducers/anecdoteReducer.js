import { initialState, getId } from "../store"

export const createAnecdote = (anecdote) => {
  return {
    type: 'anecdotes/addNew',
    content: anecdote
  }
}
export const voteAnecdote = (id) => {
  return {
    type: 'anecdotes/vote',
    anecdoteId: id
  }
}

export const initialize = (anecdotes) => {
  return {
    type: 'anecdotes/init',
    anecdotes: anecdotes
  }
}

const anecdotesReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'anecdotes/vote':
      return state.map(anecdote => 
        anecdote.id !== action.anecdoteId 
          ? anecdote
          : {...anecdote,
              votes: anecdote.votes + 1})
    case 'anecdotes/addNew':
      return [...state, {
        content: action.content,
        id: getId(),
        votes: 0}]
    case 'anecdotes/init':
      return action.anecdotes
    default:
      return state
  }
}

export default anecdotesReducer