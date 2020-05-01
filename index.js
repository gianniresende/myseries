const express = require('express')
const app = express()

const port = 3000

const series = [
  { name: "friends"},
  { name: "Breaking Bad"}
]

app.get('/series', (req, res) => res.send(series))

app.listen(port, ()=> console.log('Listen server'))
