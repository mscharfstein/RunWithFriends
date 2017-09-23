const router = require('express').Router()
const { Profile, Run, RequestedRun } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  console.log('in requested run route', req.body)
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
  console.log('in update req run route, req.body', req.body)
    RequestedRun.update(
      {requestedPartnerId: req.body.partnerId},
      {where: {
        profileId: req.body.profileId
      }}
    )
      .then(() => {
        return RequestedRun.findOne({
          where: {
            profileId: req.body.profileId,
            requestedPartnerId: req.body.partnerId
          }
        })
      })
      .then(run => res.json(run))
      .catch(next)
  })

  router.delete('/:runId', (req, res, next) => {
    console.log('in delete req run route, req.body', req.body)
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
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[dayIndex];
  }
