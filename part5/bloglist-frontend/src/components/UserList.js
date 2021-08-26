import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'

const UserList = () => {
  const users = useSelector(state => state.usersInfo)

  return (
    <div>
      <h1>Users</h1>
      <div>
        {users.map(user => <User key={user.id} user={user} />)}
      </div>
    </div>
  )
}

export default UserList