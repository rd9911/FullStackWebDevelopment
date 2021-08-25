import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import userServices from '../services/users'
import { useDispatch  } from 'react-redux'
import { usersInfoSetter } from '../reducers/usersInfoReducer'
import User from './User'

const UserList = () => {
  const users = useSelector(state => state.usersInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    userServices.getAll().then(users => dispatch( usersInfoSetter(users) ))
  }, [])

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