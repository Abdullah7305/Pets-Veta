const express = require('express');
const Router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../config/multer.config');

Router
    .route('/auth/register/doctor')
    .post(upload.single('document'), authController.createDoctorAccount)

Router
    .route('/auth/register/pet-owner')
    .post(authController.createPetOwnerAccount)

Router
    .route('/auth/login/user')
    .post(authController.loginUserAccount)

Router
    .route('/auth/refresh/token')
    .post(authMiddleware.protectRefresh, authController.refreshTokenController)

Router
    .route('/auth/verify/email')
    .post(authController.verifyUserEmail)

Router
    .route('/auth/resend/otp')
    .get(authMiddleware.protectOtp, authController.resendUserOtp)

Router
    .route('/auth/otp-verification')
    .post(authMiddleware.protectOtp, authController.verifyOtp)

Router
    .route('/auth/password-resets')
    .post(authMiddleware.protectOtp, authController.resetUserPassword)







module.exports = Router;