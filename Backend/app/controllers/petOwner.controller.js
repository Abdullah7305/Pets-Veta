const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const requireFields = require('../utils/validateRequest');
const petOwnerServices = require('../services/petOwner.services');
const sendResponse = require('../utils/SendResponse');
const authServices = require('../services/auth.services');
const { PatientAppointmentType } = require('@prisma/client')

const registerPet = catchAsync(async (req, res) => {
    requireFields(["petOwnerId", "name", "age", "breed", "category"], req.body);
    const { petOwnerId, name, age, breed, category } = req.body;

    const pet = {
        petOwnerId: petOwnerId,
        name: name,
        age: parseFloat(age),
        category: category,
        breed: breed
    }
    const newPet = await petOwnerServices.saveUserPet(pet);
    if (!newPet) {
        return sendResponse(res, 400, "Failed to create Pet", newPet);
    }
    return sendResponse(res, 200, "Successfuly created Pet", newPet);
});

const registerPetIssue = catchAsync(async (req, res) => {
    requireFields(["petOwnerId", "petId", "issue", "appointmentType"], req.body);
    const { petOwnerId, petId, issue, appointmentType } = req.body;

    let appointment = String(appointmentType || '').toLowerCase() === 'emergency' ? PatientAppointmentType.EMERGENCY : PatientAppointmentType.NORMAL_CHECKUP;

    const petIssue = {
        petOwnerId: petOwnerId,
        petId: petId,
        issue: issue,
        appointmentType: appointment
    }

    const savePetIssue = await petOwnerServices.registerPetIssue(petIssue);
    if (!savePetIssue) {
        return sendResponse(res, 400, "Failed to Submit Issue Try Again", savePetIssue);
    }
    return sendResponse(res, 201, "Successfully Submitted ", savePetIssue);

});



const getPetOwnerById = catchAsync(async (req, res) => {
    const { id } = req.user;
    const getPetOwner = await authServices.getUserById(id);

    if (!getPetOwner) {
        return sendResponse(res, 400, "Invalid User", {});
    }
    const user = {
        username: getPetOwner.username,
        email: getPetOwner.email,
        address: getPetOwner.phone || "",
        role: 'PetOwner'
    }

    return sendResponse(res, 200, "Successfully Send User", user);
})

const getPetsData = catchAsync(async (req, res) => {
    const { id } = req.user;

    const petsData = await petOwnerServices.getUserPets(id);

    if (!petsData) {
        return sendResponse(res, 400, "Not Pets Data Found", petsData)
    }

    return sendResponse(res, 200, "Successfully Send Data", petsData);

})


module.exports = {
    registerPetIssue,
    getPetOwnerById,
    registerPet,
    getPetsData
}