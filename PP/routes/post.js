const Controller = require('../controllers/controller')
const router = require('express').Router()

router.get('/', Controller.posts)
router.get('/story', Controller.storyForm)
router.post('/story', Controller.postStory)

module.exports = router