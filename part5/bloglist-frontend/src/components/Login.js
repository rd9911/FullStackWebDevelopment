import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { notificationCreator } from '../reducers/notificationReducer'
import { userLoginSetter } from '../reducers/userLoginReducer userLoginReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { TextField, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    let isMounted = true
    const loggedUserJSON = window.localStorage.getItem('loggedUserJSON')
    if (isMounted && loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userLoginSetter(user))
      blogService.setToken(user.token)
    }
    return () => { isMounted = false }
  }, [dispatch])

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
      history.push('/')
    } catch(err) {
      console.log(err)
      dispatch(notificationCreator('invalid username or password'))
      setTimeout(() => { dispatch(notificationCreator('')) }, 3000)
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