import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginSubmit = async (event) => {
    event.preventDefault()
    const userToLogin = {
      username: username,
      password: password
    }
    await onLogin(userToLogin)
    setUsername('')  // GETTING WARNING. FIX IT!!!
    setPassword('')
  }

  return (
    <form onSubmit={loginSubmit}>
        username <input type='text' className='username' name='username' id='getUsername' value={username} onChange={({ target }) => setUsername(target.value)} /><br />
        password <input type='text' className='password' name='password' id='getPassword' value={password} onChange={({ target }) => setPassword(target.value)} />
      <input type='submit' name='submit' id='submitForm' value='Submit' />
    </form>
  )
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default Login