const router = require('express').Router()
const asyncWrapper = require('../utils/asyncWrapper')
const clientsController = require('../controllers/clients.js')

// GET CLIENTS //
router.get('/', asyncWrapper(async (req, res) => {
  const response = await clientsController.getClients(req.token)
  res.json(response)
}))
module.exports = router