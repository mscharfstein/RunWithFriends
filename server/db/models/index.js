const User = require('./user')
const DatePref = require('./datePref')
const Run = require('./run')

// associations
User.belongsToMany(DatePref,{through: 'user_date_pref'})
DatePref.belongsTo(User)

User.belongsToMany(User,{as: 'partner', through: Run})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  DatePref,
  Run
}
