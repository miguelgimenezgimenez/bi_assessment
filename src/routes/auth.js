const router = require('express').Router()
const asyncWrapper = require('../utils/asyncWrapper')
const authController = require('../controllers/auth.js')

// LOGIN //
router.post('/', asyncWrapper(async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) throw new Error('MISSING USERNAME OR PASSWORD')
  const token = await authController.login(username, password)
  res.json({ token})
}))
module.exports = router