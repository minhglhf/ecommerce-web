const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('first name is required'),
    check('lastName')
    .notEmpty()
    .withMessage('last name is required'),
    check('email')
    .isEmail()
    .withMessage('email is required'),
    check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min: 8})
    .withMessage('Password must at least 6 charater')
];

exports.validateSigninRequest = [
    check('email')
    .isEmail()
    .withMessage('email is required'),
    check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min: 8})
    .withMessage('Password must at least 6 charater')
];

exports.isRequestValidated = (req, res, next) => {
    const error = validationResult(req);    
    if(error.array().length > 0){
        res.status(400).json({
            error: error.array()
        })
    }
    next();
}