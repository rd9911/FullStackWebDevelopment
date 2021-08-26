import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.usersInfo)

  return (
    <div>
      <h1>Users</h1>
      <div>
        {users.map(user => <div key={user.id}>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Blogs</th>
              </tr>
              <tr>
                <td><Link to={`user-list/${user.id}`} >{user.username}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            </tbody>
          </table>
        </div>)}
      </div>
    </div>
  )
}



export default UserList