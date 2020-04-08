const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const authRouter = require('./routes/auth');
require('dotenv').config()
const port = 3001

app.use('/auth', authRouter)


app.listen(port,
  () => console.log(`Kaizen API listening at http://localhost:${port}`))
