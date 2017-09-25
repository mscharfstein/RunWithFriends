const router = require('express').Router()
const {City} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  City.findAll()
    .then(cities => res.json(cities))
    .catch(next)
})

router.put('/neighborhoods', (req, res, next) => {
  City.findOne({
    where: {
      name: req.body.cityName
    }
  })
    .then(city => {
      city.getNeighborhoods()
      .then(neighborhoods => res.json(neighborhoods))
    })
    .catch(next)
})
