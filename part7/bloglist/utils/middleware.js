const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)


  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
    return response.status(400).json({error:'username must be unique!'})
  } else if (error.name ===  'JsonWebTokenError') { //for an invalid token
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') { //for an expired token.
    return response.status(401).json({
      error: 'token expired'
    })
  }


  next(error)
}

//token extractor middleware.
const tokenExtractor = (request, response, next) => {
  // code that extracts the token

    const authorization = request.get('authorization')
    //extract the header from the request, request also contains the body from request.body(payload)
    //but it also contains other stuff such as the header.

    if (authorization && authorization.startsWith('Bearer ')) {
      request.token =  authorization.replace('Bearer ', '')
    } else {
      request.token = null
    }
      

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}