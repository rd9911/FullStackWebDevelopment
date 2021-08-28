import React from 'react'
import { useSelector } from 'react-redux'
import CollapsibleTable from './CollapsibleTable'

const UserList = () => {
  const users = useSelector(state => state.usersInfo)

  return (
    <div>
      <h1>Users</h1>
      <CollapsibleTable rows={users} />
    </div>
  )
}



export default UserList