const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../../controller/admin/auth')
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const { requireSignin } = require('../../middlewares')
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signout', requireSignin, signout)

module.exports = (router);

