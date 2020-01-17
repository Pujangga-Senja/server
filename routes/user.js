const express = require('express');
const { UserController } = require('../controllers');

const router = express.Router();

// login
router.post('/login', UserController.login);

// register
router.post('/register', UserController.register);

module.exports = router;
