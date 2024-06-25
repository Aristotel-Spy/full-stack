//our blog model.

const mongoose = require('mongoose')

//blog Schema
const blogSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    author:String,
    url:{
      type:String,
      required:true
    },
    likes: Number,
    user:{
          type: mongoose.Schema.Types.ObjectId, //ObjectId references the notes id,mongoose doesn't inherently know this.
          ref: 'User' //model Name of the Blog.
    }
  })

//transformation  


blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    }
})



//model
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog