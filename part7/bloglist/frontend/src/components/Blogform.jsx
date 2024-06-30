import { useState } from 'react'

const Blogform = ({ submitBlog }) =>{

    const [title,setTitle] = useState('')

    const [author,setAuthor] = useState('')

    const [url,setUrl] = useState('')

    const handleTitle = (event) =>{
        setTitle(event.target.value)
      }
    
    const handleAuthor = (event) =>{
        setAuthor(event.target.value)
    }
    
    const handleURL = (event) =>{
    setUrl(event.target.value)
    }

    const addBlog = async (event) =>{

        event.preventDefault()

        await submitBlog({author:author,title:title,url:url})

        setTitle('')
        setAuthor('')
        setUrl('')

    }

    return(
        <form onSubmit={addBlog}>
        <div>title:<input id='title' value={title} onChange={handleTitle} placeholder='title'/></div>
        <div>author:<input id='author' value={author} onChange={handleAuthor} placeholder='author'/></div>
        <div>url:<input id='url' value={url} onChange={handleURL} placeholder='url'/></div>
        <button id='submit' type='submit'>submit</button>
      </form>
    )
}

export default Blogform