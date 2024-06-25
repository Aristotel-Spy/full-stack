const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


//blogs is the list of blogs from mongodb.
blogRouter.get('/',async (request,response)=>{

    //populating it and returning every blog will contain the user information aswell.
    const blogs = await Blog.find({}).populate('user',{username:1,name:1,_id:1})

    response.status(200).json(blogs) //_id will return as id, because
    //the user model is going through a .json() which means that the transformation 
    //of the user schema will apply normally.
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
        likes:Body.likes,
        user:Body.user.id
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,newBlog,{new:true}).populate('user',{username:1,name:1,_id:1})

    response.status(200).json(updatedBlog)

})


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

    const savedBlog = await blog.save() //returns it as a mongoose item
    //hasn't gone through the schema transformation, only when it goes through
    //.json() it goes through the schema transformation.

    user.blogs = user.blogs.concat(savedBlog._id)

    //we need to retrieve the blog we just saved so that we can populate it.

    await user.save()

    //we use savedBlog._id because it hasn't gone through transformation yet.
    //so we use ._id instead of .id

    const returnedBlog = await Blog.findById(savedBlog._id).populate('user',{username:1,name:1,_id:1})

    response.status(201).json(returnedBlog)
}) 

module.exports = blogRouter