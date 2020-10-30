const router = require('express').Router()
const asyncWrapper = require('../utils/asyncWrapper')
const clientsController = require('../controllers/clients.js')



// GET CLIENTS //
router.get('/:id?', asyncWrapper(async (req, res) => {
  const { query, token, params } = req
  const options = {...query, ...params}
  const clients = await clientsController.getClients(token,options)
  res.json(clients)
}))
module.exports = router