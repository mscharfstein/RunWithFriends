const router = require('express').Router()
const {User, Profile} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.post('/:userId', (req, res, next) => {
  const findUserPromise = User.findById(req.params.userId)
  const createProfPromise = Profile.create(req.body)

  return Promise.all([findUserPromise, createProfPromise])
    .then(promises => {
      const user = promises[0]
      const profile = promises[1]
      return user.setProfile(profile)
        .then(user => {
          return User.findById(user.id)
          .then(updatedUser => {
            res.json(updatedUser)
          })
        })
    })
    .catch(next)
})
