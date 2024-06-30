import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorComp from './components/Error'
import Notif from './components/Notif'
import Blogform from './components/Blogform'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { blogAddNotif } from './reducers/notifReducer'
import { resetNotif } from './reducers/notifReducer'
import { useSelector } from 'react-redux'
import { setBlogs as setBlog } from './reducers/blogReducer'
import { addBlog } from './reducers/blogReducer'
import { deleteBlog } from './reducers/blogReducer'
import { likeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { removeUser } from './reducers/userReducer'
import { setUsers } from './reducers/usersReducer'
import usersService from './services/users'
import Users from './components/Users'

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useMatch //useMatch cannot be used in the component that defines the Router (BrowserRouter)
} from "react-router-dom"


const Blogs = ({blogFormRef,submitBlog,blogs,handleSort}) =>{

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return(
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <h2>create new</h2>
          <Blogform submitBlog={submitBlog}/>
        </Togglable>
        <div className='blog-list'>
        {blogs.map(blog =>
          <div key={blog.id} style={blogStyle}> <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link> </div>
        )}
        </div>
        <div>
          <button onClick={handleSort}>sort by likes</button>
        </div>
    </div>
  )
}

const User = ({user}) =>{

  if(!user){
      return null
  }

  return(
      <div>
        <h3>{user.name}</h3>
        <strong>added blogs</strong>
        <ul>
          {user.blogs.map(blog =>{

            return(
              <li key={blog.id}>{blog.title}</li>
            )
          })}
        </ul>
      </div>
  )
}

const App = () => {
  //use state for blogs array.
  //const [blogs, setBlogs] = useState([])

  const navigate = useNavigate()

  const padding = {
    paddingRight: 5
  }

  const [username,setUsername] = useState('')

  const [password,setPassword] = useState('')

  //const [user,setUser] = useState(null)

  const dispatch = useDispatch()

  const state = useSelector(state => state)

  //reference.

  const blogFormRef = useRef()

  //error and notification

  useEffect(() => {

    const fetchData = async () => {

      const blogs = await blogService.getAll() //this will return with populated users.

      

      dispatch(setBlog(blogs))

    }

    fetchData()

  }, [])

  useEffect(() => {

    const fetchData = async () => {

      const users= await usersService.getUsers() 

      dispatch(setUsers(users))

    }

    fetchData()

  }, [])

  useEffect(() => { //retrieve from browser memory.
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) { //if user found , has logged in before.
      const user = JSON.parse(loggedUserJSON) //turn it back to JS object.
      //setUser(user) //set the user
      dispatch(setUser(user))
      blogService.setToken(user.token) //and set his token.
    }
  }, [])

  const handleLogout = () => {
    //when you logout the user is automatically set to null and the user is removed from browser memory.

    window.localStorage.removeItem('loggedUser') //removes item from local storage.

    //setUser(null)
    dispatch(removeUser())

  }

  const handleLike = async (Blog) => {

    const likedBlog = { ...Blog,likes:Blog.likes + 1 }

    await blogService.like(likedBlog,likedBlog.id)

    dispatch(likeBlogs(Blog.id))

  }

  const handleLogin = async (event) => {

    event.preventDefault()

    try{

      const user = await loginService.login({ username:username,password:password })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user) //you need to turn it into a json first
        //even though my back-end is already returning it as a json, just for consistency
      ) //saving it to the browser's storage.

      //setUser(user)

      dispatch(setUser(user))

      blogService.setToken(user.token)

      setUsername('')
      setPassword('')


    }catch(exception){

      console.log('error:',exception.response.data.error)

      //setError(exception.response.data.error)

      dispatch(blogAddNotif(exception.response.data.error))

      setTimeout(() => {

        dispatch(resetNotif())

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

    const sortedBlogs = [...state.blogs].sort((blog1,blog2) => blog2.likes - blog1.likes)

    //need a shallow copy because .sort() doesn't return a new array with a new reference.
    //setBlogs(sortedBlogs)
    dispatch(setBlog(sortedBlogs))

  }

  const handleDelete = async (Blog) => {

    if(window.confirm(`Remove blog ${Blog.title} by ${Blog.author}`)){

      await blogService.del(Blog.id)

      //setBlogs(blogs.filter(blog => {

        //if(blog.id !== Blog.id){
        //  return blog
        //}
      //}))

      dispatch(deleteBlog(Blog.id))

      navigate('/blogs')




    }


  }


  const submitBlog = async (blog) => {

    blogFormRef.current.toggleVisibility()

    try{

      const response = await blogService.submit(blog)

      //setBlogs(blogs.concat(response))

      dispatch(addBlog(response))

      //setNotif(`A new blog ${blog.title} by ${blog.author} added!`)

      dispatch(blogAddNotif(`A new blog ${blog.title} by ${blog.author} added!`))

      setTimeout(() => {

        dispatch(resetNotif())

      },5000)



    }catch(exception) {

    }


  }

  const match = useMatch('/users/:id') //everytime the browser changes url
  //this is executed. if the url of the browser matches /anecdotes/:id
  //it sets the match to that.

  

  const usr = match //if match is not null, basically the browser url matched
    ? state.users.find(user => user.id === match.params.id ) //find the anec by extracting the id
    : null //else set the anec to null, since the browser url does not match and match is set to null

  const Secmatch = useMatch('/blogs/:id') //everytime the browser changes url
  //this is executed. if the url of the browser matches /anecdotes/:id
  //it sets the match to that.


  const blg = Secmatch //if match is not null, basically the browser url matched
    ? state.blogs.find(blog => blog.id === Secmatch.params.id ) //find the anec by extracting the id
    : null //else set the anec to null, since the browser url does not match and match is set to null

  

  
  if(state.user === null){

    return(
      <div>
        <ErrorComp er={state.notif}/>
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
        
        <Link style={padding} to='/users'>users</Link>
        <Link style={padding} to='/blogs'>blogs</Link> {state.user.name} logged-in
          <button id='logout' onClick={handleLogout}>logout</button>
        
        <h2>blog app</h2>
        

        <Notif notif={state.notif}/>
        
        <Routes>
        <Route path='/users' element={<Users users={state.users} />}></Route>
        <Route path='/users/:id' element={<User user={usr}/>}></Route>
        <Route path='/blogs' element={<Blogs blogFormRef={blogFormRef} submitBlog={submitBlog} handleSort={handleSort}
        blogs={state.blogs}/>}></Route>
        <Route path='/blogs/:id' element={<Blog blog={blg} User={state.user} handleDelete={handleDelete} 
        handleLike={handleLike} />}></Route>
        </Routes>
        
      </div>
    )

  }

}


export default App