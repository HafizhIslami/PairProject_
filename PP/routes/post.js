const Controller = require('../controllers/controller')

const router2 = require('express').Router()

router2.get('/allvisitor', Controller.allVisitor)
router2.get('/story', Controller.storyForm)
router2.post('/story', Controller.postStory)
// router2.get('/search', Controller.search)



module.exports = router2