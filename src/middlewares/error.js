const logger = require('../utils/logger')

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  const code = error.code || 500
  const message = error.message
  logger.log(error)
  res.status(code).send({ code, message })
}
