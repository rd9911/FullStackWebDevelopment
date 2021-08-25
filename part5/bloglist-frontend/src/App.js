import React, { useRef } from 'react'
import {
  BrowserRouter as Router, Switch,Route,Link
} from 'react-router-dom'
import Login from './components/Login'
import Toggable from './components/Toggable'
import CreateForm from './components/BlogForm'

import { useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Logout from './components/Logout'

function Home() {
  return (<div>Welcome</div>)
}

const App = () => {
  const notification = useSelector(state => state.notification)
  const userLoggedIn = useSelector(state => state.userLogged)

  const loginRef = useRef()
  const blogRef = useRef()

  const login = () => {
    loginRef.current.handleCreateBlogClick()
  }

  const postBlog = () => {
    blogRef.current.handleCreateBlogClick()
  }

  return (
    <div>
      <h3>{notification}</h3>
      {userLoggedIn
        ? <Router>
          <div>
            <p>{userLoggedIn.username} logged in</p>
            <nav>
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/blog-list'>Blogs</Link></li>
                <li><Link to='/user-list'>Users</Link></li>
                <li><Link to='/post-blog'>Post</Link></li>
                <li><Link to='/logout'>Logout</Link></li>
              </ul>
            </nav>
          </div>

          <Switch>
            <Route path='/blog-list/:id'>
              <BlogList />
            </Route>
            <Route path='/blog-list'>
              <BlogList />
            </Route>
            <Route path='/user-list'>
              <UserList />
            </Route>
            <Route path='/post-blog'>
              <Toggable btnLabel='create-blog' ref={blogRef} >
                <CreateForm onBlogPost={postBlog} />
              </Toggable>
            </Route>
            <Route path='/logout'>
              <Logout />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Router>
        : <div>
          <h2>Login</h2>
          <Toggable btnLabel='log-in' ref={loginRef} >
            <Login onLogin={login} />
          </Toggable>
        </div>
      }
    </div>
  )
}

export default App