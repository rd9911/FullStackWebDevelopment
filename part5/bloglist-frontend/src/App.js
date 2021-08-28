import React, { useEffect } from 'react'
import {
  Switch,Route, Link
} from 'react-router-dom'
import Container from '@material-ui/core/Container'

import Login from './components/Login'
import CreateForm from './components/BlogForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Blog from './components/Blog'
import User from './components/User'
import blogService from './services/blogs'
import userServices from './services/users'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { blogsInitializer } from './reducers/blogsReducer'
import { usersInfoSetter } from './reducers/usersInfoReducer'
import { userLoginSetter } from './reducers/userLoginReducer userLoginReducer'

import { horizontalNav } from './styles/navbar'
import Home from './components/Home'

const App = () => {
  const notification = useSelector(state => state.notification)
  const userLoggedIn = useSelector(state => state.userLogged)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.usersInfo)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch( blogsInitializer(blogs) ))
    userServices.getAll().then(users => dispatch( usersInfoSetter(users) ))
  }, [dispatch])

  const logout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.clear()
    dispatch(userLoginSetter(''))
    history.push('/login')
  }

  return (
    <div>
      { userLoggedIn ?
        <Container>
          <div>
            <h3>{notification}</h3>
            <div>
              <nav>
                <ul>
                  <li style={horizontalNav}><Link to='/'>Home</Link></li>
                  <li style={horizontalNav}><Link to='/blog-list'>Blogs</Link></li>
                  <li style={horizontalNav}><Link to='/user-list'>Users</Link></li>
                  <li style={horizontalNav}><Link to='/post-blog'>Post</Link></li>
                  {userLoggedIn.username} logged in
                  <li style={horizontalNav}><button onClick={logout}>Logout</button></li>
                </ul>
              </nav>
            </div>

            <Switch>
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
        :
        <div>
          <Route to='/login'>
            <Login />
          </Route>
        </div>
      }
    </div>
  )
}

export default App