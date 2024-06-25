const userRouter = require('express').Router()

const bcrypt = require('bcrypt')

const User = require('../models/user')


userRouter.post('/',async (request,response)=>{

    const Body = request.body

    if(!Body.password){
        return response.status(400).json({error:'password must be given!'})
    }

    if(Body.password.length<3){
        return response.status(400).json({error:'password must be at least 3 chars long!'})
    }

    const passwordHash = await bcrypt.hash(request.body.password,10)//pass encryption before adding to db.

    const user = new User({
        username:Body.username,
        passwordHash:passwordHash,
        name:Body.name
    })

    const createdUser = await user.save()

    response.status(201).json(createdUser)


})

userRouter.get('/',async (request,response)=>{

    const users = await User.find({}).populate('blogs',{title:1,author:1,url:1})

    response.status(200).json(users)


})

module.exports = userRouter

