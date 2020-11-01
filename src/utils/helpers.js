
function sortBy(array, key) {
  return [...array].sort((a, b) => {
    if (a[key] > b[key]) {
      return 1
    }
    if (a[key] < b[key]) {
      return -1
    }
    return 0
  })
}

function mergeClientPolicies(clients, policies) {
  const sortedClients = sortBy(clients, 'id')
  const sortedPolicies = sortBy(policies, 'clientId')
  let clientIndex = 0
  let policiesIndex = 0
  let combinedData = []
  while (clientIndex < sortedClients.length && policiesIndex < sortedPolicies.length) {
    let client = { ...sortedClients[clientIndex], policies: [] }
    while (sortedClients[clientIndex].id !== sortedPolicies[policiesIndex].clientId) {
      combinedData.push(client)
      clientIndex++
    }
    client = { ...sortedClients[clientIndex], policies: [] }
    while (policiesIndex < sortedPolicies.length && client.id === sortedPolicies[policiesIndex].clientId) {
      const { id, amountInsured, inceptionDate } = sortedPolicies[policiesIndex]
      const policy = { id, amountInsured, inceptionDate }
      client.policies.push(policy)
      policiesIndex++
    }
    combinedData.push(client)
    clientIndex++

    if (policiesIndex >= sortedPolicies.length) {
      const remainingClients = sortedClients.slice(clientIndex).map(client => ({ ...client, policies: [] }))
      return [...combinedData, ...remainingClients]
    }
  }
  return combinedData
}


module.exports = { mergeClientPolicies, sortBy }