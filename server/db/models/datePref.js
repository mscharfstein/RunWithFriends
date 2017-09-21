const Sequelize = require('sequelize')
const db = require('../db')

const DatePref = db.define('datePref', {
  weekDay: {
    type: Sequelize.STRING,
    allowNull: false
  },
  time: {
    type: Sequelize.STRING
  }
})

module.exports = DatePref
