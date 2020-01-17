if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('MongoDB connected successfully!');

    app.use(cors());
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
