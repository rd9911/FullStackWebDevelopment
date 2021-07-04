import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (tokenFromUser) => {
  token = `bearer ${tokenFromUser}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const likeBlog = async (blogId) => {
  if (token) {
    const config = {
      headers: {
        Authorization: token
      }
    }
    const response = await axios.put(`${baseUrl}/${blogId}`, config)
    return response.data
  }
}

const deleteBlog = async (blogId) => {
  if (token) {
    const config = {
      headers: {
        Authorization: token
      }
    }
    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    return response.data
  }
}

export default { getAll, create, setToken, likeBlog, deleteBlog }