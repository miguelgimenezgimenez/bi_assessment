const jwtDecode = require('jwt-decode')
const authController = require('../controllers/auth.js')
const logger = require('../utils/logger.js')


async function refreshToken(req, res, next) {
  const { user } = req.session
  if (user) {
    logger.log('logged in')
    const { token, username, password } = user
    const now = Date.now().valueOf() / 1000
    // this should be done verifying the token with the token secret.
    const { exp } = jwtDecode(token)
    if (now >= exp) {
      const response = await authController.login(username, password)
      req.session.user.token = response.token
    }
  }
  next()
}
module.exports = refreshToken