const express = require('express');
const Router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

Router
    .route('/auth/register/doctor')
    .post(authController.createDoctorAccount)

Router
    .route('/auth/register/pet-owner')
    .post(authController.createPetOwnerAccount)

Router
    .route('/auth/user/tokens')
    .post(authController.loginUserAccount)

Router
    .route('/auth/admin/tokens')
    .post(authController)
Router
    .route('/auth/refresh/token')
    .post(authMiddleware.protectRefresh, authController.refreshTokenController)

Router
    .route('/auth/verify/email')
    .post(authController.verifyUserEmail)

Router
    .route('/auth/resend/otp')
    .post(authMiddleware.protectOtp, authController.resendUserOtp)

Router
    .route('/auth/otp-verifications')
    .post(authMiddleware.protectOtp, authController.verifyOtp)

Router
    .route('/auth/password-resets')
    .post(authController.resetUserPassword)







module.exports = Router;