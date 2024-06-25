import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorComp from './components/Error'
import Notif from './components/Notif'
import Blogform from './components/Blogform'
import Togglable from './components/Togglable'


const App = () => {
  //use state for blogs array.
  const [blogs, setBlogs] = useState([])

  const [username,setUsername] = useState('')

  const [password,setPassword] = useState('')

  const [user,setUser] = useState(null)

  //reference.

  const blogFormRef = useRef()

  //error and notification

  const [er,setError] = useState(null)

  const [notif,setNotif] = useState(null)

  useEffect(() => {

    const fetchData = async () => {

      const blogs = await blogService.getAll() //this will return with populated users.

      setBlogs(blogs)

    }

    fetchData()

  }, [])

  useEffect(() => { //retrieve from browser memory.
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) { //if user found , has logged in before.
      const user = JSON.parse(loggedUserJSON) //turn it back to JS object.
      setUser(user) //set the user
      blogService.setToken(user.token) //and set his token.
    }
  }, [])

  const handleLogout = () => {
    //when you logout the user is automatically set to null and the user is removed from browser memory.

    window.localStorage.removeItem('loggedUser') //removes item from local storage.

    setUser(null)

  }

  const handleLike = async (Blog) => {

    const likedBlog = { ...Blog,likes:Blog.likes + 1 }

    const updatedBlog = await blogService.like(likedBlog,likedBlog.id)

    const removedBlogBlogs = blogs.map(blog => {

      if(blog.id !== Blog.id)
      {
        return blog

      } else {

        return updatedBlog
      }
    })

    setBlogs(removedBlogBlogs)

  }

  const handleLogin = async (event) => {

    event.preventDefault()

    try{

      const user = await loginService.login({ username:username,password:password })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user) //you need to turn it into a json first
        //even though my back-end is already returning it as a json, just for consistency
      ) //saving it to the browser's storage.

      setUser(user)

      blogService.setToken(user.token)

      setUsername('')
      setPassword('')


    }catch(exception){

      console.log('error:',exception.response.data.error)

      setError(exception.response.data.error)

      setTimeout(() => {

        setError(null)

      },5000)


    }


  }

  const handleUsername = (event) => {

    setUsername(event.target.value)
  }

  const handlePassword = (event) => {

    setPassword(event.target.value)
  }

  const handleSort = () => {

    const sortedBlogs = [...blogs].sort((blog1,blog2) => blog2.likes - blog1.likes)

    //need a shallow copy because .sort() doesn't return a new array with a new reference.
    setBlogs(sortedBlogs)

  }

  const handleDelete = async (Blog) => {

    if(window.confirm(`Remove blog ${Blog.title} by ${Blog.author}`)){

      await blogService.del(Blog.id)

      setBlogs(blogs.filter(blog => {

        if(blog.id !== Blog.id){
          return blog
        }
      }))


    }


  }


  const submitBlog = async (blog) => {

    blogFormRef.current.toggleVisibility()

    try{

      const response = await blogService.submit(blog)

      setBlogs(blogs.concat(response))

      setNotif(`A new blog ${blog.title} by ${blog.author} added!`)

      setTimeout(() => {

        setNotif(null)

      },5000)



    }catch(exception) {

    }


  }


  if(user === null){

    return(
      <div>
        <ErrorComp er={er}/>
        <form onSubmit={handleLogin}>
          <div >Username:<input id='username' value={username} onChange={handleUsername}/></div>
          <div >Password:<input id='password' value={password} type='password' onChange={handlePassword}/></div>
          <button id='login-button' type='submit'>login</button>
        </form>
      </div>
    )


  } else {

    return(
      <div>
        <h2>blogs</h2>
        <Notif notif={notif}/>
        <p>{user.name} logged-in
          <button id='logout' onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <h2>create new</h2>
          <Blogform submitBlog={submitBlog}/>
        </Togglable>
        <div className='blog-list'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} User={user} handleDelete={handleDelete}/>
        )}
        </div>
        <div>
          <button onClick={handleSort}>sort by likes</button>
        </div>
      </div>
    )

  }

}

export default App