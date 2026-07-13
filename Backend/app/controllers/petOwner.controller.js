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

    console.log("Error hitting ===>")

    return sendResponse(res, 201, 'Successfully created Pet', uploadedPictures);
});

const registerPetIssue = catchAsync(async (req, res) => {
    const petOwnerId = req.user?.id;

    if (!petOwnerId) {
        return sendResponse(res, 401, 'Please login first', {});
    }

    requireFields(['appointmentId', 'petId', 'issue'], req.body);

    const { appointmentId, petId, issue } = req.body;

    const petIssue = {
        appointmentId,
        petId,
        issue,
        petOwnerId
    };

    const createPetIssueReport = await petOwnerServices.registerPetIssue(petIssue);

    return sendResponse(res, 201, 'Report created successfully. Please continue to payment.', {
        petIssue: createPetIssueReport.registerIssue,
        appointment: createPetIssueReport.appointment,
        redirectToPayment: true
    });
});

const getPetOwnerById = catchAsync(async (req, res) => {
    const { id } = req.user;
    const getPetOwner = await authServices.getUserById(id);

    if (!getPetOwner) {
        return sendResponse(res, 400, 'Invalid User', {});
    }

    const user = {
        id: getPetOwner.id,
        fullName: getPetOwner.fullName,
        username: getPetOwner.username,
        email: getPetOwner.email,
        phone: getPetOwner.phone || '',
        profileImageUrl: getPetOwner.profileImageUrl,
    };

    return sendResponse(res, 200, 'Successfully Send User', user);
});

const updatePetOwnerProfile = catchAsync(async (req, res) => {
    const { id } = req.user;
    const { fullName, username, phone } = req.body || {};

    requireFields(['fullName', 'username'], req.body);

    let profileImageUrl = req.body?.profileImageUrl;

    if (req.file) {
        const uploadedImage = await cloudinary.uploadToCloudinary(
            req.file.buffer,
            `pets-veta/profile-images/${id}`
        );

        profileImageUrl = uploadedImage.secure_url;
    }

    const updatedProfile = await petOwnerServices.updatePetOwnerProfile(id, {
        fullName,
        username,
        phone: phone || '',
        profileImageUrl,
    });

    return sendResponse(
        res,
        200,
        'Profile updated successfully',
        updatedProfile
    );
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
    const petOwnerId = req.user?.id;

    if (!petOwnerId) {
        return sendResponse(res, 401, "Please login first", {});
    }

    requireFields(["doctorId", "slotId"], req.body);

    const { doctorId, slotId } = req.body;

    const bookSlot = await petOwnerServices.lockUserSlot({
        scheduleId: slotId,
        doctorId,
        petOwnerId
    });

    return sendResponse(res, 201, "Successfully locked slot", bookSlot);
});

const getPetOwnerAppointments = catchAsync(async (req, res) => {
    const petOwnerId = req.user?.id;

    if (!petOwnerId) {
        return sendResponse(res, 401, 'Please login first', {});
    }

    const appointments = await petOwnerServices.getPetOwnerAppointments(petOwnerId);

    return sendResponse(
        res,
        200,
        'Successfully retrieved pet owner appointments',
        appointments
    );
});
const getPetById = catchAsync(async (req, res) => {
    const petOwnerId = req.user?.id;
    const { petId } = req.params;

    if (!petOwnerId) {
        return sendResponse(res, 401, 'Please login first', {});
    }

    const pet = await petOwnerServices.getPetById(petId, petOwnerId);
    if (!pet) {
        throw new AppError("Pet profile not found", 404);
    }

    return sendResponse(res, 200, 'Successfully fetched pet profile', pet);
});

const updatePet = catchAsync(async (req, res) => {
    const petOwnerId = req.user?.id;
    const { petId } = req.params;

    if (!petOwnerId) {
        return sendResponse(res, 401, 'Please login first', {});
    }

    requireFields(['name', 'age', 'breed', 'category'], req.body);

    const updated = await petOwnerServices.updatePet(petId, petOwnerId, req.body);
    return sendResponse(res, 200, 'Pet profile updated successfully', updated);
});

const deletePet = catchAsync(async (req, res) => {
    const petOwnerId = req.user?.id;
    const { petId } = req.params;

    if (!petOwnerId) {
        return sendResponse(res, 401, 'Please login first', {});
    }

    await petOwnerServices.deletePet(petId, petOwnerId);
    return sendResponse(res, 200, 'Pet profile deleted successfully', {});
});


const cancelAppointmentHold = catchAsync(async (req, res) => {
    const petOwnerId = req.user?.id;
    const { appointmentId } = req.params;

    if (!petOwnerId) {
        return sendResponse(res, 401, "Please login first", {});
    }

    const result = await petOwnerServices.releaseAppointmentHold(appointmentId, petOwnerId);
    return sendResponse(res, 200, "Appointment hold released successfully", result);
});


module.exports = {
    cancelAppointmentHold,
    registerPetIssue,
    getPetOwnerById,
    updatePetOwnerProfile,
    registerPet,
    getPetsData,
    lockDoctorSlot,
    getPetOwnerAppointments,
    getPetById,    
    updatePet,    
    deletePet     
};