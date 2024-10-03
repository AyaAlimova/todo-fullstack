import express from "express"

const app = express()

const PORT = 8080

app.get('/test', (req, res) => {
  res.json('Hello (from Server)!')
})

app.listen(PORT, () => {
  console.log('Listening on port :' + PORT)
})