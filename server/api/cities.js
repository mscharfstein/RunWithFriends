const router = require('express').Router()
const {City} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  City.findAll()
    .then(cities => res.json(cities))
    .catch(next)
})
