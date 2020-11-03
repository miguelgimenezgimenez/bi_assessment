const fetchMock = require('fetch-mock').sandbox()
const { API_URL } = require('../../config')
const { CLIENTS, POLICIES, LOGIN } = require('../../constants/endpoints')
const { adminToken, clients, policies } = require('../mocks/mockData')


fetchMock.post(`${API_URL}/${LOGIN}`, { token: adminToken, type: 'Bearer' })

fetchMock.get(`${API_URL}/${CLIENTS}`, (url, opts) => opts.headers.Authorization ? clients : 401,
)
// fetchMock.get(`${API_URL}/${CLIENTS}`, clients, {
//   headers: {
//     Authorization: 'Bearer ' + adminToken
//   }
// })
fetchMock.get(`${API_URL}/${POLICIES}`, policies)

module.exports = fetchMock