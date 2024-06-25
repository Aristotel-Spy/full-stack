const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')


loginRouter.post('/',async (request,response)=>{

    const {password, username} = request.body

    const user = await User.findOne({username})
    //returns null if it's not found. else returns the mongoose object from the db.

    //if user is null set password to false, otherwise get the password from the passwordHash
    const passwordCorrect = user === null ? false : await bcrypt.compare(password,user.passwordHash)
    //.compare() will return either true or false.

    //if user is null or password is false.

    if(!(user && passwordCorrect)){
        //401 = authentication failed!
        return response.status(401).json({error:'wrong username or password!'})
    }

    //else if everything is fine , you create the userForToken
    //javascript object which will be used to encode the token.


    const userForToken = {
        username:username,
        id:user._id
    }

    const token = jwt.sign(userForToken,process.env.SECRET,{expiresIn:60*60})

    return response.status(200).json({token:token,username:user.username,name:user.name})

})

module.exports = loginRouter