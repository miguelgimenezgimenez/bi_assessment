const express = require('express')
const router = express.Router()

router.use('/login', require('./auth'))
router.use('/clients', require('./clients'))
router.use('/policies', require('./policies'))

module.exports = router
 