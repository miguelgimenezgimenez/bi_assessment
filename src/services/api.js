const fetch = require('node-fetch');
const redisClient = require('../redis-client');
const { API_URL } = require('../config');

const apiService = {
  get: async (endpoint, token) => {
    const url = `${API_URL}/${endpoint}`
    
    const cacheKey = endpoint
    let storedData = await redisClient.getAsync(cacheKey)
    if (storedData) {
      storedData = JSON.parse(storedData)
    }

    let headers = {};
    
    if (token) {
      headers.Authorization = 'Bearer ' + token
    }

    if (storedData && storedData.etag) {
      headers['If-None-Match'] = storedData.etag;
    }

    const response = await fetch(url, {
      headers
    })

    if (response.status === 304) {
      console.info('from cache');
      return storedData.data;
    }
    const data = await response.json()
    const etag = response.headers.get('Etag')
    if (etag) {
      redisClient.setAsync(endpoint, JSON.stringify({ data, etag }));
    }
    return data;
  }

}


module.exports = apiService