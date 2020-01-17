require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT
const routes = require('./routes')

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
    .then(() => {
        console.log('Connected')
    })
    .catch(err => {
        console.log(err)
    })


const Image = require('./routes/image')
app.use('/image', Image)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use('/', routes)

app.listen(port, () => {
    console.log(`listening on ${port}`)
})