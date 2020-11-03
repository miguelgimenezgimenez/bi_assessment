const { clients, policies, combinedData } = require('../mocks/mockData')
const mergeClientPolicies = require('../../utils/helpers').mergeClientPolicies



describe('mergeClientPolicies', () => {
  it('Returns expected result with combined data', () => {
    const results = mergeClientPolicies(clients, policies)
    expect(results).toEqual(combinedData)
  })
  it('Adds all existing policies to the clients object', () => {
    const combinedData = mergeClientPolicies(clients, policies)
    const numberOfPolicies = policies.length
    const addedPolicies = combinedData.reduce((acc, next) =>
      acc + next.policies.length, 0)
    expect(numberOfPolicies).toBe(addedPolicies)
  })
  it('Returns correct number of clients', () => {
    const combinedData = mergeClientPolicies(clients, policies)
    const numberOfClients = clients.length
    const returnedClients = combinedData.length
    expect(numberOfClients).toBe(returnedClients)
  })
})