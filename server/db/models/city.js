const Sequelize = require('sequelize')
const db = require('../db')
const Neighborhood = require('./neighborhood')

const City = db.define('city', {
  name: {
    type: Sequelize.STRING
  }
},{
  defaultScope: {
    include: [{model: Neighborhood}]
  }
})

module.exports = City
