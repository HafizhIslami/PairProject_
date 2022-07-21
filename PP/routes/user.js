const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/profile', Controller.profile)
router.get('/profile/edit', Controller.editProfileForm)
router.post('/profile/edit', Controller.profileEdited)


module.exports = router