export const notificationCreator = (message) => {
  return async dispatch => {
    dispatch({
      type: 'bloglist/create-notification',
      notification: message
    })
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'bloglist/create-notification':
    return action.notification
  default:
    return state
  }
}

export default notificationReducer