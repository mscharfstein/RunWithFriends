const router = require('express').Router()
const { User, Profile } = require('../db/models')
module.exports = router

// need a lot more logic here - do this tonight
router.put('/find', (req, res, next) => {

  console.log('in find buddies route')
  let typeOfDay = 'prefWeekdayTime';
  let runDate = new Date(req.body.date)
  if (runDate.getDay() === 0 || runDate.getDay() === 6) typeOfDay = 'prefWeekendTime';

  const time = findTime(req.body.time, req.body.AMPM)
  const speedInt = findSpeedInterval(req.body.prefSpeed)
  // console.log('time', time, 'speedInt', speedInt, 'city', req.body.city, 'dist', req.body.prefDist, 'profileid', req.body.profileId)
  console.log('req.body', req.body, time, speedInt)
  Profile.findAll({
    where: {
      city: req.body.city,
      prefSpeed: speedInt,
      prefDist: {
        $between: [+req.body.prefDist - 1, +req.body.prefDist + 1]
      },
      prefNeighborhoods: {
        $overlap: [req.body.prefNeighborhood]
      },
      [typeOfDay]: {
        $overlap: [time]
      },
      id: {
        $ne: req.body.profileId
      }
    }
  })
    .then(profiles => res.json(profiles))
    .catch(next)
})

function findTime(time, timeOfDay) {
  const hour = time.split(":")[0]
  if (+hour < 7 && timeOfDay === 'AM') {
    return 'Early Morning'
  }
  if (+hour >= 7 && +hour <= 10 && timeOfDay === 'AM') {
    return 'Morning'
  }
  if ((+hour === 11 && timeOfDay === 'AM') || (+hour === 12 && timeOfDay === 'PM') || (+hour === 1 && timeOfDay === 'PM')) {
    return 'Mid-day'
  }
  if (+hour >= 2 && +hour <= 4 && timeOfDay === 'PM') {
    return 'Afternoon'
  }
  if (+hour >= 5 && +hour <= 8 && timeOfDay === 'PM') {
    return 'Evening'
  }
  if (+hour >= 9 && timeOfDay === 'PM') {
    return 'Late Night'
  }
}

function findSpeedInterval(speed) {
  let speedInterval;
  const min = speed.split(":")[0];
  if (min < 6) speedInterval = '<6'
  else if (min >= 12) speedInterval = '>12'
  else {
    speedInterval = `${min}-${+min + 1}`
  }
  return speedInterval;
}
