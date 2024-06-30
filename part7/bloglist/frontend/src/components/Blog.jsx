import { useState } from "react"
import { Link } from "react-router-dom"

const Blog = ({ blog, handleLike, User, handleDelete }) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }


    let visibleDelete = false

    if(blog.user.username === User.username){
        visibleDelete = true
    }

    const showDelete = {display: visibleDelete ? '' : 'none'}

    return(
        <div >
        <div>
            <strong> {blog.title} - {blog.author} </strong> 
        </div>
        <div className='info'>
        <div className="url"> <Link  to={blog.url}> {blog.url}</Link> </div>
        <div className="likes"> <strong>Likes:</strong> {blog.likes} <button id='like' onClick={()=>handleLike(blog)}>like</button> </div>
        <div><strong>Added by </strong>{blog.user.name}</div>
        <div style={showDelete}>
            <button id='delete' onClick={() =>handleDelete(blog)}>remove</button>
        </div>
        </div>
        </div>  
    )

    
}

  export default Blog