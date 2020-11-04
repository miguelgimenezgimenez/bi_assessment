const HTTPError = require('../utils/HTTPError')
const { ADMIN, USER } = require('../constants/roles')

function standardPermission(req, res, next) {
  const { session, params } = req
  const user = session.user || {}
  const { token, clientId, role } = user

  if (!token) throw new HTTPError(401, 'Please login!')

  // temporary client dare conditional since no user is provided in the real token
  const isAdmin = role === ADMIN || clientId === 'dare'
  // if user is not admin and role doesnt have permissions or user is trying to access other users policies then forbid
  if (!isAdmin && (role !== USER || params.id && params.id !== clientId)) {
    throw new HTTPError(403, 'Role Doesn\'t have permissions to access this endpoint')
  }
  next()

}
module.exports = { standardPermission }