const Controller = require('../controllers/controller')
const router = require('express').Router()

router.get('/:id/profile', Controller.profile)
router.get('/:id/profile/edit', Controller.editProfileForm)
router.post('/:id/profile/edit', Controller.profileEdited)


module.exports = router