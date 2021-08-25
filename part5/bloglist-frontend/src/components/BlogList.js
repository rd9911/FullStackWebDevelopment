import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { blogsInitializer } from '../reducers/blogsReducer'
import Blog from './Blog'
import { useParams } from 'react-router'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  let blogById
  const id = useParams().id.then(idOfBlog => {
    console.log(id)
    blogById = blogs.find(blog => blog.id === Number(idOfBlog))
    console.log(blogById)
  })

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch( blogsInitializer(blogs) ))
  }, [])

  return (
    <div>
      {id ? <Blog blog={blogById} />
        : <div>
          <h2>blogs</h2>
          {blogs.sort((a, b) =>  b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default BlogList