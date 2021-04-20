
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } =  require('express-validator')

exports.signup = (req, res) => {
    

    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({
                message: "User already registerd"
            });


            const {
                firstName,
                lastName,
                email,
                password
            } = req.body

            const _user = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                username: Math.random().toString()
            });


            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: "something went wrong"
                    })
                }

                if (data) {
                    return res.status(201).json({
                        user: data,
                        message: "create user successfully <3"
                    })
                }
            })
        })
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) {
                return res.status(400).json({
                    message: "something went wrong"
                })
            }

            if (user) {
                if (user.authenticate(req.body.password)) {
                    const {_id, firstName, lastName, email, role, fullName } = user;

                    const userInfo = {
                        _id,
                        firstName,
                        lastName, 
                        email, 
                        role, 
                        fullName
                    }
                    
                    const token = jwt.sign({_id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2 days' })
       
                    res.status(200).json({
                        token,
                        user: {
                            firstName, lastName, email, role, fullName
                        }
                    })
                }
                else return res.status(400).json({
                    message: "invalid password"
                })
            }
            else return res.status(400).json({
                message: "invalid email"
            })
        })
}

