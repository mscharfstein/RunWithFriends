const router = require('express').Router()
const { Profile, Run, RequestedRun } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  console.log('in the route')
  const time = getTime(req.body.prefDist, req.body.prefSpeed);
  Run.create({
    dist: +req.body.prefDist,
    time: time,
    status: "Requested",
    profileId: req.body.profileId
  })
    .then(run => res.json(run))
    .catch(next)
})

router.put('/', (req, res, next) => {
    Run.update(
      {parterId: req.partnerId},
      {where: {
        profileId: req.profileId,
        status: "Requested"
      }}
    )
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
