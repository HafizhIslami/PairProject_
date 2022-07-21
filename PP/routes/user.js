const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/:id/profile', Controller.profile)
router.get('/:id/profile/edit', Controller.editProfileForm)
router.post('/:id/profile/edit', Controller.profileEdited)


module.exports = router