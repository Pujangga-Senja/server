const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})