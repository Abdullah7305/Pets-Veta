const express = require('express');
const Router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../config/multer.config');

Router
    .route('/me')
    .get(authMiddleware.protect, authController.verifyUser)

Router
    .route('/google/url')
    .get(authController.getGoogleUrlController)

Router
    .route('/google/callback')
    .get(authController.handleGoogleCallbackController)

Router
    .route('/register/doctor')
    .post(upload.single('document'), authController.createDoctorAccount)

Router
    .route('/register/pet-owner')
    .post(authController.createPetOwnerAccount)

Router
    .route('/register/admin')
    .post(authController.createAdminAccount)

Router
    .route('/login/admin')
    .post(authController.adminLogin)

Router
    .route('/login/user')
    .post(authController.loginUserAccount)

Router
    .route('/logout/user')
    .post(authMiddleware.protect, authController.logoutUser)

Router
    .route('/refresh/token')
    .get(authMiddleware.protectRefresh, authController.refreshTokenController)

Router
    .route('/verify/email')
    .post(authController.verifyUserEmail)

Router
    .route('/resend/otp')
    .get(authMiddleware.protectOtp, authController.resendUserOtp)

Router
    .route('/otp-verification')
    .post(authMiddleware.protectOtp, authController.verifyOtp)

Router
    .route('/password-resets')
    .post(authMiddleware.protectOtp, authController.resetUserPassword)







module.exports = Router;