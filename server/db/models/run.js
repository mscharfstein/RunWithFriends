const Sequelize = require('sequelize')
const db = require('../db')
const Profile = require('./Profile')

const Run = db.define('run', {
  dist: {
    type: Sequelize.FLOAT
  },
  speed: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.STRING
  },
  neighborhood: {
    type: Sequelize.STRING
  },
  comments: {
    type: Sequelize.TEXT
  },
  numberOfRatings: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  defaultScope: {
    include: [{model: Profile}]
  }
})

module.exports = Run
