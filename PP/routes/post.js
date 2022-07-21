const Controller = require('../controllers/controller')

const post = require('express').Router()

post.get('/allvisitor', Controller.allVisitor)
post.get('/story', Controller.storyForm)
post.post('/story', Controller.postStory)



module.exports = post