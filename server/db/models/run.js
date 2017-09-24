const Sequelize = require('sequelize')
const db = require('../db')
const Profile = require('./Profile')

const Run = db.define('run', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
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
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  neighborhood: {
    type: Sequelize.STRING
  },
  comments: {
    type: Sequelize.TEXT
  }
}, {
  defaultScope: {
    include: [{model: Profile}, {model: Profile, as: 'partner'}]
  }
})

module.exports = Run
