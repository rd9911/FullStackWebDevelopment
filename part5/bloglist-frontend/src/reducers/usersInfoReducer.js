export const usersInfoSetter = (usersInfo) => {
  return async dispatch => {
    dispatch({
      type: 'user/info',
      users: usersInfo
    })
  }
}

const usersInfoReducer = (state = [], action) => {
  switch (action.type) {
  case 'user/info':
    return action.users
  default:
    return state
  }
}

export default usersInfoReducer