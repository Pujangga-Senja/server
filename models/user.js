const mongoose = require('mongoose');
const Hash = require('../helpers/bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  audio: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
});

userSchema.pre('save', function(next) {
  // console.log(this);
  this.model('User')
    .findOne({ email: this.email })
    .then(userFound => {
      // console.log(userFound);
      if (!userFound) {
        const hash = Hash.generate(this.password);
        const avatarApi = 'https://api.adorable.io/avatars/285/';
        const avatar =
          avatarApi + this.email.split('@')[0] + '@adorable.io.png';

        this.password = hash;
        this.avatar = avatar;

        // console.log(this);
        next();
      } else {
        next({
          statusCode: 400,
          message: 'Email is already registered!'
        });
      }
    })
    .catch(err => next(err));
});

module.exports = mongoose.model('User', userSchema);
