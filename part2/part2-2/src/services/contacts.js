import axios from "axios";
const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl)
    return request
    .then(response => response.data)
    .catch(err => {
        console.log(err)
    });
}

const create = (newObject) => {
    const request = axios.post(`${baseUrl}`, newObject)
    return request.then(response => {
        console.log(response.data)
        return response.data
    })
    .catch(err => {
        console.log(err)
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