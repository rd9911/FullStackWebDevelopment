import React from 'react'
import { useParams } from 'react-router-dom'

const User = ( props ) => {
  const id = useParams().id
  const user = props.users.find(user => user.id === id)
  if (!user) {
    return null
  }

  return (
    <div>
      <p>{user.username}</p>
      <div>
        <h2>Added blogs</h2>
        <ul>
          {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default User