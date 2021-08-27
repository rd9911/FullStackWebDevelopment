import React from 'react'
// import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { blogRemover, blogLiker, blogCommentor } from '../reducers/blogsReducer'
import { notificationCreator } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'

const Blog = ( props ) => {
  const userLoggedIn = useSelector(state => state.userLogged)
  const dispatch = useDispatch()
  const id = useParams().id
  let blog = props.blogs.find(blog => blog.id === id)
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
        dispatch(notificationCreator('missing or invalid token.'))  // made these things as one action creator with paramters for the message and time
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

  const onComment = (comment, blogToComment) => {
    console.log(comment)
    try {
      dispatch(blogCommentor(comment, blogToComment.id))
      dispatch(notificationCreator(`The use ${userLoggedIn.username} has commented on the blog ${blogToComment.title}: ${comment}`))
      setTimeout(() => dispatch(notificationCreator(''), 3000))
    } catch (error) {
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

        <p>Comments</p>
        <form onSubmit={(event) => { onComment(event.target.comment.value, blog) }}>
          <input type='text' name='comment' />
          <button typ='submit'>Post</button>
        </form>
        {blog.comments ? blog.comments.map(comment => <li key={nanoid()}>{comment}</li>) : ''}
      </div>
    </div>
  )
}

export default Blog