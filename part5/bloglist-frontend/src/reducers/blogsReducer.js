import blogService from '../services/blogs'

export const blogCreator = (blogToPost) => {
  return async dispatch => {
    await blogService.create(blogToPost)
    dispatch({
      type: 'blog/create',
      blog: blogToPost
    })
  }
}

export const blogsInitializer = (blogsToInitialize) => {
  return async dispatch => {
    dispatch({
      type: 'blog/initialize',
      blogs: blogsToInitialize
    })
  }
}

export const blogLiker = (blogId) => {
  return async dispatch => {
    await blogService.likeBlog(blogId)
    dispatch({
      type: 'blog/like',
      id: blogId
    })
  }
}

export const blogRemover = (blogId) => {
  return async dispatch => {
    await blogService.deleteBlog(blogId)
    dispatch({
      type: 'blog/remove',
      id: blogId
    })
  }
}

export const blogCommentor = (commentToAdd, blogId) => {
  return async dispatch => {
    await blogService.commentOnBlog(commentToAdd, blogId)
    dispatch({
      type: 'blog/comment',
      comment: commentToAdd,
      id: blogId
    })
  }
}


const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'blog/create':
    return state.concat(action.blog)
  case 'blog/initialize':
    return action.blogs
  case 'blog/like':
    return state.map(blog => {
      if (action.id === blog.id) { blog.likes += 1 }
      return blog
    })
  case 'blog/remove':
    return state.filter(blog => blog.id !== action.id)
  case 'blog/comment':
    return state.map(blog => {
      if (action.id === blog.id) { blog.comments.concat(action.comment) }
      return blog
    })
  default:
    return state
  }
}

export default blogsReducer