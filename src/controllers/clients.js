const apiService = require('../services/apiService')
const { ADMIN } = require('../constants/roles')
const HTTPError = require('../utils/HTTPError')

const getClients = async (user = {}, options) => {
  const { token, clientId, role } = user
  // Here i should also check if my role is allowed to access this endpoint

  if (!token) throw new HTTPError(401, 'Please login!')

  const response = await apiService.getClients(token)
  let clients = response.data

  // temporary conditional since no user is provided in the real  token
  const isAdmin = role === ADMIN || clientId === 'dare'

  if (!isAdmin) {
    return clients.filter(client => client.id === clientId)
  }

  if (options.name) {
    clients = clients.filter(client => client.name === options.name)
  }
  if (options.id) {
    clients = clients.filter(client => client.id === options.id)
  }

  return clients
}

module.exports = {
  getClients
}