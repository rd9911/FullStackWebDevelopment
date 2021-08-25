import React from 'react'
import { useDispatch } from 'react-redux'
import { userLoginSetter } from '../reducers/userLoginReducer userLoginReducer'

const Logout = () => {
  const dispatch = useDispatch()

  const logout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.clear()
    dispatch(userLoginSetter(''))
  }
  return (
    <div>
      <input type='button' className='logout' value='logout' onClick={logout} />
    </div>
  )
}

export default Logout