const logger = require('../utils/logger')

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  let status = error.statusCode || 500
  let message = error.message
  const output = { message }
  if (typeof error.code !== 'undefined') {
    output.code = error.code
  }
  logger.log(`ERROR: ${message}`)
  res.status(status).send(output)
}
