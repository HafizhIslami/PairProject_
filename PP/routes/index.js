const router = require('express').Router()
const user = require('./user')
const post = require('./post')
const Controller = require('../controllers/controller')
const isLogin = require('../middlewares/auth');

router.get('/', Controller.home)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.login)
router.get('/createaccount', Controller.createAccountForm)
router.post('/createaccount', Controller.createAccount)

router.use(isLogin)

router.use('/user', user)
router.use('/posts', post)

module.exports = router