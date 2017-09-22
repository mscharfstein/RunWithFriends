/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
  }) // end describe('/api/users')

  describe('/api/users/:userId', () => {

    beforeEach(() => {
      return User.create({
        id: 10,
        email: codysEmail
      })
    })

    it('POST api/users/:userId', () => {
      return request(app)
        .post('/api/users/:userId', {
          firstName: 'Michelle',
          lastName: 'Scharfstein',
          city: 'New York City',
          prefNeighborhoods: ['Williamsburg'],
          prefDistance: '3',
          prefSpeed: '9-10',
          prefWeekdayTime: 'Morning',
          prefWeekendTime: 'Afternoon'
        })
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.prefNeighborhoods = ['Williamsburg'])
        })
    })

  })
}) // end describe('User routes')
