<<<<<<< HEAD
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
=======
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;
>>>>>>> user register & login selesai

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('MongoDB connected successfully!');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    // routes
    app.use('/', routes);

    app.use((err, req, res, next) => {
      const { statusCode, message } = err;
      res.status(statusCode).send(message);
    });

    app.listen(port, () => {
      console.log(`Pujangga Senja listening on ${port}`);
    });
  })
  .catch(err => console.error(err));
