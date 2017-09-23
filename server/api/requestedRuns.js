const router = require('express').Router()
const { Profile, Run, RequestedRun } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  console.log('in requested run route')
  RequestedRun.create({
    dist: +req.body.prefDist,
    speed: req.body.prefSpeed,
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
