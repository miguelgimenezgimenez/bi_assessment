const router = require('express').Router()
const asyncWrapper = require('../utils/asyncWrapper')
const clientsController = require('../controllers/clients.js')



// GET CLIENTS //
router.get('/', asyncWrapper(async (req, res) => {
  const {query, token} = req
  const response = await clientsController.getClients(token,query)
  res.json(response)
}))
module.exports = router