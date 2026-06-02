const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const authenticateRole = require('../middleware/authorizeRole.middleware');
const petOwnerController = require('../controllers/petOwner.controller');

const Router = express.Router();



Router
    .route('/submit/pet-data')
    .post(authMiddleware.protect, authenticateRole.authenticateUserRole('PetOwner'), petOwnerController.registerPet)

Router
    .route('/submit/pet-issue')
    .post(authMiddleware.protect, authenticateRole.authenticateUserRole('PetOwner'), petOwnerController.registerPetIssue)

Router
    .route('/petOwner-data')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('PetOwner'), petOwnerController.getPetOwnerById)

Router
    .route('/pets-data')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('PetOwner'), petOwnerController.getPetsData)
module.exports = Router;