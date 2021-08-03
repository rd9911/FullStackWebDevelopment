import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {
    const handleFilter = (e) => {
        e.preventDefault()
        let filterValue = e.target.value
        props.filterAnecdotes(filterValue)
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



const ConnectedFilter = connect(
    null,
    { filterAnecdotes }
)(Filter)

export default ConnectedFilter