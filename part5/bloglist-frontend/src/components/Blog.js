import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLikeBlog, onRemoveBlog }) => {

  const [fullDetails, setFullDetails] = useState(false)

  const handleChangeFullDetails = () => {
    setFullDetails(!fullDetails)
  }

  return (
    <div>
      {fullDetails
        ?
        <div className='detail-view'>
          {blog.title} by {blog.author} on {blog.url} likes {blog.likes}
          <button value='like' onClick={() => onLikeBlog(blog.id)} >like</button>
          <button value='delete' onClick={() => onRemoveBlog(blog.id, blog)} >delete</button>
          <button value='hide' onClick={handleChangeFullDetails} >hide</button>
        </div>
        :
        <div className='short-view'>
          {blog.title} by {blog.author}
          <button value='view' onClick={handleChangeFullDetails} >view</button>
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // onLikeBlog: PropTypes.func.isRequired,
  // onRemoveBlog: PropTypes.func.isRequired
}

export default Blog