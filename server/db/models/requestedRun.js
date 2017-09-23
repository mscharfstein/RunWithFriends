const Sequelize = require('sequelize')
const db = require('../db')

const RequestedRun = db.define('requestedRun', {
  dist: {
    type: Sequelize.FLOAT
  },
  speed: {
    type: Sequelize.STRING
  },
  requestedPartnerId: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.STRING
  }
})

module.exports = RequestedRun
