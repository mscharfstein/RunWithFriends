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

function getTime(dist, speed) {
  const lengthOfTime = speed.split(":")
  const min = lengthOfTime[0]
  const sec = lengthOfTime[1]
  const partialMin = +sec/60
  const totalMin = +min + partialMin

  return dist / totalMin
}
