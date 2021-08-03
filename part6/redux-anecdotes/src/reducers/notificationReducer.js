let timerId

export const createNotification = (message, time) => {
    if (timerId) {
        clearTimeout(timerId)
    }
    return async dispatch => {
        dispatch({
            type: 'notification/notify',
            notification: message
        })
        timerId = setTimeout(() => {
            dispatch( {
                type: 'notification/delete'
            })
        }, time * 1000)
    }
}

export const deleteNotification = () => {
    return {
        type: 'notification/delete'
    }
}

const notificationReducer = (state='', action) => {
    switch (action.type) {
        case 'notification/notify':
            return action.notification
        case 'notification/delete':
            return ''
        default:
            return state
    }
}

export default notificationReducer 