import { useState } from "react"

const Blog = ({ blog, handleLike, User, handleDelete }) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }

    const [visible,setVisible] = useState(false)

    let visibleDelete = false

    if(blog.user.username === User.username){
        visibleDelete = true
    }

    const toggleVisibility = () => {

        setVisible(!visible)
    }

    const showVisible = {display: visible ? 'none' : ''}

    const hideVisible = {display: visible ? '' : 'none'}

    const showDelete = {display: visibleDelete ? '' : 'none'}

    return(
        <div style={blogStyle}>
        <div style={showVisible} className='blog'>
            <strong> {blog.title} - {blog.author} </strong> <button id='show' onClick={toggleVisibility}>show</button>
        </div>
        <div style={hideVisible}>
            <strong> {blog.title} {blog.author} </strong> <button onClick={toggleVisibility}>hide</button>
        </div>
        <div className='info' style={hideVisible} >
        <div className="url"> <strong>URL:</strong>{blog.url}</div>
        <div className="likes"> <strong>Likes:</strong> {blog.likes} <button id='like' onClick={()=>handleLike(blog)}>like</button> </div>
        <div><strong>User:</strong>{blog.user.name}</div>
        <div style={showDelete}>
            <button id='delete' onClick={() =>handleDelete(blog)}>remove</button>
        </div>
        </div>
        </div>  
    )

    
}

  export default Blog