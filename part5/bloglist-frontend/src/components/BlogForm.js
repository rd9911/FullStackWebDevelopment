import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateForm = ({ onBlogPost }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const postBlog = async (event) => {
    event.preventDefault()
    const blogToPost = {
      title: title,
      author: author,
      url: url,
      details: false
    }
    const postedBlog = await onBlogPost(blogToPost)
    if (postedBlog) {
      setTitle('')
      setAuthor('')
      setUrl('')
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