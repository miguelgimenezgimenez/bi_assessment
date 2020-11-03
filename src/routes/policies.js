const router = require('express').Router()
const asyncWrapper = require('../utils/asyncWrapper')
const policiesController = require('../controllers/policies.js')


// GET POLICIES //
router.get('/:id?', asyncWrapper(async (req, res) => {
  const { query, session, params } = req
  const options = { ...query, ...params }
  const response = await policiesController.getPolicies(session.user, options)
  res.json(response)
}))
module.exports = router