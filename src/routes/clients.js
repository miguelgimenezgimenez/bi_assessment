const router = require('express').Router()
const asyncWrapper = require('../utils/asyncWrapper')
const clientsController = require('../controllers/clients.js')
const policiesController = require('../controllers/policies.js')
const { paginate } = require('../utils/helpers')

// GET CLIENTS //
router.get('/:id?', asyncWrapper(async (req, res) => {
  const { query, session, params } = req
  const options = { ...query, ...params }
  const clients = await clientsController.getClients(session.user, options)
  res.json(paginate(clients, options.page, options.limit))
}))
// GET CLIENTS POLICIES //
router.get('/:id/policies', asyncWrapper(async (req, res) => {
  const { query, session, params } = req
  const options = { ...query, ...params }
  const policies = await policiesController.getPolicies(session.user, { ...options, policies: true })
  res.json(paginate(policies, options.page, options.limit))
}))


module.exports = router