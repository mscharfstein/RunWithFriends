const router = require('express').Router()
const { Profile, Run, RequestedRun } = require('../db/models')
module.exports = router

router.get('/:profileId', (req, res, next) => {
  console.log('in incoming request route')
  RequestedRun.findAll({
    where: {
      requestedPartnerId: req.params.profileId
    }
  })
    .then(runs => res.json(runs))
    .catch(next)
})
