const apiService = require("../services/api")

const getClients = async (token) => {
  const endpoint = "api/clients"
  const clients = await apiService.get(endpoint, token)
  return clients
}

module.exports = {
  getClients
}