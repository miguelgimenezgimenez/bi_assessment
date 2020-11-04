const jwtDecode = require('jwt-decode')
const { ADMIN } = require('../constants/roles.js')
const authController = require('../controllers/auth.js')

async function refreshToken(req, res, next) {
  const { user } = req.session
  if (user) {
    const { token, username, password } = user
    const now = Date.now().valueOf() / 1000
    // this should be done verifying the token with the token secret.
    const { exp } = jwtDecode(token)
    if (now >= exp) {
      const response = await authController.login(username, password)
      req.session.user.token = response.token
    }
  } else if (req.token) {
    // QUICKFIX!!!
    // This is just to make swagger work, since I wasnt able to set the cookie in the swagger browser.
    req.session.user = { token: req.token, role: ADMIN }
  }
  next()
}
module.exports = refreshToken