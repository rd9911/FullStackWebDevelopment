import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { notificationCreator } from '../reducers/notificationReducer'
import { userLoginSetter } from '../reducers/userLoginReducer userLoginReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    let isMounted = true
    const loggedUserJSON = window.localStorage.getItem('loggedUserJSON')
    if (isMounted && loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userLoginSetter(user))
      blogService.setToken(user.token)
    }
    return () => { isMounted = false }
  }, [])

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
      <form onSubmit={loginSubmit}>
        username <input type='text' className='username' name='username' id='getUsername' value={username} onChange={({ target }) => setUsername(target.value)} /><br />
        password <input type='text' className='password' name='password' id='getPassword' value={password} onChange={({ target }) => setPassword(target.value)} />
        <input type='submit' name='submit' id='submitForm' value='Submit' />
      </form>
    </div>
  )
}


export default Login