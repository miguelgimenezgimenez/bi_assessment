const pick = require('lodash.pick')
const supertest = require('supertest')

const app = require('../../../app')
const { CLIENTS, LOGIN } = require('../../../constants/endpoints')
const { POLICY_FIELDS } = require('../../../constants/fields')
const { combinedData, policies } = require('../../mocks/mockData')

const adminCredentials = {
  'username': 'admin', 'password': 'testpass'
}
const userCredentials = {
  'username': 'user', 'password': 'testpass'
}


describe('getClients', () => {
  it('returns 401 if user is not logged in', async () => {
    const res = await supertest(app).get(`/api/v1/${CLIENTS}`)
    expect(res.status).toBe(401)
  })
  it('Returns 200 after successfull login', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post(`/api/v1/${LOGIN}`).send(adminCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get(`/api/v1/${CLIENTS}`)
    expect(res.status).toBe(200)

  })
  it('Returns all data for admin', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post(`/api/v1/${LOGIN}`).send(adminCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get(`/api/v1/${CLIENTS}`)
    expect(res.body).toEqual(combinedData)
    expect(res.body.length).toBeLessThanOrEqual(10)
  })
  it('Filters clients by id', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post(`/api/v1/${LOGIN}`).send(adminCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get(`/api/v1/${CLIENTS}/3`)
    expect(res.body).toEqual([combinedData[2]])

  })
  it('Returns only clients data for current user', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post(`/api/v1/${LOGIN}`).send(userCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get(`/api/v1/${CLIENTS}`)
    expect(res.body.length).toBe(1)
    // user token clientId=3
    expect(res.body[0]).toEqual(combinedData[2])
  })
})



describe('get clients Policies', () => {
  it('returns 401 if user is not logged in', async () => {
    const res = await supertest(app).get(`/api/v1/${CLIENTS}`)
    expect(res.status).toBe(401)
  })
  it('Returns 200 after successfull login', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post(`/api/v1/${LOGIN}`).send(adminCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get(`/api/v1/${CLIENTS}/3/policies`)
    expect(res.status).toBe(200)

  })
  it('Returns policies for correct user when admin', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post(`/api/v1/${LOGIN}`).send(adminCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get(`/api/v1/${CLIENTS}/3/policies`)
    const expectedResults = policies.reduce((acc, next) => {
      if (next.clientId === '3') {
        acc.push(pick(next, POLICY_FIELDS
        ))
      }
      return acc
    }, [])
    expect(res.body).toEqual(expectedResults)
    expect(res.body.length).toBeLessThanOrEqual(10)
  })

  it('Forbids non admins to access others data ', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post(`/api/v1/${LOGIN}`).send(userCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get(`/api/v1/${CLIENTS}/2/policies`)
    expect(res.status).toBe(403)
  })
})