const express = require('express')
const app = express()
const port = 3001

app.get('/test', (req, res) => {
  console.log('ok heard it.')
  res.send('Hello World!')
})

app.listen(port,
  () => console.log(`Example app listening at http://localhost:${port}`))
