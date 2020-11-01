const router = require('express').Router()
const asyncWrapper = require('../utils/asyncWrapper')
const clientsController = require('../controllers/clients.js')


// GET CLIENTS //
router.get('/:id?', asyncWrapper(async (req, res) => {
  const { query, session, params } = req
  const options = { ...query, ...params }
  const clients = await clientsController.getClients(session.token, options)
  res.json(clients)
}))
module.exports = router