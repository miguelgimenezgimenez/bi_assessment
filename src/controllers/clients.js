const apiService = require("../services/api")

const getClients = async (token, query) => {
  const endpoint = "api/clients"
  const clients = await apiService.get(endpoint, token, query)
  return clients
}

module.exports = {
  getClients
}