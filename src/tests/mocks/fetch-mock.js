const fetchMock = require('fetch-mock').sandbox()
const { API_URL } = require('../../config')
const { CLIENTS, POLICIES, LOGIN } = require('../../constants/endpoints')
const { ADMIN } = require('../../constants/roles')
const { adminToken, clients, policies, userToken } = require('../mocks/mockData')


fetchMock.post(`${API_URL}/${LOGIN}`, (url, opts) => {
  const body = JSON.parse(opts.body)
  if (body.client_id === ADMIN) {
    return { token: adminToken, type: 'Bearer' }
  }
  return { token: userToken, type: 'Bearer' }
})

fetchMock.get(`${API_URL}/${CLIENTS}`, (url, opts) => opts.headers.Authorization ? clients : 401)

fetchMock.get(`${API_URL}/${POLICIES}`, (url, opts) => opts.headers.Authorization ? policies : 401,)

module.exports = fetchMock