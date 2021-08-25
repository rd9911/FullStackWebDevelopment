import React from 'react'

const User = ({ user }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs</th>
          </tr>
          <tr>
            <td>{user.username}</td>
            <td>{user.blogs.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default User