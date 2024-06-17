import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>{

    return axios.get(baseUrl)
}

const inputNum = (newObject) =>{

    return axios.post(baseUrl,newObject)
}

const replaceNum = (newObject,id) =>{

    return axios.put(`${baseUrl}/${id}`,newObject)
}

const deleteNum = (id) =>{

    return axios.delete(`${baseUrl}/${id}`)
}


export default {
    getAll:getAll,
    inputNum:inputNum,
    deleteNum:deleteNum,
    replaceNum:replaceNum
}