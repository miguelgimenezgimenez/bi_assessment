const jwtDecode = require('jwt-decode');
const apiService = require('../services/api');
const { LOGIN } = require("../constants/endpoints")

const login = async (username, password) => {
  const endpoint = LOGIN
  const response = await apiService.post(endpoint, { client_id: username, client_secret: password })
  const { token, type } = response
  const { iat, exp } = jwtDecode(token);
  return { token, type, expires_in: exp - iat }
}

module.exports = {
  login
}
