import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { notificationCreator } from '../reducers/notificationReducer'
import { blogCreator } from '../reducers/blogsReducer'

const CreateForm = ({ onBlogPost }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const dispatch = useDispatch()

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  const postBlog = async (event) => {
    event.preventDefault()
    try {
      onBlogPost()
      const blogToPost = {
        title: title,
        author: author,
        url: url,
        details: false
      }
      dispatch(blogCreator(blogToPost))
      dispatch(notificationCreator(`a new blog ${blogToPost.title} by ${blogToPost.author}`))
      setTimeout(() => { dispatch(notificationCreator('')) }, 3000)
      clearForm()
    } catch (error) {
      dispatch(notificationCreator(error))
      setTimeout(() => { dispatch(notificationCreator('')) }, 3000)
    }
  }

  return (
    <div>
      Create new
      <form onSubmit={postBlog}>
        title <input className = 'title' value={title} onChange={({ target }) => { setTitle(target.value)} } /><br />
        author <input className ='author' value={author} onChange={({ target }) => { setAuthor(target.value)} } /><br />
        url <input className='url' value={url} onChange={({ target }) => { setUrl(target.value)} } /><br />
        <input type='submit' value='create' />
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  onBlogPost: PropTypes.func.isRequired
}

export default CreateForm