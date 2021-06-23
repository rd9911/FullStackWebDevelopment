import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserJSON')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  const loginSubmit = async (event) => {
    event.preventDefault()
    const userToLogin = {
      username: username,
      password: password
    }
    try {
      console.log('logging in with ', username, password)
      const user = await loginService.login(userToLogin) // services.login(username, passwordtel )
      setUser(user)
      window.localStorage.setItem('loggedUserJSON', JSON.stringify(user))
      setUsername('')
      setPassword('')  
    } catch(err) {
      setErrorMessage('invalid username or password')
      setTimeout(() => { setErrorMessage('') }, 3000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.clear()
    setUser('')
  }


  const postBlog = async (event) => {
    event.preventDefault()
    const blogToPost = {
      title: title,
      author: author,
      url: url
    }
    try {
      await blogService.create(blogToPost)
      setTitle('')
      setAuthor('')
      setUrl('')
      setErrorMessage(`a new blog ${blogToPost.title} by ${blogToPost.author}`)
      setTimeout(() => { setErrorMessage('') }, 3000)
    } catch (error) {
      setErrorMessage(error)
      setTimeout(() => { setErrorMessage('') }, 3000)
    }

  }

  const handleCreateBlogClick = (e) => {
    setFormVisible(!formVisible)
  }


  


  return (
    <div>
      <div>
        <h3>{errorMessage}</h3>
        
        {user

          ? <div>
              <p>{user.username} logged in</p> <input type='button' value='logout' onClick={logout} />
              <div>
                {formVisible ? '' : <input type='button' value='create a blog' onClick={handleCreateBlogClick} />}
              </div>
              
              
              {formVisible 
              ? <div>
                <CreateForm handleSubmit={postBlog} handleCancelClick={handleCreateBlogClick} handleChangeTitle={setTitle} handleChangeAuthor={setAuthor} handleChangeUrl={setUrl} title={title} author={author} url={url} />
              </div>
              
              : ''}
                <div>
                  <h2>blogs</h2>
                  {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                    )}
                  </div>
            </div>

          : <div>
            <h2>Login</h2>
              <Login handleSubmit={loginSubmit} username={username} password={password} handleChangeUsername={setUsername} handleChangePassword={setPassword} />
          </div>
      }
      </div>
      
    </div>
  )
}

export default App