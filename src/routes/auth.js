const router = require('express').Router()
const asyncWrapper = require('../utils/asyncWrapper')
const authController = require('../controllers/auth.js')


// LOGIN //
router.post('/', asyncWrapper(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) return res.status(400).json({ message: 'MISSING USERNAME OR PASSWORD', code: 0 })
  const response = await authController.login(username, password)
  const { token, expires_in, type, role, clientId } = response
  req.session.user = { username, password, token, role, clientId }

  res.json({ token, type, expires_in })
}))
module.exports = router