import axios from "axios";
const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const readyToPost = {
        method: 'post',
        url: `${baseUrl}`,
        data: newObject,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
        },
        json: true
      }
    const request = axios(readyToPost)
    return request.then(response => {
        return response.data
    })
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObj) => {
    const request = axios.put(`${baseUrl}/${id}`, newObj)
    return request.then(response => response.data)
}

const contactServices = {
    getAll, 
    create, 
    deleteContact, 
    update
}

export default contactServices;