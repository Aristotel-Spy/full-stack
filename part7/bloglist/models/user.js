//our user model

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        minLength:3
    },
    passwordHash:String,
    name:String,
    blogs:[
        {
            type: mongoose.Schema.Types.ObjectId, //ObjectId references the notes id,mongoose doesn't inherently know this.
            ref: 'Blog' //model Name of the Blog.
        }
    ]
})


userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
    }
})

const User =  mongoose.model('User',userSchema)

module.exports = User

