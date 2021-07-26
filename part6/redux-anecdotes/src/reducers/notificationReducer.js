export const createNotification = (message) => {
    return {
        type: 'notification/notify',
        notification: message
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