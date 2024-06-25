const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


//blogs is the list of blogs from mongodb.
blogRouter.get('/',async (request,response)=>{

    const blogs = await Blog.find({}).populate('user',{username:1,name:1})

    response.status(200).json(blogs)
})

blogRouter.delete('/:id',async(request,response) =>{

    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
})

blogRouter.put('/:id',async(request,response)=>{

    const Body = request.body

    const newBlog = {
        title:Body.title,
        author:Body.author,
        url:Body.url,
        likes:Body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,newBlog,{new:true})

    response.status(200).json(updatedBlog)

})

const getTokenFrom = (request) => {

    const authorization = request.get('authorization')
    //extract the header from the request, request also contains the body from request.body(payload)
    //but it also contains other stuff such as the header.

    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }//else if the authorization is null or it doesn't start with Bearer return null.
    return null
  }

blogRouter.post('/',async (request,response) => {

    const body = request.body

    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    //if this fails will go to middleware errorHandler and say invalid token.
    //same if it is expired and it throws an expired error.

    if(!decodedToken.id){//authentication failed
        response.json(401).json({error:"invalid token!"})
    }
    
    const user = await User.findById(decodedToken.id)//contains the id of the user in the decoded token.

    const blog = new Blog({
        title:body.title,
        author:body.author,
        url:body.url,
        likes:body.likes || 0,
        user:user._id

    })

    const returnedBlog = await blog.save()

    user.blogs = user.blogs.concat(returnedBlog._id)

    await user.save()

    response.status(201).json(returnedBlog)
}) 

module.exports = blogRouter