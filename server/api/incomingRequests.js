const router = require('express').Router()
const { RequestedRun } = require('../db/models')
module.exports = router

router.get('/:profileId', (req, res, next) => {
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
