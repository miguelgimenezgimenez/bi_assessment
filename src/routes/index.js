const express = require('express')
const router = express.Router()

router.use('/login', require('./auth'))
router.use('/clients', require('./clients'))

module.exports = router
 