const router = require('express').Router()
const { Profile, Run, RequestedRun } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  const run1 = Run.create({
    dist: +req.body.dist,
    speed: req.body.speed,
    date: new Date(req.body.date),
    time: req.body.time,
    status: "Upcoming",
    profileId: req.body.profileId,
    partnerId: req.body.requestedPartnerId
  })

  const run2 = Run.create({
    dist: +req.body.dist,
    speed: req.body.speed,
    date: new Date(req.body.date),
    time: req.body.time,
    status: "Upcoming",
    profileId: req.body.requestedPartnerId,
    partnerId: req.body.profileId
  })

  Promise.all([run1, run2])
    .then(runs => {
      Run.findOne({
        where: {
          profileId: req.body.currentUserId
        }
      })
      .then(run => res.json(run))
    })
    .catch(next)
})

router.get('/history/:profileId', (req, res, next) => {
  Run.findAll({
    where: {
      profileId: req.params.profileId,
      status: "Completed"
    }
  })
    .then(runs => res.json(runs))
    .catch(next)
})

router.get('/upcoming/:profileId', (req, res, next) => {
  Run.findAll({
    where: {
      profileId: req.params.profileId,
      status: "Upcoming"
    }
  })
    .then(runs => res.json(runs))
    .catch(next)
})

router.get('/all/:profileId', (req, res, next) => {
  Run.findAll({
    where: {
      profileId: {
        $ne: req.params.profileId
      },
      partnerId: {
        $ne: req.params.profileId
      },
      status: "Upcoming"
    }
  })
    .then(runs => res.json(runs))
    .catch(next)
})

