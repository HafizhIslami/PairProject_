const router1 = require('express').Router()
const Controller = require('../controllers/controller')


router1.get('/login', Controller.loginForm)
router1.post('/login', Controller.login)
router1.get('/createaccount', Controller.createAccountForm)
router1.post('/createaccount', Controller.createAccount)
router1.get('/profile', Controller.profile)
router1.get('/profile/edit', Controller.editProfileForm)
router1.post('/profile/edit', Controller.profileEdited)


module.exports = router1