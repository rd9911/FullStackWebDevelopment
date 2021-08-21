import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Toggable from './components/Toggable'
import CreateForm from './components/BlogForm'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import userServices from './services/users'

import { notificationCreator } from './reducers/notificationReducer'
import { blogCreator, blogLiker, blogRemover, blogsInitializer } from './reducers/blogsReducer'
import { userLoginSetter } from './reducers/userLoginReducer userLoginReducer'
import { usersInfoSetter } from './reducers/usersInfoReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.usersInfo)
  const errorMessage = useSelector(state => state.notification)
  const userLoggedIn = useSelector(state => state.userLogin)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch( blogsInitializer(blogs))
    )
    userServices.getAll().then(users => dispatch( usersInfoSetter(users) ))
  }, [])

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

  const loginRef = useRef()
  const blogRef = useRef()

  const login = async (userToLogin) => {
    try {
      loginRef.current.handleCreateBlogClick()
      const loggedUser = await loginService.login(userToLogin) // services.login(username, passwordtel )
      dispatch(userLoginSetter(loggedUser))
      window.localStorage.setItem('loggedUserJSON', JSON.stringify(loggedUser))
      return loggedUser
    } catch(err) {
      console.log(err)
      dispatch(notificationCreator('invalid username or password'))
      setTimeout(() => { dispatch(notificationCreator('')) }, 3000)
    }
  }
  const logout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.clear()
    dispatch(userLoginSetter(''))
  }

  const postBlog = async (blogToPost) => {
    try {
      blogRef.current.handleCreateBlogClick()
      dispatch(blogCreator(blogToPost))
      dispatch(notificationCreator(`a new blog ${blogToPost.title} by ${blogToPost.author}`))
      setTimeout(() => { dispatch(notificationCreator('')) }, 3000)
    } catch (error) {
      dispatch(notificationCreator(error))
      setTimeout(() => { dispatch(notificationCreator('')) }, 3000)
    }
  }

  const like = async (blogId, blogToLike) => { // Chnage name of function
    try {
      dispatch(blogLiker(blogId))
      dispatch(notificationCreator(`the blog ${blogToLike.title} is liked by ${userLoggedIn.username}`))
      setTimeout(() => { dispatch(notificationCreator('')) }, 3000)
    } catch(error) {
      dispatch(notificationCreator(error))
      setTimeout(() => dispatch(notificationCreator('')), 3000)
    }
  }

  const removeBlog = async (blogId, blogToRemove) => {
    const confirm = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)
    if (confirm) {
      try {
        dispatch(blogRemover(blogId))
        dispatch(notificationCreator(`${blogToRemove.title} was deleted by ${userLoggedIn.username}`))
        setTimeout(() => dispatch(notificationCreator('')), 3000)
      } catch(error) {
        dispatch(notificationCreator('missing or invalid token.'))
        setTimeout(() => dispatch(notificationCreator('')), 3000)
      }
    }
  }

  return (
    <div>
      <div>
        <h3>{errorMessage}</h3>
        {userLoggedIn
          ? <div>
            <p>{userLoggedIn.username} logged in</p>
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
            <h1>Users</h1>
            <div>
              {users.map(user => <User key={user.id} user={user} />)}
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