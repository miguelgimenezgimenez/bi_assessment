const { POLICIES } = require('../constants/endpoints')
const apiService = require('../services/apiService')
const { ADMIN, USER } = require('../constants/roles')
const HTTPError = require('../utils/HTTPError')
const pick = require('lodash.pick')
const { paginate } = require('../utils/helpers')

const getPolicies = async (user = {}, options) => {
  const { token, clientId, role } = user
  // Here i should also check if my role is allowed to access this endpoint

  if (!token) throw new HTTPError(401, 'Please login!')
  // temporary client dare conditional since no user is provided in the real token
  const isAdmin = role === ADMIN || clientId === 'dare'
  // if user is not admin and role doesnt have permissions or user is trying to access other users policies forbid
  if (!isAdmin && (role !== USER || options.id && options.id !== clientId)) {
    throw new HTTPError(403, 'Role Doesn\'t have permissions to access this endpoint')
  }

  const response = await apiService.get(POLICIES, token)
  let policies = response.data

  const policyFields = ['id', 'amountInsured', 'email', 'inceptionDate', 'installPayment']

  policies = policies.reduce((acc, next) => {
    // if user is not admin he can only see his own policies
    const shouldPush = (isAdmin && !options.id) || (isAdmin && options.id === next.clientId) || clientId === next.clientId
    if (shouldPush) {
      acc.push(pick(next, policyFields))
    }
    return acc
  }, [])

  return paginate(policies, options.page, options.limit)
}

module.exports = {
  getPolicies
}