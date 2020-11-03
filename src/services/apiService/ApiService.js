
const HTTPError = require('../../utils/HTTPError')
const logger = require('../../utils/logger')
const mergeClientPolicies = require('../../utils/helpers').mergeClientPolicies
const { CLIENTS, POLICIES } = require('../../constants/endpoints')

class ApiService {
  constructor(memoryClient, http, baseUrl) {
    this.memoryClient = memoryClient
    this.http = http
    this.baseUrl = baseUrl
  }

  async get(endpoint, token) {
    const url = `${this.baseUrl}/${endpoint}`
    const cacheKey = endpoint
    let storedData = await this.memoryClient.getAsync(cacheKey)

    if (storedData) {
      storedData = JSON.parse(storedData)
    }

    let headers = {}
    if (token) {
      headers.Authorization = 'Bearer ' + token
    }

    if (storedData && storedData.etag) {
      headers['If-None-Match'] = storedData.etag
    }

    // MAKE REQUEST
    const response = await this.http(url, {
      headers
    })

    if (response.status === 304) {
      logger.info('304: from cache!')
      return { data: storedData.data, status: 304 }
    }

    if (!response.ok) {
      return this.throwError(response)
    }

    const data = await response.json()

    const etag = response.headers.get('Etag')
    if (etag) {
      this.memoryClient.setAsync(cacheKey, JSON.stringify({ data, etag }))
    }
    return { data, status: response.status }
  }

  async getClients(token) {
    const clients = await this.get(CLIENTS, token)
    const policies = await this.get(POLICIES, token)
    const cacheKey = `${CLIENTS}-${POLICIES}`
    let storedData = await this.memoryClient.getAsync(cacheKey)

    const notModified = policies.status === 304 && clients.status === 304

    if (notModified && storedData) {
      storedData = JSON.parse(storedData)
      return { data: storedData.data }
    }

    const combinedData = mergeClientPolicies(clients.data, policies.data)
    this.memoryClient.setAsync(cacheKey, JSON.stringify({ data: combinedData }))

    return { data: combinedData }
  }

  async post(endpoint, body) {
    const url = `${this.baseUrl}/${endpoint}`
    const response = await this.http(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      return this.throwError(response)
    }
    const data = await response.json()

    return { data }
  }

  async throwError(response) {
    const status = response.status
    let message = response.statusText
    if (response.body) {
      const body = await response.json()
      message = body.message
    }
    throw new HTTPError(status, message)
  }
}


module.exports = ApiService