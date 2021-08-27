import React, { useEffect } from 'react'
import {
  BrowserRouter as Router, Switch,Route,Link
} from 'react-router-dom'
import Login from './components/Login'
import CreateForm from './components/BlogForm'
import blogService from './services/blogs'
import userServices from './services/users'

import { useDispatch, useSelector } from 'react-redux'
import { blogsInitializer } from './reducers/blogsReducer'
import { usersInfoSetter } from './reducers/usersInfoReducer'
import { userLoginSetter } from './reducers/userLoginReducer userLoginReducer'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Blog from './components/Blog'
import User from './components/User'
import { horizontalNav } from './styles/navbar'

function Home() {
  return (<div>Welcome</div>)
}

const App = () => {
  const notification = useSelector(state => state.notification)
  const userLoggedIn = useSelector(state => state.userLogged)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.usersInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch( blogsInitializer(blogs) ))
    userServices.getAll().then(users => dispatch( usersInfoSetter(users) ))
  }, [])

  const logout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.clear()
    dispatch(userLoginSetter(''))
  }

  return (
    <div>
      <h3>{notification}</h3>
      {userLoggedIn
        ? <Router>
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
        </Router>
        : <div>
          <h2>Login</h2>
          <Login />
        </div>
      }
    </div>
  )
}

export default App