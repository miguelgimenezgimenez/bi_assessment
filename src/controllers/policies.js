const { POLICIES } = require('../constants/endpoints')
const apiService = require('../services/api')

const getPolicies = async (token, options) => {
  const endpoint = POLICIES
  const response = await apiService.get(token)

}

module.exports = {
  getPolicies
}