export const toggleTheState = () => {
  return async dispatch => {
    dispatch({
      type: 'state/toggle'
    })
  }
}

const toggleReducer = (state = false, action) => {
  switch (action.type) {
  case  'state/toggle':
    return !state
  default:
    return state
  }
}

export default toggleReducer
