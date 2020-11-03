const app = require('../../app')
const supertest = require('supertest')

const { adminToken, combinedData } = require('../mocks/mockData')
const credentials = {
  'username': 'test', 'password': 'testpass'
}

describe('login', () => {
  it('returns 400 if no credentials provided', async () => {
    const res = await supertest(app).post('/api/v1/login')
    expect(res.status).toBe(400)
  })
  it('Returns token, type and expires_in', async () => {
    const res = await supertest(app).post('/api/v1/login').send(credentials)
    const expectedResponse = {
      token: adminToken,
      type: 'Bearer',
      expires_in: 600,
    }
    expect(res.body).toEqual(expectedResponse)
  })
})

describe('getClients', () => {
  it('returns 401 if user is not logged in', async () => {
    const res = await supertest(app).get('/api/v1/clients')
    expect(res.status).toBe(401)
  })
  it('Returns 200 after successfull login', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post('/api/v1/login').send(credentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get('/api/v1/clients')
    expect(res.status).toBe(200)

  })
  it('Returns expected data', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post('/api/v1/login').send(credentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get('/api/v1/clients')
    expect(res.body).toEqual(combinedData)
  })
})