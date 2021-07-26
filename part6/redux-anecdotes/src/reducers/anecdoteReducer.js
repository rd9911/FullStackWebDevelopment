import { getId } from "../store"
import anecdotesServices from "../services/anecdotesServices"
import { createNotification } from "./notificationReducer"

export const createAnecdote = (content, time) => {
  return async dispatch => {
    await anecdotesServices.createNew(content)
    dispatch({
      type: 'anecdotes/addNew',
      content: content
    })
  }
}
export const voteAnecdote = (id, anecdote) => {
  return async dispatch => {
    await anecdotesServices.voteForAnecdote(id, anecdote)
    dispatch({
      type: 'anecdotes/vote',
      anecdoteId: id
    })
  }
}

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdotesServices.getAll()
    dispatch({
      type: 'anecdotes/init',
      anecdotes: anecdotes
    })
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