const router = require('express').Router()
const asyncWrapper = require('../utils/asyncWrapper')
const clientsController = require('../controllers/clients.js')
const policiesController = require('../controllers/policies.js')
const { standardPermission } = require('../middlewares/permissions')

// GET CLIENTS //
router.get('/:id?', standardPermission, asyncWrapper(async (req, res) => {
  const { query, session, params } = req
  const options = { ...query, ...params }
  const clients = await clientsController.getClients(session.user, options)
  res.json(clients)
}))
// GET CLIENTS POLICIES //
router.get('/:id/policies', standardPermission, asyncWrapper(async (req, res) => {
  const { query, session, params } = req
  const options = { ...query, ...params }
  const policies = await policiesController.getPolicies(session.user, options)
  res.json(policies)
}))


module.exports = router