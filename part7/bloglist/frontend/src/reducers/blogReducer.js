import { createSlice } from '@reduxjs/toolkit'


const blogSlice = createSlice({
    name: 'blog',
    initialState:[],
    reducers: {

      likeBlogs(state,action) {

        const id = action.payload

        return state.map(blog =>{

          if(blog.id === id){

            const newBlog = {...blog,likes:blog.likes+1}

            return newBlog
          } else {
            return blog
          }
        })
      },

      setBlogs(state,action){

        return action.payload

      },

      addBlog(state,action){

        state.push(action.payload)
      },

      deleteBlog(state,action){

        const blogId = action.payload

        return state.filter((blog) =>{

            if(blog.id !== blogId){
                return true
            } else {
                return false
            }
        })
    }
  
    },

    
  })
   
export const { likeBlogs, setBlogs ,addBlog, deleteBlog} = blogSlice.actions
export default blogSlice.reducer
