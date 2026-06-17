const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const requireFields = require('../utils/validateRequest');
const petOwnerServices = require('../services/petOwner.services');
const sendResponse = require('../utils/SendResponse');
const authServices = require('../services/auth.services');
const { stripe } = require('../config/stripe');
const prisma = require('../config/prisma');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const uploadBufferToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};

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
        const uploadedImage = await uploadBufferToCloudinary(
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
            PetPicture: true,
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

    if (!savePetIssue || !savePetIssue.appointment || !savePetIssue.appointment.fees) {
        return sendResponse(res, 400, 'Failed to Submit Issue', {});
    }

    const uploadedIssuePictures = [];

    for (const file of files) {
        const uploadedImage = await uploadBufferToCloudinary(
            file.buffer,
            `pets-veta/pet-issues/${savePetIssue.id}`
        );

        uploadedIssuePictures.push({
            publicUrl: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
            petIssueId: savePetIssue.id,
        });
    }

    if (uploadedIssuePictures.length > 0) {
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

    const issueWithPictures = await prisma.petIssue.findUnique({
        where: {
            id: savePetIssue.id,
        },
        include: {
            issuePictures: true,
            appointment: true,
        },
    });

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

    return sendResponse(res, 200, 'Successfully Send Data', petsData);
});

module.exports = {
    registerPetIssue,
    getPetOwnerById,
    registerPet,
    getPetsData,
};