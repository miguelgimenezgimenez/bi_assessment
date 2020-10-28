// const apiService = require("../services/api")
const axios = require('axios')
const jwtDecode = require('jwt-decode');
const { API_URL } = require('../config')

const login = async (username, password) => {
  const url = `${API_URL}/api/login`
  const response = await axios.post(url, { client_id: username, client_secret: password })
  const { token, type } = response.data
  const { iat, exp } = jwtDecode(response.data.token);
  return { token, type, expires_in: exp - iat }
}

module.exports = {
  login
}
