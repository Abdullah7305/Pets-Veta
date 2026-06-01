This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
app.js
config/cloudinary.config.js
config/multer.config.js
config/prisma.js
controllers/admin.controller.js
controllers/auth.controller.js
controllers/doctor.controller.js
middleware/auth.middleware.js
middleware/authorizeRole.middleware.js
middleware/globalErrorHandler.js
routes/admin.routes.js
routes/auth.routes.js
server.js
services/admin.services.js
services/auth.services.js
services/authCookies.services.js
services/authToken.services.js
services/doctor.services.js
utils/AppError.js
utils/auth.utils.js
utils/CatchAsync.js
utils/cloudinary.utils.js
utils/cookiesOption.js
utils/googleAuth.js
utils/jwt.js
utils/SendResponse.js
utils/validateRequest.js
```

# Files

## File: app.js
```javascript
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const authRouter = require('./routes/auth.routes')
const adminRouter = require('./routes/admin.routes');
const globalErrorHandler = require('./middleware/globalErrorHandler');

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/admin', adminRouter)

app.use(globalErrorHandler);
module.exports = app;
```

## File: config/cloudinary.config.js
```javascript
// const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// module.exports = cloudinary;
```

## File: config/multer.config.js
```javascript
const multer = require('multer');

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    const allowedImageTypes = ["image/png", "image/jpeg", "image/webp"];

    const allowedVideoTypes = [
        "video/mp4",
        "video/quicktime",
        "video/x-msvideo",
        "video/webm",
    ];

    const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Invalid file type. Only images (PNG, JPEG, WEBP) and videos (MP4, MOV, AVI, WEBM) are allowed!"
            ),
            false
        );
    }
};

const upload = multer(
    {
        storage: storage,
        fileFilter: fileFilter
    }
)



module.exports = upload;
```

## File: config/prisma.js
```javascript
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

module.exports = { default: prisma };
```

## File: controllers/admin.controller.js
```javascript
const doctorServices = require('../services/admin.services');
const sendResponse = require('../utils/SendResponse');
const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const requireFields = require('../utils/validateRequest');
const authUtils = require('../utils/auth.utils');
const cloudinaryUtils = require('../utils/cloudinary.utils');


const allDoctorList = catchAsync(async (req, res) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    console.log("Limit and Page is ", limit, page);


    const { doctors, totalCount } = await doctorServices.allDoctors(limit, page);

    if (!doctors || doctors.length === 0) {
        return sendResponse(res, 200, 'No  Doctors Found', []);
    }

    return sendResponse(res, 200, 'Success', { doctors, totalCount });
});



const pendingDoctorList = catchAsync(async (req, res) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const { doctors, totalCount } = await doctorServices.sendPendingDoctors(limit, page);

    if (!doctors || doctors.length === 0) {
        return sendResponse(res, 200, 'No Pending Doctors Found', []);
    }

    return sendResponse(res, 200, 'Success', { doctors, totalCount });
});



const approvedDoctor = catchAsync(async (req, res) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    const { doctors, totalCount } = await doctorServices.approvedDoctor(limit, page);
    if (!doctors || doctors.length === 0) {
        return sendResponse(res, 200, 'No Approved Doctors Found', []);
    }
    return sendResponse(
        res,
        200,
        'Approved doctors Send',
        { doctors, totalCount }
    );
});



const rejectDoctor = catchAsync(async (req, res) => {
    console.log("Req.body", req.body);
    requireFields(['doctorId'], req.body);

    const { doctorId } = req.body;

    const certificate = await doctorServices.getDoctorWithCertificate(doctorId);
    console.log("Certificate", certificate);
    const deleteFromCloudinary = await cloudinaryUtils.deleteFromCloudinary(certificate.publicId);
    console.log("Delete Status is ", deleteFromCloudinary);

    const rejectedDoctor = await doctorServices.rejectDoctor(doctorId);
    console.log("rejected Doctor is ", rejectedDoctor);
    authUtils.sendStatusEmail(rejectedDoctor.user.email, "rejected")
        .then((mesg) => {
            console.log("Otp Mesg", mesg)
        })
        .catch((err) => {
            console.log("Error is sending the OTP");
        })
    return sendResponse(
        res,
        200,
        'Successfully rejected doctor',
        {}
    );
});



const approveupdateDoctor = catchAsync(async (req, res) => {
    const { doctorId } = req.body;
    console.log("Htting", doctorId);
    if (!doctorId) {
        return sendResponse(res, 400, "No Doctor Id");
    }

    const approvedDoctor = await doctorServices.approveupdateDoctor(doctorId);
    authUtils.sendStatusEmail(approvedDoctor.user.email, "approved")
        .then((mesg) => {
            console.log("Otp Mesg", mesg)
        })
        .catch((err) => {
            console.log("Error is sending the OTP");
        })

    return sendResponse(res, 200, "Doctor approved successfully", {
        status: "approved",
        doctor: approvedDoctor,
    });
});



const fetchDoctorStats = catchAsync(async (req, res) => {
    if (!req.user) {
        throw new AppError("User is not valid", 400)
    }

    const stats = await doctorServices.giveDoctorState();
    const processedStats = {
        pending: stats[0],
        approved: stats[1],
        total: stats[2]
    }

    sendResponse(res, 200, "Doctor Stats", processedStats);

});



module.exports = {
    pendingDoctorList,
    approvedDoctor,
    rejectDoctor,
    approveupdateDoctor,
    allDoctorList,
    fetchDoctorStats
};
```

## File: controllers/auth.controller.js
```javascript
const { createAuthTokens } = require('../services/authToken.services')
const { uploadToCloudinary } = require('../utils/cloudinary.utils');
const { getGoogleAuthUrl } = require('../utils/googleAuth');
const { createAccountByGoogleService } = require('../services/auth.services');
const { jwtSign, Token_Types } = require('../utils/jwt');
const cookiesOptions = require('../utils/cookiesOption');
const requireFields = require('../utils/validateRequest');
const authServices = require('../services/auth.services')
const sendResponse = require('../utils/SendResponse');
const authUtils = require('../utils/auth.utils');
const catchAsync = require('../utils/CatchAsync')
const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');


const verifyUser = catchAsync(async (req, res) => {
    requireFields(["id", "email"], req.user);
    const { id, email } = req.user;
    const userData = await authServices.verifyEmail(email);
    if (!userData) {
        throw new AppError("User do not Exist", 401)
    }
    const user = {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        role: userData.userRole.role
    }
    return sendResponse(res, 200, "Success", user);

}

)


const getGoogleUrlController = catchAsync(async (req, res) => {
    const url = getGoogleAuthUrl();
    console.log("URL is ", url);
    sendResponse(res, 200, "Success", { url })

})

const handleGoogleCallbackController = catchAsync(async (req, res) => {
    const { code } = req.query;

    if (!code) {
        throw new AppError("Authorization code is missing from Google", 400)
    }

    const { user, accessToken, refreshToken } = await createAccountByGoogleService(code);

    res.cookie('accessToken', accessToken, cookiesOptions);
    res.cookie('refreshToken', refreshToken, cookiesOptions);
    const frontendDashboardUrl = `http://localhost:5173/auth-success`
    return res.redirect(frontendDashboardUrl);
})


const createDoctorAccount = catchAsync(async (req, res) => {

    if (!req.file) {
        throw new AppError("File is missing", 400);
    }

    requireFields(["fullName", "username", "fees", "email", "password", "phone", "education", "specialization", "address", "experience"], req.body)
    const { fullName, username, email, password, fees, phone,
        education, specialization, address, experience } = req.body;

    req.body.fees = Number(req.body.fees);

    const isDoctorExist = await authServices.verifyEmail(email);
    const isUsernameExist = await authServices.verifyUsername(username);

    if (isDoctorExist || isUsernameExist) {
        throw new AppError("User already exists", 409);
    }

    const result = await uploadToCloudinary(
        req.file.buffer,
        "pets-veta/doctor-document"
    );


    const publicUrl = result.secure_url;
    const publicId = result.public_id;

    const hashedPassword = await bcrypt.hash(password, 12);

    const doctorData = {
        fullName: fullName,
        username: username,
        email: email,
        phone: phone,
        password: hashedPassword,
        education: education,
        specialization: specialization,
        address: address,
        experience: experience,
        fees: fees,
        publicId: publicId,
        publicUrl: publicUrl
    }


    let newDoctor = await authServices.createDoctor(doctorData);

    if (!newDoctor) {
        throw new AppError("User already Exist", 400);
    }

    const otpCode = authUtils.otpGenerator();
    const hashedOtp = await bcrypt.hash(otpCode, 12);
    await authServices.saveUserOtp(email, hashedOtp);

    authUtils.sendOtp(email, otpCode)
        .then((mesg) => {
            console.log("otp mesg", mesg)
        })
        .catch((err) => {
            console.log("Otp error", err)
        })

    const payload = {
        id: newDoctor.id,
        email: newDoctor.email
    };

    newDoctor = {
        id: newDoctor.id,
        email: newDoctor.email,
        role: newDoctor.userRole.role
    }

    const otpToken = jwtSign(payload, Token_Types.OTP);

    res.cookie('otpToken', otpToken, cookiesOptions);

    return sendResponse(res, 200, "Success", newDoctor);

})


const createPetOwnerAccount = catchAsync(async (req, res) => {

    requireFields(["fullName", "username", "email", "password"], req.body);

    const { fullName, username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const petOwnerData = {
        ...req.body,
        hashedPassword
    }



    let newPetOwner = await authServices.createPetOwner(petOwnerData);
    if (!newPetOwner) {
        throw new AppError("Account already Created", 400);
    }

    let validPetOwner = {
        name: newPetOwner.fullName,
        username: newPetOwner.username,
        email: newPetOwner.email,
        role: newPetOwner.userRole.role
    }
    const otpCode = authUtils.otpGenerator();
    const hashedOtp = await bcrypt.hash(otpCode, 12);
    await authServices.saveUserOtp(email, hashedOtp);
    authUtils.sendOtp(email, otpCode)
        .then((mesg) => {
            console.log("Otp Mesg", mesg)
        })
        .catch((err) => {
            console.log("Error is sending the OTP");
        })

    const payload = {
        id: newPetOwner.id,
        email: newPetOwner.email,
        role: newPetOwner.userRole.role
    }

    const otpToken = jwtSign(payload, Token_Types.OTP);

    res.cookie('otpToken', otpToken, cookiesOptions);

    return sendResponse(res, 200, "Success", validPetOwner);


}
)


const createAdminAccount = catchAsync(async (req, res) => {


    requireFields(["fullName", "username", "email", "password"], req.body);

    const { fullName, username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const adminData = {
        ...req.body,
        hashedPassword,

    }

    const newAdmin = await authServices.createAdmin(adminData);

    if (!newAdmin) {

        throw new AppError("Admin already exist", 400);
    }

    const validAdmin = {
        id: newAdmin.id,
        role: newAdmin.userRole.role,
        email: newAdmin.email
    }

    const payload = {
        id: newAdmin.id,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.userRole.role,
    }



    const { accessToken, refreshToken } = createAuthTokens(payload);
    await authServices.refreshUserToken(email, refreshToken);

    res.cookie("accessToken", accessToken, cookiesOptions);
    res.cookie("refreshToken", refreshToken, cookiesOptions);

    return sendResponse(res, 200, "Success", validAdmin);


})


const adminLogin = catchAsync(async (req, res) => {

    requireFields(["email", "password"], req.body);

    const { email, password } = req.body;
    console.log("Admin Login Controller Hit....");

    const isValidUser = await authServices.getUserWithRole(email);
    console.log("Valid Admn is ", isValidUser)
    if (!isValidUser) {
        throw new AppError("Invalid User Access", 401);
    }


    const isPasswordMatch = await bcrypt.compare(password, isValidUser.password);
    if (!isPasswordMatch) {
        throw new AppError("Invalid Code or Password", 401);

    }

    const validUser = {
        name: isValidUser.fullName,
        email: isValidUser.email,
        username: isValidUser.username,
        role: isValidUser.userRole.role

    }

    const payload = {
        id: isValidUser.id,
        username: isValidUser.username,
        email: isValidUser.email,
        role: isValidUser.userRole.role
    }

    const { accessToken, refreshToken } = createAuthTokens(payload);
    await authServices.refreshUserToken(email, refreshToken);

    res.cookie("accessToken", accessToken, cookiesOptions);
    res.cookie("refreshToken", refreshToken, cookiesOptions);

    return sendResponse(res, 200, "Success", validUser)

})


const loginUserAccount = catchAsync(async (req, res) => {

    requireFields(["email", "password"], req.body);

    const { email, password } = req.body;


    const user = await authServices.loginUser(req.body);

    if (!user) {
        throw new AppError("Email or Password invalid", 401);
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
        throw new AppError("Email or Password invalid", 401);
    }


    const validUser = {
        name: user.fullName,
        email: user.email,
        username: user.username,
        role: user.userRole.role

    }

    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.userRole.role
    }

    const { accessToken, refreshToken } = createAuthTokens(payload);
    await authServices.refreshUserToken(email, refreshToken);

    res.cookie("accessToken", accessToken, cookiesOptions);
    res.cookie("refreshToken", refreshToken, cookiesOptions);

    return sendResponse(res, 200, "Success", validUser)
}
)


const refreshTokenController = catchAsync(async (req, res) => {
    console.log("I hit.....");
    requireFields(["id", "email",], req.user);
    const { id, email, role } = req.user;
    const payload = {
        id: id,
        email: email,
        role: role
    }

    const { accessToken, refreshToken } = createAuthTokens(payload);


    res.cookie("accessToken", accessToken, cookiesOptions);
    res.cookie("refreshToken", refreshToken, cookiesOptions);



    await authServices.refreshUserToken(email, refreshToken);

    const user = {
        email: email
    }

    return sendResponse(res, 200, "Token Refreshed", user);


})


const verifyUserEmail = catchAsync(async (req, res) => {

    requireFields(["email"], req.body);

    const { email } = req.body;
    const validUser = await authServices.verifyEmail(email);
    if (!validUser) {
        throw new AppError("User Invalid", 400);
    }
    const otpCode = authUtils.otpGenerator();
    const hashedOtp = await bcrypt.hash(otpCode, 12);
    await authServices.saveUserOtp(email, hashedOtp);
    authUtils.sendOtp(email, otpCode)
        .then(() => {
            console.log("OTP sent");
        })
        .catch((err) => {
            console.log("OTP error", err);
        });

    const payload = {
        id: validUser.id,
        email: validUser.email,

    }
    const otpToken = jwtSign(payload, Token_Types.OTP);

    res.cookie('otpToken', otpToken, cookiesOptions);

    return sendResponse(res, 200, "Otp sent", email);


})


const verifyOtp = catchAsync(async (req, res) => {


    const { id, email } = req.user;
    const { otp } = req.body;
    console.log("OTP is ", otp)
    requireFields(["id", "email"], req.user);
    requireFields(["otp"], req.body);


    const validUser = await authServices.verifyEmail(email);
    if (!validUser) {
        throw new AppError("Invalid user email", 400);
    }


    const isMatched = await bcrypt.compare(otp, validUser.otp);
    if (!isMatched) {
        throw new AppError("OTP code invalid", 400);
    }

    const updatedUserSchema = await authServices.updateOtpField(email);
    const userData = await authServices.getUserWithRole(email);

    const payload = {
        id: validUser.id,
        username: validUser.username,
        email: validUser.email,
        role: userData.userRole.role
    }

    const { accessToken, refreshToken } = createAuthTokens(payload);
    await authServices.refreshUserToken(email, refreshToken);

    res.cookie("accessToken", accessToken, cookiesOptions);
    res.cookie("refreshToken", refreshToken, cookiesOptions);
    // res.clearCookie("otpToken", cookiesOptions);

    const safeUser = {
        id: updatedUserSchema.id,
        username: updatedUserSchema.username,
        email: updatedUserSchema.email,
        role: userData.userRole.role
    };

    return sendResponse(
        res,
        200,
        "Success",
        safeUser
    );



})


const resendUserOtp = catchAsync(async (req, res) => {

    const { email } = req.user;
    const validUser = await authServices.verifyEmail(email);
    if (!validUser) {
        throw new AppError("Invalid User Email", 400);
    }
    const otpCode = authUtils.otpGenerator();
    const hashedOtp = await bcrypt.hash(otpCode, 12);
    await authServices.saveUserOtp(email, hashedOtp);
    authUtils.sendOtp(email, otpCode)
        .then(() => {
            console.log("OTP sent");
        })
        .catch((err) => {
            console.log("OTP error", err);
        });
    const payload = {
        id: validUser.id,
        email: validUser.email,

    }
    const otpToken = jwtSign(payload, Token_Types.OTP);

    res.cookie('otpToken', otpToken, cookiesOptions);

    return sendResponse(res, 201, "Success", validUser.email);
})


const resetUserPassword = catchAsync(async (req, res) => {

    const { id, email } = req.user;
    const { password } = req.body;
    requireFields(["id", "email"], req.user);
    requireFields(["password"], req.body);

    const isValidUser = await authServices.verifyEmail(email);
    if (!isValidUser) {
        throw new AppError("Invalid User", 400)
    }
    const isMatched = await bcrypt.compare(password, isValidUser.password);
    if (isMatched) {
        throw new AppError("New password cannot be same as old password", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await authServices.updateUserPassword(id, hashedPassword);
    res.clearCookie("otpToken", cookiesOptions);
    return sendResponse(res, 201, "Password Reset", isValidUser.email)


})

const logoutUser = catchAsync(async (req, res) => {
    const { user } = req.user;
    if (!req.user) {
        throw new AppError("Not Valid User Session", 400)
    }
    const userData = await authServices.verifyEmail(req.user.email);
    if (!user) {
        return sendResponse(res, 200, "Invalid user ", false);
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('otpToken');

    return sendResponse(res, 200, "User Logout", userData);
})



module.exports = {
    createDoctorAccount,
    createPetOwnerAccount,
    loginUserAccount,
    refreshTokenController,
    verifyUserEmail,
    resetUserPassword,
    verifyOtp,
    resendUserOtp,
    createAdminAccount,
    adminLogin,
    handleGoogleCallbackController,
    getGoogleUrlController,
    verifyUser,
    logoutUser
}
```

## File: controllers/doctor.controller.js
```javascript

```

## File: middleware/auth.middleware.js
```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        console.log("Cookies in protect are ", req.cookies)
        if (!token) {
            console.log("No Token!");
            return res.status(401).json({ success: false, err: 'Access token missing' });

        }
        const secret = process.env.JWT_ACCESS_SECRET;
        const decoded = jwt.verify(token, secret);

        req.user = decoded;
        console.log("Requset is ", req.user);
        next();

    } catch (error) {
        console.log("Error in jwt middleware", error.message);
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, err: "Token expired or invalid" });
        }

        return res.status(500).json({ success: false, err: error.message })
    }
}

const protectRefresh = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            console.log("No Refresh Token Found!");
            return res.status(401).json({ success: false, err: 'Session expired. Please log in again.' });
        }

        const secret = process.env.JWT_REFRESH_SECRET;
        const decoded = jwt.verify(token, secret);

        req.user = decoded;
        next();

    } catch (error) {
        console.log("Error in refresh token middleware:", error.message);


        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, err: "Session expired. Please log in again." });
        }


        return res.status(500).json({ success: false, err: error.message });
    }
}

const protectOtp = async (req, res, next) => {
    try {
        const otpToken = req.cookies.otpToken;
        console.log("OTP token is ", req.cookies.otpToken);

        if (!otpToken) {
            return res.status(400).json({ err: 'Invalid Cookie' })
        }
        const decoded = jwt.verify(otpToken, process.env.JWT_OTP_SECRET);
        if (!decoded) {
            return res.status(400).json({ err: 'Invalid Decoding in auth middleware' })
        }
        req.user = decoded;
        next();

    } catch (error) {
        console.log("Protect Otp Err", error.message);
        return res.status(500).json({ tokenErr: error.message })
    }
}
module.exports = {
    protect,
    protectRefresh,
    protectOtp
}
```

## File: middleware/authorizeRole.middleware.js
```javascript
const authenticateUserRole = (...rolname) => {
    return (req, res, next) => {
        console.log("Req.user is", req.user);
        if (!req.user) {
            return res.status(401).json({ message: 'User is not loggedIn' });
        }
        if (!rolname.includes(req.user.role)) {
            return res.status(401).json({ message: 'Invalid Access' })
        }

        next()
    }
}


module.exports = { authenticateUserRole };
```

## File: middleware/globalErrorHandler.js
```javascript
const globalErrorHandler = (err, req, res, next) => {
    console.log(err);
    
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";

    res.status(statusCode).json({
        success: false,
        status: status,
        message: err.message || "Something went wrong"
    })

};

module.exports = globalErrorHandler;
```

## File: routes/admin.routes.js
```javascript
const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');
const authenticateRole = require('../middleware/authorizeRole.middleware')
const Router = express.Router();

Router
    .route('/all/doctors')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.allDoctorList)

Router
    .route('/doctor-stats')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.fetchDoctorStats)

Router
    .route('/pending/doctors')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.pendingDoctorList)

Router
    .route('/approved/doctors')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.approvedDoctor)

Router
    .route('/approve-pending/doctor')
    .post(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.approveupdateDoctor)

Router
    .route('/reject/doctor')
    .post(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.rejectDoctor)

module.exports = Router;
```

## File: routes/auth.routes.js
```javascript
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
```

## File: server.js
```javascript
const app = require('./app');

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server is running");
})
```

## File: services/admin.services.js
```javascript
const { default: prisma } = require('../config/prisma');
const { VerificationStatus, Prisma } = require('@prisma/client');
const AppError = require('../utils/AppError');

const allDoctors = async (limit, page) => {

  const skip = (page - 1) * limit;
  const [doctors, totalCount] = await prisma.$transaction([
    prisma.doctor.findMany({
      skip: skip,
      take: limit,
      select: {
        id: true,
        specialization: true,
        education: true,
        experience: true,
        isVerified: true,
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            doctorCertificates: {
              select: {
                publicUrl: true,
                publicId: true
              }
            }
          }
        }

      },
      orderBy: {
        id: 'asc'
      }
    }),
    prisma.doctor.count()
  ])
  return { doctors, totalCount };
}

const sendPendingDoctors = async (limit, page) => {
  const skip = (page - 1) * limit;
  const [doctors, totalCount] = await prisma.$transaction([
    prisma.doctor.findMany({
      skip: skip,
      take: limit,
      where: {
        isVerified: VerificationStatus.PENDING,
      },
      select: {
        id: true,
        specialization: true,
        education: true,
        experience: true,
        isVerified: true,
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            doctorCertificates: {
              select: {
                publicUrl: true
              }
            }
          },

        }
      },
    }),
    prisma.doctor.count({
      where: {
        isVerified: VerificationStatus.PENDING
      }
    })
  ])
  return { doctors, totalCount };

};

const findDoctorById = async (doctorId) => {
  return await prisma.doctor.findUnique({
    where: {
      id: doctorId,
    },
    select: {
      id: true,
      specialization: true,
      education: true,
      degreeLicenseUrl: true,
      experience: true,
      isVerified: true,
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true
        }
      }
    },
  });
};

const rejectDoctor = async (doctorId) => {
  let doctor = await prisma.doctor.findUnique({
    where: {
      id: doctorId
    },
    select: {
      userId: true,
      user: {
        select: {
          email: true
        }
      }
    }
  });

  if (!doctor) {
    throw new AppError("No Doctor with Id found", 400)
    return;
  }
  const deletedDoctor = await prisma.user.delete({
    where: {
      id: doctor.userId
    },
    include: {
      doctors: true
    }
  })
  return doctor;
};

const approvedDoctor = async (limit, page) => {
  const skip = (page - 1) * limit;
  const [doctors, totalCount] = await prisma.$transaction([
    prisma.doctor.findMany({
      skip: skip,
      take: limit,
      where: {
        isVerified: VerificationStatus.APPROVED,
      },
      select: {
        id: true,
        specialization: true,
        education: true,
        experience: true,
        isVerified: true,
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            doctorCertificates: {
              select: {
                publicUrl: true
              }
            }
          }
        }
      },
    }),
    prisma.doctor.count({
      where: {
        isVerified: VerificationStatus.APPROVED
      }
    })
  ])
  return { doctors, totalCount };
};

const approveupdateDoctor = async (doctorId) => {

  const isDoctor = await prisma.doctor.findUnique({
    where: {
      id: doctorId
    }
  });

  if (!isDoctor) {
    throw new AppError("Doctor Not Available", 400);
    return;
  }

  return await prisma.doctor.update({
    where: {
      id: doctorId,
    },
    data: {
      isVerified: VerificationStatus.APPROVED,
    },
    select: {
      id: true,
      user: {
        select: {
          email: true
        }
      }
    },
  });
};



const giveDoctorState = async () => {
  const stats = await prisma.$transaction([
    prisma.doctor.count({ where: { isVerified: VerificationStatus.PENDING } }),
    prisma.doctor.count({ where: { isVerified: VerificationStatus.APPROVED } }),
    prisma.doctor.count()
  ])
  return stats;
}
const getDoctorWithCertificate = async (doctorId) => {
  if (!doctorId) {
    throw new AppError("Doctor Id not provided...", 400);
  }
  const doctor = await prisma.doctor.findUnique({
    where: {
      id: doctorId
    }
  })
  if (!doctor) {
    throw new AppError("Doctor Donot exist to delete...", 400)
  }
  const certificate = await prisma.doctorCertificate.findUnique({
    where: {
      userId: doctor.userId
    }

  })

  return certificate;
}

module.exports = {
  sendPendingDoctors,
  approvedDoctor,
  rejectDoctor,
  approveupdateDoctor,
  findDoctorById,
  allDoctors,
  giveDoctorState,
  getDoctorWithCertificate
};
```

## File: services/auth.services.js
```javascript
const { default: prisma, userRole } = require('../config/prisma');
const { getGoogleProfileToken } = require('../utils/googleAuth');
const { createAuthTokens } = require('../services/authToken.services')
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');


const createDoctor = async (doctorData) => {

    return await prisma.user.create({
        data: {
            fullName: doctorData.fullName,
            email: doctorData.email,
            password: doctorData.hashedPassword,
            username: doctorData.username,
            phone: doctorData.phone,
            doctors: {
                create: {
                    education: doctorData.education,
                    specialization: doctorData.specialization,
                    address: doctorData.address,
                    experience: parseInt(doctorData.experience),
                    fees: parseInt(doctorData.fees)
                }
            },
            doctorCertificates: {
                create: {
                    publicId: doctorData.publicId,
                    publicUrl: doctorData.publicUrl
                }
            },

            userRole: {
                create: { role: "Doctor" }
            }
        },
        include: {
            doctors: true,
            userRole: true,
            doctorCertificates: true
        }
    });
};


const createPetOwner = async (petOwnerData) => {

    const isCreated = await prisma.user.findFirst({
        where: {
            OR: [
                { email: petOwnerData.email },
                { username: petOwnerData.username }
            ]
        }
    })
    if (isCreated) {
        return false;
    }
    const newPetOwner = await prisma.user.create({
        data: {
            fullName: petOwnerData.fullName,
            username: petOwnerData.username,
            email: petOwnerData.email,
            password: petOwnerData.hashedPassword,


            userRole: {
                create: {
                    role: 'PetOwner'
                }
            }
        },
        include: {
            userRole: true,

        }
    });
    return newPetOwner;
}

const createAccountByGoogleService = async (code) => {
    const profile = await getGoogleProfileToken(code);

    let user = await prisma.user.findUnique({
        where: { email: profile.email },
        include: { userRole: true }
    });
    if (!user) {
        const baseUsername = profile.email.split('@')[0];
        const uniqueUsername = `${baseUsername}_${Math.floor(1000 + Math.random() * 9000)}`

        user = await createPetOwner({
            fullName: profile.name,
            username: uniqueUsername,
            email: profile.email,
            hashedPassword: null

        })
    }
    const userRole = user.userRole?.role || 'Pet Owner';


    const payload = {
        id: user.id,
        email: user.email,
        role: userRole
    };

    const { accessToken, refreshToken } = createAuthTokens(payload);

    return { user, accessToken: accessToken, refreshToken: refreshToken };

}


const createAdmin = async (adminData) => {
    const isCreated = await prisma.user.findUnique({
        where: {
            email: adminData.email
        }
    });

    if (isCreated) {
        return false;
    }

    const newAdmin = await prisma.user.create({
        data: {
            fullName: adminData.fullName,
            username: adminData.username,
            email: adminData.email,
            password: adminData.hashedPassword,
            isEmailVerified: true,
            userRole: {
                create: {
                    role: 'Admin'
                }
            },


        },

        include: {
            userRole: true,
            admin: true
        }
    });

    return newAdmin;
};

const loginUser = async (userData) => {


    const user = await prisma.user.findFirst({
        where: {
            email: userData.email,
            isEmailVerified: true
        },
        include: {
            userRole: true,
            doctors: true,
            admin: true
        }
    });

    if (user?.userRole.role.toLowerCase() === 'doctor') {
        console.log("Hitting condition...");
        if (user.doctors.isVerified === 'PENDING') {
            throw new AppError("Unverified User is not allowed yet...", 403);
            return;
        }
    }

    return user;
};






const refreshUserToken = async (email, refreshToken) => {
    console.log("email and token is ", email, refreshToken);
    const updatedUser = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            refreshToken: refreshToken
        }
    })

    return refreshToken;
}


const verifyUsername = async (username) => {
    if (!username) {
        return false;
    }
    const validUser = await prisma.user.findFirst({
        where: {
            username: username
        }
    })
    return validUser;
}


const verifyEmail = async (email) => {
    if (!email) {
        return false;
    }
    const validUser = await prisma.user.findUnique({
        where: {
            email: email
        },
        include: {
            userRole: true
        }
    })
    return validUser;
}


const getUserWithRole = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email
        },
        include: {
            userRole: true,
            doctors: true,
            admin: true
        }
    });
};


const saveUserOtp = async (email, userOtp) => {
    const user = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            otp: userOtp
        }
    })
    return user;

}


const updateOtpField = async (email) => {
    const user = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            otp: "",
            isEmailVerified: true
        }
    })
    return user;
}


const updateUserPassword = async (id, password) => {
    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            password: password
        }
    })
    return user;
}



module.exports = {
    createDoctor,
    createPetOwner,
    loginUser,
    refreshUserToken,
    verifyEmail,
    saveUserOtp,
    updateOtpField,
    getUserWithRole,
    updateUserPassword,
    createAdmin,
    verifyUsername,
    createAccountByGoogleService
};
```

## File: services/authCookies.services.js
```javascript

```

## File: services/authToken.services.js
```javascript
const jwt = require("jsonwebtoken");

const createAuthTokens = (payload) => {

    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const accessExpiry = process.env.JWT_ACCESS_EXPIRY;
    const refreshExpiry = process.env.JWT_REFRESH_EXPIRY;


    if (!accessSecret || !refreshSecret) {
        throw new Error("JWT Configuration Error: Missing ACCESS or REFRESH secret keys in environment variables.");
    }

    const accessToken = jwt.sign(payload, accessSecret, {
        expiresIn: accessExpiry,
    });

    const refreshToken = jwt.sign(payload, refreshSecret, {
        expiresIn: refreshExpiry,
    });

    return { accessToken, refreshToken };
};

module.exports = {
    createAuthTokens,
};
```

## File: services/doctor.services.js
```javascript

```

## File: utils/AppError.js
```javascript
class AppError extends Error {
    constructor(message, statusCode) {

        super(message);

        this.statusCode = statusCode;

        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
```

## File: utils/auth.utils.js
```javascript
const nodemailer = require('nodemailer');
const AppError = require('./AppError');
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD, // app password
  },
});

const otpGenerator = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  return otp.toString();
}

const sendOtp = async (email, otpCode) => {
  try {
    const info = await transporter.sendMail({
      from: 'abdullahsuleman755@gmail.com',
      to: email,
      subject: "OTP Code",
      text: "Your OTP Code", // fallback
      html: `
  <body style="margin: 0; padding: 0; background-color: #eaf1ed; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #eaf1ed; padding: 40px 20px;">
      <tr>
        <td align="center">

          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #fdfbf7; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="padding: 40px 40px 20px 40px;">
                <table width="100%">
                  <tr>
                    <td width="50%">
                      <img src="YOUR_LOGO_URL_HERE.png" style="width: 140px;" />
                      <p style="color: #553e2a; font-size: 13px;">Compassion. Care. Trust.</p>
                    </td>
                    <td width="50%" style="text-align: right;">
                      <img src="YOUR_HEADER_IMAGE_URL_HERE.png" style="width: 200px;" />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td align="center" style="padding: 20px;">
                <h1 style="color: #4a3320;">Your OTP Code</h1>
                <p style="color: #4a3320;">
                  Use the code below to verify your account
                </p>
              </td>
            </tr>

            <!-- OTP -->
            <tr>
              <td align="center" style="padding: 30px;">
                <div style="background:#faeadd; padding:20px; font-size:40px; font-weight:bold; letter-spacing:10px; color:#5a3f28; border-radius:12px;">
                  ${otpCode}
                </div>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  `,
    });

    console.log("Message sent: %s", info.messageId);


    return info;

  } catch (err) {
    console.error("Error while sending mail:", err);

    throw new AppError(`Error is Sending Mail to ${email} ${error.message}`);
  }
}

const sendStatusEmail = async (email, status) => {
  const isApproved = status.toLowerCase() === 'approved';

  // Dynamic branding configuration based on approval/rejection status
  const config = {
    subject: isApproved ? " Welcome to the Pack! Your Application is Approved" : "Update Regarding Your Application",
    title: isApproved ? "Application Approved!" : "Application Status Update",
    accentColor: isApproved ? "#2e7d32" : "#d32f2f",
    bgColor: isApproved ? "#e8f5e9" : "#ffebee",
    messageHtml: isApproved
      ? `We are absolutely thrilled to welcome you to the family! Our team has verified your credentials, and your profile is now live. Let's make the world a happier, healthier place for our furry friends together! 🐾`
      : `Thank you for taking the time to apply with us. After a careful review of your profile, we regret to inform you that we cannot approve your application at this time. We sincerely appreciate your love and dedication to pet care. 🐾`,
    badgeText: isApproved ? "APPROVED" : "NOT APPROVED"
  };

  try {
    const info = await transporter.sendMail({
      from: 'abdullahsuleman755@gmail.com',
      to: email,
      subject: config.subject,
      text: isApproved ? "Your application has been approved." : "Your application has been rejected.", // Fallback
      html: `
      <body style="margin: 0; padding: 0; background-color: #eaf1ed; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #eaf1ed; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #fdfbf7; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
                
                <tr>
                  <td style="padding: 40px 40px 20px 40px;">
                    <table width="100%">
                      <tr>
                        <td width="50%">
                          <img src="YOUR_LOGO_URL_HERE.png" style="width: 140px;" alt="Logo" />
                          <p style="color: #553e2a; font-size: 13px; margin: 5px 0 0 0;">Compassion. Care. Trust.</p>
                        </td>
                        <td width="50%" style="text-align: right;">
                          <img src="YOUR_HEADER_IMAGE_URL_HERE.png" style="width: 200px;" alt="Pets Veta Header" />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 20px 40px; text-align: center;">
                    <h1 style="color: #4a3320; font-size: 28px; margin-bottom: 10px;">${config.title}</h1>
                    <p style="color: #5a4b3e; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                      ${config.messageHtml}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding-bottom: 50px;">
                    <div style="background: ${config.bgColor}; max-width: 200px; padding: 15px 25px; font-size: 18px; font-weight: bold; letter-spacing: 2px; color: ${config.accentColor}; border: 2px solid ${config.accentColor}; border-radius: 12px; text-align: center;">
                      ${config.badgeText}
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      `,
    });

    console.log("Status email sent successfully: %s", info.messageId);
    return info;

  } catch (err) {
    console.error("Error sending status email:", err);
    throw err;
  }
};

module.exports = {
  otpGenerator,
  sendOtp,
  sendStatusEmail
}
```

## File: utils/CatchAsync.js
```javascript
function catchAsync(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next)
    }
}

module.exports = catchAsync;
```

## File: utils/cloudinary.utils.js
```javascript
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = (buffer, folder) => {

    console.log("--- Executing Cloudinary Upload ---");
    console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API Key Exists:", !!process.env.CLOUDINARY_API_KEY);

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'auto'
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Stream Error:", error);
                    return reject(error);
                }
                resolve(result);
            }
        );

        stream.end(buffer);
    });
};


const deleteFromCloudinary = (publicId) => {
    return new Promise((resolve, reject) => {
        const deleteResourceSatus = cloudinary.uploader.destroy(publicId, { resource_type: 'image', type: 'upload' },
            (error, result) => {
                if (error) {
                    console.log("Error in deleting from cloudinary is ", error);
                    return reject(error)
                }
                resolve(result)

            }
        )
    })
}


module.exports = { uploadToCloudinary, deleteFromCloudinary };
```

## File: utils/cookiesOption.js
```javascript
const cookiesOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",

    secure: false,
};

module.exports = cookiesOptions;
```

## File: utils/googleAuth.js
```javascript
const { OAuth2Client } = require('google-auth-library')

console.log("Client", process.env.CLIENT_ID)
console.log("Client Seret", process.env.CLIENT_SECRET)
console.log("Client Callback", process.env.GOOGLE_CALLBACK_URL)

const client = new OAuth2Client(

    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
)

const getGoogleAuthUrl = () => {
    return client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ]
    })
}

const getGoogleProfileToken = async (code) => {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.Client_ID
    });

    return ticket.getPayload();
}

module.exports = {
    getGoogleAuthUrl,
    getGoogleProfileToken
}
```

## File: utils/jwt.js
```javascript
const jwt = require('jsonwebtoken');

const Token_Types = {
    ACCESS: "access",
    REFRESH: "refresh",
    OTP: "otp"
};

const jwtSign = (payload, type) => {
    let secret;
    let expiresIn;

    // Moving the process.env reads INSIDE the execution flow 
    // guarantees that dotenv has already loaded your variables.
    if (type === Token_Types.ACCESS) {
        secret = process.env.JWT_ACCESS_SECRET;
        expiresIn = process.env.JWT_ACCESS_EXPIRY;
    }
    else if (type === Token_Types.REFRESH) {
        secret = process.env.JWT_REFRESH_SECRET;
        expiresIn = process.env.JWT_REFRESH_EXPIRY;
    }
    else if (type === Token_Types.OTP) {
        secret = process.env.JWT_OTP_SECRET;
        expiresIn = process.env.JWT_OTP_EXPIRY;
    }

    // Safety fallback check to prevent silent failures
    if (!secret) {
        throw new Error(`JWT Configuration Error: Secret for token type "${type}" is missing or undefined.`);
    }

    const token = jwt.sign(
        payload,
        secret,
        {
            expiresIn
        }
    );

    return token;
};

module.exports = {
    jwtSign,
    Token_Types
};
```

## File: utils/SendResponse.js
```javascript
const sendResponse = (
    res,
    statusCode,
    message,
    data = null
) => {
    res.status(statusCode).json({
        success: statusCode < 400,
        message,
        data,
    });
};

module.exports = sendResponse;
```

## File: utils/validateRequest.js
```javascript
const AppError = require('../utils/AppError');

const requireFields = (fields, reqBody) => {
    const missingFields = [];

    fields.forEach(field => {
        if (!reqBody[field]) {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 0) {
        throw new AppError(`Fields are missing : ${missingFields.join(', ')}`, 400)
    }
}
module.exports = requireFields;
```
