const apiService = require('../services/apiService')
const { ADMIN } = require('../constants/roles')

const getClients = async (user = {}, options) => {
  const { token, clientId, role } = user
  const response = await apiService.getClients(token)
  let clients = response.data
  clients = clients.slice(0, options.limit || 10)
  if (role !== ADMIN) {
    console.log(clients,clientId)
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