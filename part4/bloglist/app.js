const express = require('express')
const config = require('./utils/config')
const app = express()
require('express-async-errors')
const logger =require('./utils/logger')
const userRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('Connecting to:',config.MONGODB_URI)


mongoose.connect(config.MONGODB_URI).then(()=>{
    logger.info("connected to mongodb")
}).catch(error=>{
    logger.error("couldn't connect to mongodb:",error.message)
})

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)

app.use('/api/login',loginRouter)
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)
//errorHandling middleware and middleware that are used after rooting go after blogRouter.

module.exports = app

