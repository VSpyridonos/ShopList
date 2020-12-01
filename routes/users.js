const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utilities/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.route('/account')
    .get(users.showAccount)
    .post(users.changeAddress)

router.get('/logout', users.logout);


module.exports = router;