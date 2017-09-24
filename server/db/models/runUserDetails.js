const Sequelize = require('sequelize')
const db = require('../db')

const RunUserDetails = db.define('runUserDetails', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = RunUserDetails
