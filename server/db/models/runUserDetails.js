const Sequelize = require('sequelize')
const db = require('../db')

const RunUserDetails = db.define('runUserDetails', {
  rating: {
    type: Sequelize.INTEGER
  }
})

module.exports = RunUserDetails
