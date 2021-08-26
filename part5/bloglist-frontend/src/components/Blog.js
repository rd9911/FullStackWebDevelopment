import React from 'react'
// import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { blogRemover, blogLiker } from '../reducers/blogsReducer'
import { notificationCreator } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'

const Blog = ( props ) => {
  const userLoggedIn = useSelector(state => state.userLogged)
  const dispatch = useDispatch()
  const id = useParams().id
  console.log(props.blogs)
  let blog = props.blogs.find(blog => blog.id === id)
  console.log(blog)
  if (!blog) {
    return null
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
      <div className='detail-view'>
        {blog.title} by {blog.author} on <a href={blog.url}>{blog.url}</a> likes {blog.likes}
        <button value='like' className='like' onClick={() => like(blog.id, blog)} >like</button>
        <button value='delete' className='delete' onClick={() => removeBlog(blog.id, blog)} >delete</button>
      </div>
    </div>
  )
}

export default Blog