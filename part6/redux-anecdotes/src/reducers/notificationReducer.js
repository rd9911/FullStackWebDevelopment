export const createNotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'notification/notify',
            notification: message
        })
        setTimeout(() => {
            dispatch({
                type: 'notification/notify',
                notification: ''
            })
        }, time * 1000)
    }
}

const notificationReducer = (state='', action) => {
    switch (action.type) {
        case 'notification/notify':
            return action.notification
        default:
            return state
    }
}

export default notificationReducer