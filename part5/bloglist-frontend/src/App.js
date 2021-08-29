import React, { useEffect } from 'react'
import {
  Switch, Route
} from 'react-router-dom'
import Container from '@material-ui/core/Container'

import Login from './components/Login'
import CreateForm from './components/BlogForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Blog from './components/Blog'
import User from './components/User'
import Home from './components/Home'
import Notification from './components/Notification'
import NavigationBar from './components/NavigationBar'
import blogService from './services/blogs'
import userServices from './services/users'

import { useDispatch, useSelector } from 'react-redux'
import { blogsInitializer } from './reducers/blogsReducer'
import { usersInfoSetter } from './reducers/usersInfoReducer'
import { userLoginSetter } from './reducers/userLoginReducer userLoginReducer'


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.usersInfo)
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
  }, [dispatch])

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch( blogsInitializer(blogs) ))
    userServices.getAll().then(users => dispatch( usersInfoSetter(users) ))
  }, [dispatch])

  return (
    <div>
      <Notification />
      <Container>
        <div>
          <NavigationBar />
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/blog-list/:id'>
              <Blog blogs={blogs}/>
            </Route>
            <Route path='/user-list/:id'>
              <User users={users} />
            </Route>
            <Route path='/blog-list'>
              <BlogList />
            </Route>
            <Route path='/user-list'>
              <UserList />
            </Route>
            <Route path='/post-blog'>
              <CreateForm />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </Container>
    </div>
  )
}

export default App