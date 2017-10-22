const router = require('express').Router()
const { Profile, Run, RequestedRun, RunUserDetails } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Run.create({
    dist: +req.body.dist,
    speed: req.body.speed,
    date: new Date(req.body.date),
    neighborhood: req.body.neighborhood,
    status: "Upcoming"
  })
  .then(run => {
    return RunUserDetails.create({
      profileId: req.body.profileId,
      runId: run.id
    })
    .then(runUserDetails => {
      return RunUserDetails.create({
        profileId: req.body.requestedPartnerId,
        runId: run.id
      })
    })
  })
  .then(() => res.sendStatus(201))
  .catch(next)

})

router.get('/history/:profileId', (req, res, next) => {
  Profile.findById(req.params.profileId)
  .then(profile => {
    return profile.getRuns()
  })
  .then(runs => {
    return runs.filter(run => {
      return run.status === "Completed"
    })
  })
  .then(completedRuns => res.json(completedRuns))
  .catch(next)

})

router.get('/upcoming/:profileId', (req, res, next) => {

  Profile.findById(req.params.profileId)
  .then(profile => {
    return profile.getRuns()
  })
  .then(runs => {
    return runs.filter(run => {
      return run.status === "Upcoming"
    })
  })
  .then(upcomingRuns => {
    const soonestRun = upcomingRuns.reduce((a,b) => {
      if (a.date < b.date) return a
      else return b
    })
    res.json(soonestRun)
  })
  .catch(next)

})

router.put('/upcoming/:runId', (req, res, next) => {
  Run.findById(req.params.runId)
    .then(run => {
      const currRatings = +run.numberOfRatings
      if (+run.numberOfRatings + 1 === run.profiles.length) {
        return run.update(
          {numberOfRatings: +currRatings + 1, status: "Completed"})
      }
      else {
        return run.update({numberOfRatings: +currRatings + 1})
      }
    })
    .then(() => {
      RunUserDetails.update(
        {rating: +req.body.rating},
        {where: {
          runId: req.params.runId,
          profileId: req.body.profileId
        }})
      })
      .then(() => res.sendStatus(200))
      .catch(next)
})

router.put('/upcoming/:runId/join', (req, res, next) => {
  RunUserDetails.create({
    runId: req.params.runId,
    profileId: req.body.profileId
  })
    .then(() => {
      Run.findById(req.params.runId)
      .then(run => res.json(run))
    })
    .catch(next)
})


router.get('/all/:profileId', (req, res, next) => {

  Run.findAll({
    where: {
      status: "Upcoming"
    }
  })
    .then(runs => {
      const filteredRuns = runs.filter(run => {
        let notMyRun = true;
        const myProfile = run.profiles.filter(profile => {
          return profile.id === +req.params.profileId
        })
        if (myProfile.length) notMyRun = false
        return notMyRun
      })
      res.json(filteredRuns)
    })
    .catch(next)

})

