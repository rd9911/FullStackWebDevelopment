export const notificationCreator = (message, time) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch({
        type:'bloglist/create-notification',
        notification: ''
      })
    }, time * 1000)
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