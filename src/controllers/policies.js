const { CLIENTS, POLICIES } = require('../constants/endpoints')
const apiService = require('../services/apiService')
const { ADMIN, USER } = require('../constants/roles')
const HTTPError = require('../utils/HTTPError')
const pick = require('lodash.pick')
const { paginate } = require('../utils/helpers')
const { POLICY_FIELDS } = require('../constants/fields')

const getPolicies = async (user = {}, options) => {
  const { token, clientId, role } = user
  const isAdmin = role === ADMIN || clientId === 'dare'

  const response = await apiService.get(POLICIES, token)
  let policies = response.data


  policies = policies.reduce((acc, next) => {
    // if user is not admin he can only see his own policies
    const shouldPush = (isAdmin && !options.id) || (isAdmin && options.id === next.clientId) || clientId === next.clientId
    if (shouldPush) {
      acc.push(pick(next, POLICY_FIELDS))
    }
    return acc
  }, [])

  return paginate(policies, options.page, options.limit)
}

const getPolicyClient = async (user = {}, options) => {
  const { token, clientId, role } = user

  if (!token) throw new HTTPError(401, 'Please login!')
  // temporary client dare conditional since no user is provided in the real token
  const isAdmin = role === ADMIN || clientId === 'dare'
  // if user is not admin and role doesnt have permissions or user is trying to access other users policies forbid
  if (!isAdmin && (role !== USER || options.id && options.id !== clientId)) {
    throw new HTTPError(403, 'Role Doesn\'t have permissions to access this endpoint')
  }

  const policies = await apiService.get(POLICIES, token)
  const policy = policies.data.find(policy => policy.id === options.id)
  if (!policy) throw new HTTPError(404, 'Policy not found')

  const clients = await apiService.get(CLIENTS, token)

  const client = clients.data.find(client => client.id === policy.clientId)

  if (!client) throw new HTTPError(404, 'Client not found')

  return client
}

module.exports = {
  getPolicies,
  getPolicyClient
}