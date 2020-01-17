const { User } = require('../models');
const Hash = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  static login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      next({
        statusCode: 400,
        message: `Email and password is required!`
      });
    } else {
      User.findOne({ email })
        .then(userFound => {
          if (!userFound) {
            next({
              statusCode: 400,
              message: `User not registered!`
            });
          } else {
            const isPassMatch = Hash.verify(password, userFound.password);

            if (isPassMatch) {
              jwt.sign(
                { email: userFound.email },
                process.env.JWT_SECRET_KEY,
                (err, token) => {
                  res.status(200).json({ token });
                }
              );
            } else {
              next({
                statusCode: 404,
                message: `Email or password is not match!`
              });
            }
          }
        })
        .catch(err => {
          next({
            statusCode: 500,
            message: `Internal server error!`
          });
        });
    }
  }

  static register(req, res, next) {
    console.log(`OK`);
    const { email, password } = req.body;

    User.create({ email, password })
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  }
}

module.exports = UserController;
