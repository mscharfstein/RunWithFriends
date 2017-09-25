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

  // const run1 = Run.create({
  //   dist: +req.body.dist,
  //   speed: req.body.speed,
  //   date: new Date(req.body.date),
  //   time: req.body.time,
  //   status: "Upcoming",
  //   profileId: req.body.profileId,
  //   partnerId: req.body.requestedPartnerId
  // })

  // const run2 = Run.create({
  //   dist: +req.body.dist,
  //   speed: req.body.speed,
  //   date: new Date(req.body.date),
  //   time: req.body.time,
  //   status: "Upcoming",
  //   profileId: req.body.requestedPartnerId,
  //   partnerId: req.body.profileId
  // })

  // Promise.all([run1, run2])
  //   .then(runs => {
  //     Run.findOne({
  //       where: {
  //         profileId: req.body.currentUserId
  //       }
  //     })
  //     .then(run => res.json(run))
  //   })
  //   .catch(next)
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

  // Run.findAll({
  //   where: {
  //     profileId: req.params.profileId,
  //     status: "Completed"
  //   }
  // })
  //   .then(runs => res.json(runs))
  //   .catch(next)
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
  .then(upcomingRuns => res.json(upcomingRuns[0]))
  .catch(next)


  // Run.findOne({
  //   where: {
  //     profileId: req.params.profileId, //find where profile includes this id -- should switch to run id?
  //     status: "Upcoming"
  //   }
  // })
  //   .then(run => res.json(run))
  //   .catch(next)
})

router.put('/upcoming/:runId', (req, res, next) => {
  Run.update(
    {status: "Completed"},
    {where: {id: req.params.runId}})
    .then(() => {
      return RunUserDetails.update(
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

  // Run.findAll({
  //   where: {
  //     profileId: {
  //       $ne: req.params.profileId
  //     },
  //     partnerId: {
  //       $ne: req.params.profileId
  //     },
  //     status: "Upcoming"
  //   }
  // })
  //   .then(runs => res.json(runs))
  //   .catch(next)
})

