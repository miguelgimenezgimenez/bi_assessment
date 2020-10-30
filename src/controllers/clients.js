const apiService = require('../services/api')

const getClients = async (token, options) => {

  const response = await apiService.getClients(token)
  let clients = response.data

  if (options.limit) {
    clients = clients.slice(0, options.limit)
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