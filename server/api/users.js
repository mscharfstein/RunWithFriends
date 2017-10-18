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
  User.findById(req.params.userId)
  .then(user => {
    if (user.profileId) {
      Profile.update(
        req.body,
        {where: {id: user.profileId}}
      )
      .then(profile => {
        User.findById(user.id)
        .then(user => res.json(user))
      })
      .catch(next)
    }

    else {
       Profile.create(req.body)
        .then(profile => {
            user.setProfile(profile)
            .then(user => {
              return User.findById(user.id)
              .then(updatedUser => {
                res.json(updatedUser)
            })
          })
        })
    }
  })
  .catch(next)

})
