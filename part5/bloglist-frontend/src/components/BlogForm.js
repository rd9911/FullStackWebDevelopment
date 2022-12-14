import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notificationCreator } from '../reducers/notificationReducer'
import { blogCreator } from '../reducers/blogsReducer'
import { useHistory } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'

const CreateForm = () => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const userLoggedIn = useSelector(state => state.userLogged)
  const dispatch = useDispatch()
  const history = useHistory()

  const loginChecker = () => { // to disable publishing when a user is not logged in
    return userLoggedIn ? false : true
  }

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  const postBlog = async (event) => {
    event.preventDefault()
    try {
      const blogToPost = {
        title: title,
        author: author,
        url: url,
        details: false
      }
      dispatch(blogCreator(blogToPost))
      dispatch(notificationCreator(`a new blog ${blogToPost.title} by ${blogToPost.author}`, 3))
      clearForm()
      history.push('/blog-list')
      history.go(0)
    } catch (error) {
      dispatch(notificationCreator(error, 3))
    }
  }

  return (
    <div>
      <form onSubmit={postBlog} onClick={() => !userLoggedIn ? dispatch(notificationCreator('You cannot publish anything unless you are logged in. Please, sign up or log in to be able to publish', 5)) : ''} >
        <TextField required disabled={loginChecker()} variant='filled' label='Title'  className = 'title' value={title} onChange={({ target }) => { setTitle(target.value)} } /><br />
        <TextField required disabled={loginChecker()} variant='filled' label='Author'  className ='author' value={author} onChange={({ target }) => { setAuthor(target.value)} } /><br />
        <TextField required disabled={loginChecker()} variant='filled' label='Link'  className='url' value={url} onChange={({ target }) => { setUrl(target.value)} } /><br />
        <Button disabled={loginChecker()} type='submit' variant='contained' color='primary' size='small'>Publish</Button>
      </form>
    </div>
  )
}

export default CreateForm