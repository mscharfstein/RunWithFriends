const router = require('express').Router()
const { RequestedRun } = require('../db/models')
const sendText = require('../sendText')
module.exports = router

router.post('/', (req, res, next) => {
  RequestedRun.create({
    dist: +req.body.prefDist,
    speed: req.body.prefSpeed,
    neighborhood: req.body.prefNeighborhood,
    date: req.body.date,
    time: req.body.time + ' ' + req.body.AMPM,
    profileId: req.body.profileId
  })
    .then(run => res.json(run))
    .catch(next)
})

router.put('/', (req, res, next) => {
    RequestedRun.update(
      {requestedPartnerId: req.body.partnerId},
      {where: {
        id: req.body.runId
      }}
    )
      .then(() => {
        return RequestedRun.findById(req.body.runId)
      })
      .then(run => {
        sendText(req.body.partnerPhone, "You have a new run request on Run With Friends! Log in to get running!")
        res.json(run)
      })
      .catch(next)
  })

  router.delete('/:runId', (req, res, next) => {
      RequestedRun.destroy(
        {where: {
          id: req.params.runId
        }}
      )
        .then(() => {
          res.status(201)
        })
        .catch(next)
    })

  function getDayOfWeek(dayIndex) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  }
