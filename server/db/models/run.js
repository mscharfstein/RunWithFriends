const Sequelize = require('sequelize')
const db = require('../db')

const Run = db.define('run', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dist: {
    type: Sequelize.FLOAT
  },
  speed: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  comments: {
    type: Sequelize.TEXT
  }
})

module.exports = Run
