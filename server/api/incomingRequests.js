const router = require('express').Router()
const { Profile, Run, RequestedRun } = require('../db/models')
module.exports = router

router.get('/:profileId', (req, res, next) => {
  console.log('requestedPartnerId', req.params.profileId)
  RequestedRun.findAll({
    where: {
      requestedPartnerId: req.params.profileId
    }
  })
    .then(runs => {
      console.log('runs', runs)
      res.json(runs)
    })
    .catch(next)
})
