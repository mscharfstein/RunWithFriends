const Sequelize = require('sequelize')
const db = require('../db')

const Profile = db.define('profile', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
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
  prefWeekdayTime: {
    type: Sequelize.STRING
  },
  prefWeekendTime: {
    type: Sequelize.STRING
  },
  prefAge: {
    type: Sequelize.INTEGER
  },
  prefGender: {
    type: Sequelize.STRING
  }
})

module.exports = Profile
