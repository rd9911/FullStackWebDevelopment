export const filterAnecdotes = (filterValue) => {
    return {
        type: 'filter/anecdotes',
        filterText: filterValue
    }
}

const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'filter/anecdotes':
            return action.filterText
        default:
            return state
    }
}

export default filterReducer