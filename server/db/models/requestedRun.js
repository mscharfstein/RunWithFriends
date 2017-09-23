const Sequelize = require('sequelize')
const db = require('../db')
const Profile = require('./Profile')

const RequestedRun = db.define('requestedRun', {
  dist: {
    type: Sequelize.FLOAT
  },
  speed: {
    type: Sequelize.STRING
  },
  neighborhood: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  },
  time: {
    type: Sequelize.STRING
  },
  requestedPartnerId: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.STRING
  }
},{
  defaultScope: {
    include: [{model: Profile}]
  }
})

module.exports = RequestedRun
