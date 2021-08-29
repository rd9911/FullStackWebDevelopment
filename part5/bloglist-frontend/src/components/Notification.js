import React from 'react'
import { Alert } from '@material-ui/lab'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationMessage = useSelector(state => state.notification)

  return (
    <div>
      {notificationMessage ? <Alert severity='info'>{notificationMessage}</Alert> : '' }
    </div>
  )
}

export default Notification