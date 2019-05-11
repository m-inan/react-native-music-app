import express from 'express'


const app = express()

app.get('/', (req, res) => {

  res.send('hey')
})


app.listen(3000)