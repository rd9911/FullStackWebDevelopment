import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { blogRemover, blogLiker } from '../reducers/blogsReducer'
import { notificationCreator } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Blog = ( { blog } ) => {
  const [fullDetails, setFullDetails] = useState(false)
  const userLoggedIn = useSelector(state => state.userLogged)
  const dispatch = useDispatch()

  const handleChangeFullDetails = () => {
    setFullDetails(!fullDetails)
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

  return (
    <div>
      {fullDetails
        ?
        <div className='detail-view'>
          <Link to={`blog-list/${blog.id}`}>{blog.title} by {blog.author} on {blog.url} likes {blog.likes}</Link>
          <button value='like' className='like' onClick={() => like(blog.id, blog)} >like</button>
          <button value='delete' className='delete' onClick={() => removeBlog(blog.id, blog)} >delete</button>
          <button value='hide' className='hide' onClick={handleChangeFullDetails} >hide</button>
        </div>
        :
        <div className='short-view'>
          <Link to={`blog-list/${blog.id}`}>{blog.title} by {blog.author}</Link>
          <button value='view' className='view' onClick={handleChangeFullDetails} >view</button>
        </div>}
    </div>
  )
}

export default Blog