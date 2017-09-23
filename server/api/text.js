const router = require('express').Router()
const sendText = require('../sendText')
module.exports = router

router.post('/', (req, res, next) => {
  sendText(req.body.number, req.body.content)
  res.json('text sent')
})
