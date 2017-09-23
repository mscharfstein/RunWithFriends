const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/buddies', require('./buddies'))
router.use('/cities', require('./cities'))
router.use('/runs', require('./runs'))
router.use('/requestedRuns', require('./requestedRuns'))
router.use('/incomingRequests', require('./incomingRequests'))
router.use('/text', require('./text'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
