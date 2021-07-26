import { initialState, getId } from "../store"

export const createAnecdote = (anecdote) => {
  return {
    type: 'anecdotes/addNew',
    payload: anecdote
  }
}
export const voteAnecdote = (id) => {
  return {
    type: 'anecdotes/vote',
    payload: id
  }
}

const anecdotesReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'anecdotes/vote':
      return state.map(anecdote => 
        anecdote.id !== action.payload 
          ? anecdote
          : {...anecdote,
              votes: anecdote.votes + 1})
    case 'anecdotes/addNew':
      return [...state, {
        content: action.payload,
        id: getId(),
        votes: 0}]
    default:
      return state
  }
}

export default anecdotesReducer