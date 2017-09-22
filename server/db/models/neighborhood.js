const Sequelize = require('sequelize')
const db = require('../db')

const Neighborhood = db.define('neighborhood', {
  name: {
    type: Sequelize.TEXT
  }
})

module.exports = Neighborhood
