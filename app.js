if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT
const routes = require('./routes')
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use('/', routes)

app.listen(port, () => {
    console.log(`listening on ${port}`)
})