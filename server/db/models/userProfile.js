const Sequelize = require('sequelize')
const db = require('../db')

const UserProfile = db.define('userProfile', {
  name: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  },
  profilePic: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  prefNeighborhoods: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  prefDist: {
    type: Sequelize.FLOAT
  },
  prefSpeed: {
    type: Sequelize.FLOAT
  },
  prefAge: {
    type: Sequelize.INTEGER
  },
  prefGender: {
    type: Sequelize.STRING
  }
})

module.exports = UserProfile
