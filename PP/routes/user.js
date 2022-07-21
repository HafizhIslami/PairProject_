const Controller = require('../controllers/controller')
const user = require('express').Router()

user.get('/login', Controller.loginForm)
user.post('/login', Controller.login)
user.get('/createaccount', Controller.createAccount)
user.get('/profile', Controller.profile)
user.get('/profile/edit', Controller.editProfileForm)
user.post('/profile/edit', Controller.profileEdited)


module.exports = user