import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => {
        console.log('state', state)
        if (state.filter) {
            return state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
        }
        return state.anecdotes
    })
    const dispatch = useDispatch()
    console.log(anecdotes)

    const vote = (id, anecdote) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id, anecdote))
        dispatch(createNotification(`you liked "${anecdote.content}"`, 5))
      }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList