import React from 'react'
import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const handleFilter = (e) => {
        e.preventDefault()
        let filterValue = e.target.value
        dispatch(filterAnecdotes(filterValue))
    }

    const style = {
        marginBottom: 10
      }

    return (
        <div style={style}>
            filter <input type='text' onChange={handleFilter} />
        </div>
    )
}

export default Filter