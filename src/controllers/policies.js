const { POLICIES } = require('../constants/endpoints')
const apiService = require('../services/apiService')
const { ADMIN } = require('../constants/roles')

const getPolicies = async (user, options) => {
  const { token, clientId, role } = user

  const response = await apiService.get(POLICIES, token)
  let policies = response.data
  // temporary conditional since no user is provided in the real  token
  const isAdmin = role === ADMIN || clientId === 'dare'

  if (!isAdmin) {
    return policies.filter(policy => policy.clientId === clientId)
  }

  if (options.id) {
    policies = policies.filter((policy) => policy.clientId === options.id)
  }

  return policies
}

module.exports = {
  getPolicies
}