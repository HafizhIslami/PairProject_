const router = require('express').Router()
const user = require('./user')
const post = require('./post')
const Controller = require('../controllers/controller')

router.get('/', Controller.home)
router.get('/user', user)
router.get('/post', post)

module.exports = router