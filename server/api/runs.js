const router = require('express').Router()
const { Profile, Run, RequestedRun } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Run.create({
    dist: +req.body.dist,
    speed: req.body.speed,
    date: new Date(req.body.date),
    time: req.body.time,
    status: "Upcoming",
    profileId: req.body.profileId,
    partnerId: req.body.requestedPartnerId
  })
    .then(run => res.json(run))
    .catch(next)
})

router.get('/history/:profileId', (req, res, next) => {
  Run.findAll({
    where: {
      $or: [{profileId: req.params.profileId},{partnerId: req.params.profileId}],
      status: "Completed"
    }
  })
    .then(runs => res.json(runs))
    .catch(next)
})
