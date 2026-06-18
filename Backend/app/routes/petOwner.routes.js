const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const authenticateRole = require('../middleware/authorizeRole.middleware');
const petOwnerController = require('../controllers/petOwner.controller');
const { petOwnerLimiter } = require('../middleware/rateLimiter')
const upload = require('../config/multer.config')

const Router = express.Router();

Router
    .route('/my-pets')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('PetOwner'), petOwnerController.getPetsData)

Router
    .route('/pet-profile')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('PetOwner'), petOwnerController.getPetOwnerById);


Router
    .route("/submit/pet-data")
    .post(
        petOwnerLimiter, authMiddleware.protect, authenticateRole.authenticateUserRole("PetOwner"), upload.array('photos', 5), petOwnerController.registerPet);

Router
    .route('/submit/pet-issue')
    .post(
        petOwnerLimiter, authMiddleware.protect, authenticateRole.authenticateUserRole('PetOwner'), upload.array('image', 5), petOwnerController.registerPetIssue);
Router
    .route('/petOwner-data')
    .get(petOwnerLimiter, authMiddleware.protect, authenticateRole.authenticateUserRole('PetOwner'), petOwnerController.getPetOwnerById)

Router
    .route('/pets-data')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('PetOwner'), petOwnerController.getPetsData)
module.exports = Router;