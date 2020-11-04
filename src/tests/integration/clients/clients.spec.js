const app = require('../../../app')
const supertest = require('supertest')

const { clients, combinedData, policies } = require('../../mocks/mockData')
const pick = require('lodash.pick')
const adminCredentials = {
  'username': 'admin', 'password': 'testpass'
}
const userCredentials = {
  'username': 'user', 'password': 'testpass'
}


describe('getClients', () => {
  it('returns 401 if user is not logged in', async () => {
    const res = await supertest(app).get('/api/v1/clients')
    expect(res.status).toBe(401)
  })
  it('Returns 200 after successfull login', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post('/api/v1/login').send(adminCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get('/api/v1/clients')
    expect(res.status).toBe(200)

  })
  it('Returns all data for admin', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post('/api/v1/login').send(adminCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get('/api/v1/clients')
    expect(res.body).toEqual(combinedData)
    expect(res.body.length).toBeLessThanOrEqual(10)
  })
  it('Filters clients by id', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post('/api/v1/login').send(adminCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get('/api/v1/clients/3')
    expect(res.body).toEqual([combinedData[2]])

  })
  it('Returns only clients data for current user', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post('/api/v1/login').send(userCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get('/api/v1/clients')
    expect(res.body.length).toBe(1)
    expect(res.body[0]).toEqual(combinedData[0])
  })
})



describe('get clients Policies', () => {
  it('returns 401 if user is not logged in', async () => {
    const res = await supertest(app).get('/api/v1/clients')
    expect(res.status).toBe(401)
  })
  it('Returns 200 after successfull login', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post('/api/v1/login').send(adminCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get('/api/v1/clients/3/policies')
    expect(res.status).toBe(200)

  })
  it('Returns policies for correct user when admin', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post('/api/v1/login').send(adminCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get('/api/v1/clients/3/policies')
    const expectedResults = policies.reduce((acc, next) => {
      if (next.clientId === '3') {
        acc.push(pick(next, ['id', 'amountInsured', 'email', 'inceptionDate', 'installPayment']
        ))
      }
      return acc
    }, [])
    expect(res.body).toEqual(expectedResults)
    expect(res.body.length).toBeLessThanOrEqual(10)
  })

  it('Forbids non admins to access others data ', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post('/api/v1/login').send(userCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get('/api/v1/clients/2/policies')
    expect(res.status).toBe(403)
  })
})