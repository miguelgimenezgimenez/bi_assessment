const logger = require('../utils/logger')

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  logger.log(error)
  let status = error || 500
  let message = error.message
  let code = 0
  if (error.isAxiosError) {
    status = error.response.data.statusCode
    message = error.response.data.message
  }
  res.status(status).send({ message, code })

}
