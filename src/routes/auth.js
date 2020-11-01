const router = require('express').Router()
const asyncWrapper = require('../utils/asyncWrapper')
const authController = require('../controllers/auth.js')


// LOGIN //
router.post('/', asyncWrapper(async (req, res) => {

  const { username, password } = req.body

  if (!username || !password) return res.status(400).json({ message: 'MISSING USERNAME OR PASSWORD', code: 0 })

  const response = await authController.login(username, password)
  req.session.user = { username, password, token: response.data.token }

  res.json(response.data)
}))
module.exports = router