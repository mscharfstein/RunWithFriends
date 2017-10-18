const User = require('./user')
const Run = require('./run')
const Profile = require('./profile')
const Neighborhood = require('./neighborhood')
const City = require('./city')
const RequestedRun = require('./requestedRun')
const RunUserDetails = require('./runUserDetails')

// associations
// profile
User.belongsTo(Profile)

RequestedRun.belongsTo(Profile)
Run.belongsToMany(Profile, {through: {
  model: RunUserDetails
}})
Profile.belongsToMany(Run, {through: {model: RunUserDetails}})

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
  RequestedRun,
  RunUserDetails
}
