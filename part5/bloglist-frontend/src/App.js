import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Toggable from './components/Toggable'
import CreateForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    let isMounted = true
    const loggedUserJSON = window.localStorage.getItem('loggedUserJSON')
    if (isMounted && loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    return () => { isMounted = false }
  }, [])

  const loginRef = useRef()
  const blogRef = useRef()

  const login = async (userToLogin) => {
    try {
      loginRef.current.handleCreateBlogClick()
      const loggedUser = await loginService.login(userToLogin) // services.login(username, passwordtel )
      setUser(loggedUser)
      window.localStorage.setItem('loggedUserJSON', JSON.stringify(loggedUser))
      return loggedUser
    } catch(err) {
      console.log(err)
      setErrorMessage('invalid username or password')
      setTimeout(() => { setErrorMessage('') }, 3000)
    }
  }
  const logout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.clear()
    setUser('')
  }

  const postBlog = async (blogToPost) => {
    try {
      blogRef.current.handleCreateBlogClick()
      const postedBlog = await blogService.create(blogToPost)
      setBlogs(blogs.concat(postedBlog))
      setErrorMessage(`a new blog ${postedBlog.title} by ${postedBlog.author}`)
      setTimeout(() => { setErrorMessage('') }, 3000)
      return postedBlog
    } catch (error) {
      setErrorMessage(error)
      setTimeout(() => { setErrorMessage('') }, 3000)
    }
  }

  const like = async (blogId) => { // Chnage name of function
    try {
      const likedBlog = await blogService.likeBlog(blogId)
      const updatedBlogs = blogs.map(blog => {
        if (likedBlog.id === blog.id) {
          blog.likes += 1
        }
        return blog
      })
      setBlogs(updatedBlogs)
      setErrorMessage(`the blog ${likedBlog.title} is liked by ${user.username}`)
      setTimeout(() => { setErrorMessage('') }, 3000)
    } catch(error) {
      setErrorMessage(error)
      setTimeout(() => setErrorMessage(''), 3000)
    }
  }

  const removeBlog = async (blogId, blogToRemove) => {
    const confirm = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)
    if (confirm) {
      try {
        const deletedBlog = await blogService.deleteBlog(blogId)
        setBlogs(blogs.filter(blog => blog.id !== deletedBlog.id))
        setErrorMessage(`${deletedBlog.title} was deleted by ${user.username}`)
        setTimeout(() => setErrorMessage(''), 3000)
      } catch(error) {
        setErrorMessage('missing or invalid token.')
        setTimeout(() => setErrorMessage(''), 3000)
      }
    }
  }

  return (
    <div>
      <div>
        <h3>{errorMessage}</h3>
        {user
          ? <div>
            <p>{user.username} logged in</p>
            <input type='button' className='logout' value='logout' onClick={logout} />
            <Toggable btnLabel='create-blog' ref={blogRef} >
              <CreateForm onBlogPost={postBlog} />
            </Toggable>

            <div>
              <h2>blogs</h2>
              {blogs.sort((a, b) =>  b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} onLikeBlog={like} onRemoveBlog={removeBlog} />
              )}
            </div>
          </div>
          : <div>
            <h2>Login</h2>
            <Toggable btnLabel='log-in' ref={loginRef} >
              <Login onLogin={login} />
            </Toggable>
          </div>
        }
      </div>

    </div>
  )
}

export default App