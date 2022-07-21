const express = require('express');
const app = express()
const router = require('./routes/index')
const port = 3000

app.set('view engine')
app.use(express.urlencoded({extended : true}))
app.use('/', router)

app.listen(port)