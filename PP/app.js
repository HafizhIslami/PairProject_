const express = require('express');
const app = express()
const router = require('./routes')
const port = 3000

app.set('view engine')
app.use(express.urlencoded({extended : true}))
app.use('/', router)

app.use(express.static(__dirname + '/public'))

app.listen(port)