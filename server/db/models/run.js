const Sequelize = require('sequelize')
const db = require('../db')

const Run = db.define('run', {
  dist: {
    type: Sequelize.FLOAT
  },
  time: {
    type: Sequelize.FLOAT
  },
  speed: {
    type: Sequelize.VIRTUAL,
    get() {
      return (this.dist / this.time)
    }
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
