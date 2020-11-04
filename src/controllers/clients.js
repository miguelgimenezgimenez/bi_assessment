const apiService = require('../services/apiService')
const { ADMIN, USER } = require('../constants/roles')
const HTTPError = require('../utils/HTTPError')
const { paginate } = require('../utils/helpers')

const getClients = async (user = {}, options) => {
  const { token, clientId, role } = user

  if (!token) throw new HTTPError(401, 'Please login!')

  const response = await apiService.getClients(token)
  let clients = response.data

  // temporary conditional since no user is provided in the real  token
  const isAdmin = role === ADMIN || clientId === 'dare'
  if (!isAdmin && (role !== USER || options.id && options.id !== clientId)) {
    throw new HTTPError(403, 'Role Doesn\'t have permissions to access this endpoint')
  }
  if (!isAdmin) {
    return clients.filter(client => client.id === clientId)
  }

  if (options.name) {
    clients = clients.filter(client => client.name === options.name)
  }
  if (options.id) {
    clients = clients.filter(client => client.id === options.id)
  }

  return paginate(clients, options.page, options.limit)
}

module.exports = {
  getClients
}