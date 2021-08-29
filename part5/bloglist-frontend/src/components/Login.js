import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notificationCreator } from '../reducers/notificationReducer'
import { userLoginSetter } from '../reducers/userLoginReducer userLoginReducer'
import loginService from '../services/login'
import { TextField, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const loginSubmit = async (event) => {
    event.preventDefault()
    const userToLogin = {
      username: username,
      password: password
    }
    try {
      const loggedUser = await loginService.login(userToLogin) // services.login(username, passwordtel )
      dispatch(userLoginSetter(loggedUser))
      window.localStorage.setItem('loggedUserJSON', JSON.stringify(loggedUser))
      dispatch(notificationCreator(`${loggedUser.username} has logged in`, 3))
      history.push('/')
    } catch(err) {
      console.log(err)
      dispatch(notificationCreator('invalid username or password', 3))
    }
    setUsername('')  // GETTING WARNING. FIX IT!!!
    setPassword('')
  }


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginSubmit}>
        <TextField required label='Username' variant='filled' size='small' id='getUsername' onChange={({ target }) => setUsername(target.value)} /><br />
        <TextField required label='Password' variant='filled' size='small' type='password' id='getPassword' onChange={({ target }) => setPassword(target.value)} />
        <Button variant='contained' color='primary' type='submit' id='submitForm' >Submit</Button>
      </form>
    </div>
  )
}


export default Login