import axios from 'axios'

const baseUrl = '/api/blogs'

let token = ''

const setToken = (newToken) => {

    token = `Bearer ${newToken}`
}

const getAll = async () => {

  const response = await axios.get(baseUrl) //this will return with populated users.

  return response.data
}

const submit = async (blog) =>{

    const config = {
        headers: { Authorization: token },
      } //configuration
    

    const response = await axios.post(baseUrl,blog,config)

    return response.data
}

const like = async (blog,id) =>{

  const response = await axios.put(`${baseUrl}/${id}`,blog)

  return response.data
}

const del = async (id) =>{

  await axios.delete(`${baseUrl}/${id}`)
  
}
export default { 
    getAll:getAll,
    setToken:setToken,
    submit:submit,
    like:like,
    del:del
}