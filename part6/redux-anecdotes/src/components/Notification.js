import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const displayNotification = () => {
    return props.notification
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {displayNotification()}
    </div>
  )
}

const mapStateProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateProps
)(Notification)

export default ConnectedNotification