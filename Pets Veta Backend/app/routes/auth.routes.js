const express = require('express');
const Router = express.Router();
const authController = require('../controllers/auth.controller');

Router
    .route('/auth/register/doctor')
    .post(authController.createDoctorAccount)

Router
    .route('/auth/register/pet-owner')
    .post(authController.createDoctorAccount)

Router
    .route('/auth/user/tokens')
    .post(authController.loginUserAccount)

// Router
//     .route('/auth/otp-verifications')

// Router
//     .route('/auth/password-resets')





module.exports = Router;