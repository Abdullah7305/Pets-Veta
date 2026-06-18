const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const requireFields = require('../utils/validateRequest');
const petOwnerServices = require('../services/petOwner.services');
const sendResponse = require('../utils/SendResponse');
const authServices = require('../services/auth.services');
const { stripe } = require('../config/stripe');
const prisma = require('../config/prisma');
const cloudinary = require('../utils/cloudinary.utils');
const streamifier = require('streamifier');





const registerPet = catchAsync(async (req, res) => {
    const petOwnerId = req.user?.id;

    if (!petOwnerId) {
        return sendResponse(res, 401, 'Please login first', {});
    }

    requireFields(['name', 'age', 'breed', 'category'], req.body);

    const { name, age, breed, category } = req.body;
    const files = req.files || [];

    if (!files.length) {
        return sendResponse(res, 400, 'At least one pet picture is required', {});
    }

    const petOwner = await authServices.getUserById(petOwnerId);
    console.log("Pet Owner is ", petOwner);
    if (!petOwner || petOwner.userRole.role !== 'PetOwner') {
        return sendResponse(res, 403, 'Only pet owner can register pet', {});
    }

    const pet = {
        petOwnerId,
        name,
        age: parseFloat(age),
        category,
        breed,
    };

    const newPet = await petOwnerServices.saveUserPet(pet);

    if (!newPet) {
        return sendResponse(res, 400, 'Failed to create Pet', {});
    }


    const uploadPromises = files.map(file =>
        cloudinary.uploadToCloudinary(file.buffer, "pets")
    );
    console.log("Cloudinary Promises are ", uploadPromises);
    const uploadResults = await Promise.all(uploadPromises);
    console.log("Upload Results is ", uploadResults);
    const uploadedPictures = uploadResults.map(result => ({
        petId: newPet.id,
        publicUrl: result.secure_url,
        publicId: result.public_id
    }));
    console.log("Uploaded Picture data is ", uploadedPictures);

    await petOwnerServices.createPetPictures(uploadedPictures);



    return sendResponse(res, 201, 'Successfully created Pet', uploadedPictures);
});

const registerPetIssue = catchAsync(async (req, res) => {
    const petOwnerId = req.user?.id;
    requireFields(['petId', 'issue', "doctorId", "scheduleId"], req.body);
    const { petId, issue, doctorId, scheduleId } = req.body;
    const petIssue = {
        petId: petId,
        issue: issue,
        doctorId: doctorId,
        petOwnerId: petOwnerId,
        scheduleId: scheduleId
    }

    const createPetIssueReport = await petOwnerServices.registerPetIssue(petIssue);


    return sendResponse(res, 201, 'Report created successfully. Please redirect client to the checkout url.', {
        petIssue: createPetIssueReport.registerIssue,
        checkoutUrl: createPetIssueReport.checkoutUrl
    });
});

const getPetOwnerById = catchAsync(async (req, res) => {
    const { id } = req.user;
    const getPetOwner = await authServices.getUserById(id);

    if (!getPetOwner) {
        return sendResponse(res, 400, 'Invalid User', {});
    }

    const user = {
        username: getPetOwner.username,
        email: getPetOwner.email,
        address: getPetOwner.phone || '',
        role: 'PetOwner',
    };

    return sendResponse(res, 200, 'Successfully Send User', user);
});

const getPetsData = catchAsync(async (req, res) => {
    const { id } = req.user;

    const petsData = await petOwnerServices.getUserPets(id);

    if (!petsData) {
        return sendResponse(res, 400, 'Not Pets Data Found', petsData);
    }
    console.log("======>>> ", petsData)
    return sendResponse(res, 200, 'Successfully Send Data', petsData);
});

const lockDoctorSlot = catchAsync(async (req, res) => {
    const { userId } = req.user;
    requireFields(["doctorId", "slotId"], req.body);
    const { doctorId, slotId } = req.body;
    const bookSlot = await petOwnerServices.lockUserSlot(slotId, userId);
    return sendResponse(res, 201, "Successfully Locked Slot", bookSlot)
})
module.exports = {
    registerPetIssue,
    getPetOwnerById,
    registerPet,
    getPetsData,
    lockDoctorSlot
};
