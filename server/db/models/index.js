const User = require('./user')
const Run = require('./run')
const Profile = require('./profile')
const Neighborhood = require('./neighborhood')
const City = require('./city')

// associations
// profile
User.belongsTo(Profile)

// runs
User.belongsToMany(User,{as: 'partner', through: Run})

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
  Neighborhood
}
