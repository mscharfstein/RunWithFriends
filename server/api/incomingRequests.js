const router = require('express').Router()
const { Profile, Run, RequestedRun } = require('../db/models')
module.exports = router

router.get('/:profileId', (req, res, next) => {
  RequestedRun.findAll({
    where: {
      requestedPartnerId: req.params.profileId
    },
    order: [
      ['date', 'ASC']
    ]
  })
    .then(runs => res.json(runs))
    .catch(next)
})
