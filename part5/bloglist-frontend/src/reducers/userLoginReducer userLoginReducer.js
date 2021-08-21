
export const userLoginSetter = (userToSet) => {
  return async dispatch => {
    dispatch({
      type: 'userLogin/set',
      user: userToSet
    })
  }
}

const userLoginReducer = (state='', action) => {
  switch (action.type) {
  case 'userLogin/set':
    return action.user
  default:
    return state
  }
}

export default userLoginReducer