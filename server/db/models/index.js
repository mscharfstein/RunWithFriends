const User = require('./user')
const Run = require('./run')
const Profile = require('./profile')
const Neighborhood = require('./neighborhood')
const City = require('./city')
const RequestedRun = require('./requestedRun')

// associations
// profile
User.belongsTo(Profile)
//Profile.belongsTo(User)

// runs
Profile.belongsToMany(Profile,{as: 'partner', through: {
  model: Run,
  unique: false
}})
RequestedRun.belongsTo(Profile)

// cities
City.belongsToMany(Neighborhood, {through: 'city_neighborhoods'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Profile,
  Run,
  City,
  Neighborhood,
  RequestedRun
}
