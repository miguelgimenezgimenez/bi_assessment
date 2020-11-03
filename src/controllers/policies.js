const { POLICIES } = require('../constants/endpoints')
const apiService = require('../services/apiService')
const { ADMIN } = require('../constants/roles')
const HTTPError = require('../utils/HTTPError')

const getPolicies = async (user = {}, options) => {
  const { token, clientId, role } = user
  if (!token) throw new HTTPError(401, 'Please login!')

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

  return policies.reduce((acc, next) => {
    const shouldAddNext = !options.id || options.id === next.clientId
    if (shouldAddNext) {
      acc.push({
        'id': next.id,
        'amountInsured': next.amountInsured,
        'email': next.email,
        'inceptionDate': next.inceptionDate,
        'installmentPayment': next.installmentPayment,
      })
      return acc
    }
  }, [])
}

module.exports = {
  getPolicies
}