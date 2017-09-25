const Sequelize = require('sequelize')
const db = require('../db')

const RunUserDetails = db.define('runUserDetails', {
  rating: {
    type: Sequelize.STRING
  }
})

module.exports = RunUserDetails
