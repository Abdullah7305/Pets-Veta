const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const requireFields = require('../utils/validateRequest');
const petOwnerServices = require('../services/petOwner.services');
const sendResponse = require('../utils/SendResponse');
const authServices = require('../services/auth.services');
const { stripe } = require('../config/stripe');
const { default: prisma } = require('../config/prisma');
const { uploadToCloudinary } = require('../utils/cloudinary.utils');

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

    if (!petOwner || petOwner.role !== 'PetOwner') {
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

    const uploadedPictures = [];

    for (const file of files) {
        const uploadedImage = await uploadToCloudinary(
            file.buffer,
            `pets-veta/pets/${newPet.id}`
        );

        uploadedPictures.push({
            publicUrl: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
            petId: newPet.id,
        });
    }

    await prisma.petPicture.createMany({
        data: uploadedPictures,
    });

    const petWithPictures = await prisma.pet.findUnique({
        where: {
            id: newPet.id,
        },
        include: {
            petPictures: true,
        },
    });

    return sendResponse(res, 201, 'Successfully created Pet', petWithPictures);
});

const registerPetIssue = catchAsync(async (req, res) => {
    const petOwnerId = req.user?.id;

    if (!petOwnerId) {
        return sendResponse(res, 401, 'Please login first', {});
    }

    requireFields(['petId', 'issue', 'doctorId', 'checkupTime'], req.body);

    const { petId, issue, doctorId, checkupTime } = req.body;
    const files = req.files || [];

    const petOwner = await authServices.getUserById(petOwnerId);

    if (!petOwner || petOwner.role !== 'PetOwner') {
        return sendResponse(res, 403, 'Only pet owner can submit pet issue', {});
    }

    const pet = await prisma.pet.findFirst({
        where: {
            id: petId,
            petOwnerId,
        },
    });

    if (!pet) {
        return sendResponse(res, 404, 'Pet not found or this pet does not belong to you', {});
    }

    const petIssue = {
        petOwnerId,
        petId,
        issue,
        doctorId,
        checkupTime,
    };

    const savePetIssue = await petOwnerServices.registerPetIssue(petIssue);

    if (!savePetIssue || !savePetIssue.petIssue || !savePetIssue.appointment || !savePetIssue.appointment.fees) {
        return sendResponse(res, 400, 'Failed to Submit Issue', {});
    }

    const uploadedIssuePictures = [];

    for (const file of files) {
        const uploadedImage = await uploadToCloudinary(
            file.buffer,
            `pets-veta/pet-issues/${savePetIssue.petIssue.id}`
        );

        uploadedIssuePictures.push({
            publicUrl: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
            petIssueId: savePetIssue.petIssue.id,
        });
    }

    if (uploadedIssuePictures.length > 0 && prisma.petIssuePicture) {
        await prisma.petIssuePicture.createMany({
            data: uploadedIssuePictures,
        });
    }

    const appointment = savePetIssue.appointment;

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    unit_amount: appointment.fees * 100,
                    product_data: {
                        name: 'Pet Doctor Consultation',
                    },
                },
                quantity: 1,
            },
        ],
        success_url: `${process.env.FRONTEND_URL}/payment-success?session_id=CHECKOUT_SESSION_ID`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
        metadata: {
            appointmentId: appointment.id,
            petOwnerId,
            petId,
        },
    });

    await petOwnerServices.updateAppointmentStripeId(appointment.id, session.id);

    const issueWithPictures = {
        ...savePetIssue.petIssue,
        appointment,
    };

    return sendResponse(res, 201, 'Successfully Submitted', {
        checkoutUrl: session.url,
        issue: issueWithPictures,
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
        const uploadedImage = await uploadToCloudinary(
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

    return sendResponse(res, 200, 'Successfully Send Data', petsData);
});

module.exports = {
    registerPetIssue,
    getPetOwnerById,
    updatePetOwnerProfile,
    registerPet,
    getPetsData,
};
