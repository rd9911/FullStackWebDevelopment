/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/login'

const login = async (user) => {
    const response = await axios.post(baseUrl, user);
    return response.data;
  }
  
export default { login }