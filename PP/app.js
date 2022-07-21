const express = require('express');
const app = express()
const router1 = require('./routes/user') 
const router2 = require('./routes/post')
const Controller = require('./controllers/controller');
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))

app.get('/', (req, res) => {
  Controller.home
})
app.use('/user', router1)
app.use('/post', router2)

app.listen(port)