const Controller = require('../controllers/controller')
const router = require('express').Router()

router.get('/', Controller.posts)
router.get('/:id/story', Controller.storyForm)
router.post('/:id/story', Controller.postStory)

module.exports = router