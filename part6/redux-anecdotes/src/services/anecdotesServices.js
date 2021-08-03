import axios from 'axios'
import { getId } from '../store'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const anecdote = {
        content: content,
        id: getId(),
        votes: 0
    }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const voteForAnecdote = async (id, anecdote) => {
    console.log(baseUrl, id, anecdote)
    const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, voteForAnecdote }