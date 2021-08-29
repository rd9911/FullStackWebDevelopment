import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginSetter } from '../reducers/userLoginReducer userLoginReducer'
import { useHistory } from 'react-router-dom'


const linkLook = { textDecoration: 'none' }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))


const NavigationBar = () => {
  const classes = useStyles()
  const userLoggedIn = useSelector(state => state.userLogged)
  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.clear()
    dispatch(userLoginSetter(''))
    history.push('/login')
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <IconButton edge='start' color='inherit' aria-label='menu' ></IconButton>
          <Button color='inherit' component={Link} style={linkLook} to='/'>
            <Typography variant="h6" className={classes.title}>Home</Typography>
          </Button>
          <Button color='inherit' component={Link} style={linkLook} to='/blog-list'>
            <Typography variant="h6" className={classes.title}>Blogs</Typography>
          </Button>
          <Button color='inherit' component={Link} style={linkLook} to='/user-list'>
            <Typography variant="h6" className={classes.title}>Users</Typography>
          </Button>
          <Button color='inherit' component={Link} style={linkLook} to='/post-blog'>
            <Typography variant="h6" className={classes.title}>Publish</Typography>
          </Button>
          { userLoggedIn ?
            <div style={{ display: 'inline', align: 'left' }}>{`${userLoggedIn.username} logged in`}
              <Button color='inherit' onClick={logout} >
                <Typography variant="h6" className={classes.title}>Logout</Typography>
              </Button>
            </div>
            : <Button color='inherit' style={{ ...linkLook, align: 'left' }} component={Link} to='/login'>
              <Typography variant="h6" className={classes.title}>Login</Typography>
            </Button> }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavigationBar