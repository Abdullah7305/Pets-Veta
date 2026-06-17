This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
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
- Files matching these patterns are excluded: node_modules, dist, build, .git
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
Backend/.gitignore
Backend/app/app-code.md
Backend/app/app.js
Backend/app/config/cloudinary.config.js
Backend/app/config/multer.config.js
Backend/app/config/prisma.js
Backend/app/config/redis.config.js
Backend/app/config/stripe.js
Backend/app/controllers/admin.controller.js
Backend/app/controllers/auth.controller.js
Backend/app/controllers/doctor.controller.js
Backend/app/controllers/doctorSchedule.controller.js
Backend/app/controllers/payment.controller.js
Backend/app/controllers/petOwner.controller.js
Backend/app/controllers/userdoctor.controller.js
Backend/app/middleware/auth.middleware.js
Backend/app/middleware/authorizeRole.middleware.js
Backend/app/middleware/globalErrorHandler.js
Backend/app/middleware/rateLimiter.js
Backend/app/middleware/zod.middleware.js
Backend/app/routes/admin.routes.js
Backend/app/routes/auth.routes.js
Backend/app/routes/doctor.routes.js
Backend/app/routes/payment.routes.js
Backend/app/routes/petOwner.routes.js
Backend/app/routes/userdoctor.route.js
Backend/app/schema/zod.schema.js
Backend/app/server.js
Backend/app/services/admin.services.js
Backend/app/services/auth.services.js
Backend/app/services/authCookies.services.js
Backend/app/services/authToken.services.js
Backend/app/services/doctor.services.js
Backend/app/services/doctorSchedule.service.js
Backend/app/services/payment.service.js
Backend/app/services/petOwner.services.js
Backend/app/services/userdoctor.services.js
Backend/app/utils/AppError.js
Backend/app/utils/auth.utils.js
Backend/app/utils/CatchAsync.js
Backend/app/utils/cloudinary.utils.js
Backend/app/utils/cookiesOption.js
Backend/app/utils/googleAuth.js
Backend/app/utils/jwt.js
Backend/app/utils/SendResponse.js
Backend/app/utils/validateRequest.js
Backend/package.json
Backend/prisma/dbClear.js
Backend/prisma/migrations/20260522163130_y/migration.sql
Backend/prisma/migrations/20260525234038_y/migration.sql
Backend/prisma/migrations/20260529162714_y/migration.sql
Backend/prisma/migrations/20260601125329_y/migration.sql
Backend/prisma/migrations/20260602141932_patient_appointment_type/migration.sql
Backend/prisma/migrations/20260602142224_remove_emergency_from_doctor_schedule/migration.sql
Backend/prisma/migrations/20260602163310_y/migration.sql
Backend/prisma/migrations/20260610154859_y/migration.sql
Backend/prisma/migrations/20260610160207/migration.sql
Backend/prisma/migrations/20260611134421/migration.sql
Backend/prisma/migrations/20260611135922/migration.sql
Backend/prisma/migrations/migration_lock.toml
Backend/prisma/schema.prisma
Backend/prisma/seed.js
Frontend/.gitignore
Frontend/.vite/deps/_metadata.json
Frontend/.vite/deps/package.json
Frontend/eslint.config.js
Frontend/index.html
Frontend/package.json
Frontend/public/doctor-pet.png
Frontend/public/forgot-password-img.png
Frontend/public/login-img.jpg
Frontend/public/reset-password-img.png
Frontend/public/verify-otp-img.png
Frontend/README.md
Frontend/src/app/App.tsx
Frontend/src/assets/icons/doctor.png
Frontend/src/assets/icons/Gemini_Generated_Image_34da4a34da4a34da-removebg-preview.png
Frontend/src/assets/icons/user-profile-1.jpg
Frontend/src/assets/icons/user-profile-2.jpg
Frontend/src/assets/shared/images/bannerImage.png
Frontend/src/assets/shared/images/dog2.jpeg
Frontend/src/assets/shared/images/femaleDoctor1.webp
Frontend/src/assets/shared/images/femaleDoctor2.webp
Frontend/src/assets/shared/images/femaleDoctor3.webp
Frontend/src/assets/shared/images/maleDoctor1.webp
Frontend/src/assets/shared/images/maleDoctor2.webp
Frontend/src/assets/shared/images/maleDoctor3.webp
Frontend/src/assets/shared/images/MarketPlace Background.jpg
Frontend/src/assets/shared/images/petDiagnosticService.webp
Frontend/src/assets/shared/images/petGenralService.webp
Frontend/src/assets/shared/images/petGroomingService.webp
Frontend/src/assets/shared/images/petServiceBanner.jpg
Frontend/src/assets/shared/images/petSurgicalService.webp
Frontend/src/assets/shared/images/petTraining&behavior.webp
Frontend/src/assets/shared/images/petVaccinationService.webp
Frontend/src/assets/shared/images/pexels-ten-brinke-photography-3877392-15488735-removebg-preview.png
Frontend/src/assets/shared/images/signup.webp
Frontend/src/assets/shared/images/testimonial1.webp
Frontend/src/assets/shared/images/testimonial2.webp
Frontend/src/assets/shared/images/testimonial3.webp
Frontend/src/features/About/about.route.tsx
Frontend/src/features/About/components/AboutCTA.tsx
Frontend/src/features/About/components/AboutHero.tsx
Frontend/src/features/About/components/AboutMisson.tsx
Frontend/src/features/About/components/AboutStats.tsx
Frontend/src/features/About/components/AboutValues.tsx
Frontend/src/features/About/pages/About.tsx
Frontend/src/features/Admin/admin.route.tsx
Frontend/src/features/Admin/apis/adminlogin.api.ts
Frontend/src/features/Admin/apis/doctorquery.api.ts
Frontend/src/features/Admin/components/AdminLogin.tsx
Frontend/src/features/Admin/components/AdminNavbar.tsx
Frontend/src/features/Admin/components/cards/StatsCard.tsx
Frontend/src/features/Admin/components/doctors/AdminSidebar.tsx
Frontend/src/features/Admin/components/doctors/ContactRow.tsx
Frontend/src/features/Admin/components/doctors/DoctorFilter.tsx
Frontend/src/features/Admin/components/doctors/DoctorNotFound.tsx
Frontend/src/features/Admin/components/doctors/DoctorRequestCard.tsx
Frontend/src/features/Admin/components/doctors/DoctorRequests.tsx
Frontend/src/features/Admin/components/doctors/DoctorStatusBadge.tsx
Frontend/src/features/Admin/components/doctors/InfoPill.tsx
Frontend/src/features/Admin/components/PaginationButton.tsx
Frontend/src/features/Admin/data/doctors.data.ts
Frontend/src/features/Admin/data/sidebar.data.ts
Frontend/src/features/Admin/data/stats.data.ts
Frontend/src/features/Admin/layout/AdminLayout.tsx
Frontend/src/features/Admin/layout/MobileSidebar.tsx
Frontend/src/features/Admin/layout/Sidebar.tsx
Frontend/src/features/Admin/pages/AdminDoctorPage.tsx
Frontend/src/features/Admin/pages/AdminLoginPage.tsx
Frontend/src/features/Admin/pages/DoctorRequestsPage.tsx
Frontend/src/features/Admin/schema/admin.login.schema.ts
Frontend/src/features/Admin/types/admin.types.ts
Frontend/src/features/AiAssistance/aiAssistant.route.tsx
Frontend/src/features/AiAssistance/components/AiChatBox.tsx
Frontend/src/features/AiAssistance/components/AiCTA.tsx
Frontend/src/features/AiAssistance/components/AiFeatures.tsx
Frontend/src/features/AiAssistance/components/AiHero.tsx
Frontend/src/features/AiAssistance/components/AiHowItWorks.tsx
Frontend/src/features/AiAssistance/pages/AiAssistantPage.tsx
Frontend/src/features/api interface/axios.interface.ts
Frontend/src/features/Appointment/apis/doctorProfile.api.ts
Frontend/src/features/Appointment/appointment.routes.tsx
Frontend/src/features/Appointment/pages/BookAppointmentPage.tsx
Frontend/src/features/Appointment/pages/DoctorProfilePage.tsx
Frontend/src/features/Auth/api/doctor.api.ts
Frontend/src/features/Auth/api/loginuser.api.ts
Frontend/src/features/Auth/api/petOwner.api.ts
Frontend/src/features/Auth/api/resetpassword.api.ts
Frontend/src/features/Auth/api/verifyemail.api.ts
Frontend/src/features/Auth/api/verifyotp.api.ts
Frontend/src/features/Auth/auth.route.tsx
Frontend/src/features/Auth/components/AuthSuccess.tsx
Frontend/src/features/Auth/components/doctor-form.tsx
Frontend/src/features/Auth/components/forgot-password-form.tsx
Frontend/src/features/Auth/components/login-component.tsx
Frontend/src/features/Auth/components/pets-owner.tsx
Frontend/src/features/Auth/components/reset-password-form.tsx
Frontend/src/features/Auth/components/verify-otp-form.tsx
Frontend/src/features/Auth/Context/auth.context.tsx
Frontend/src/features/Auth/hooks/authhook.ts
Frontend/src/features/Auth/hooks/useDoctorAccount.ts
Frontend/src/features/Auth/hooks/useForgotPassword.ts
Frontend/src/features/Auth/hooks/useLogin.ts
Frontend/src/features/Auth/hooks/useOtp.ts
Frontend/src/features/Auth/hooks/usePetOwnerAccount.ts
Frontend/src/features/Auth/hooks/useResendOtp.ts
Frontend/src/features/Auth/hooks/useResetPassword.ts
Frontend/src/features/Auth/pages/ContinueAs.tsx
Frontend/src/features/Auth/pages/doctor-signup.tsx
Frontend/src/features/Auth/pages/forgot-password.tsx
Frontend/src/features/Auth/pages/login.tsx
Frontend/src/features/Auth/pages/otp-verify.tsx
Frontend/src/features/Auth/pages/pet-owner-signup.tsx
Frontend/src/features/Auth/pages/reset-password.tsx
Frontend/src/features/Auth/pages/verify-otp.tsx
Frontend/src/features/Auth/Query/Providers/AuthQueryProvider.tsx
Frontend/src/features/Auth/schemas/doctor.schema.tsx
Frontend/src/features/Auth/schemas/forgot-password.schema.tsx
Frontend/src/features/Auth/schemas/login.schema.tsx
Frontend/src/features/Auth/schemas/petowner.schema.tsx
Frontend/src/features/Auth/schemas/reset-password.schema.tsx
Frontend/src/features/Auth/schemas/verify-otp.schema.tsx
Frontend/src/features/Contact/components/ContactCTA.tsx
Frontend/src/features/Contact/components/ContactFAQ.tsx
Frontend/src/features/Contact/components/ContactForm.tsx
Frontend/src/features/Contact/components/ContactHero.tsx
Frontend/src/features/Contact/components/ContactInfo.tsx
Frontend/src/features/Contact/contact.route.tsx
Frontend/src/features/Contact/pages/ContactPage.tsx
Frontend/src/features/Doctor/api/doctorAppointments.api.ts
Frontend/src/features/Doctor/api/doctorAvailabilityServices.ts
Frontend/src/features/Doctor/api/doctorServices.ts
Frontend/src/features/Doctor/components/AddSlotModal.tsx
Frontend/src/features/Doctor/components/DeleteModal.tsx
Frontend/src/features/Doctor/components/DoctorAvailability/DoctorAvailability.tsx
Frontend/src/features/Doctor/components/DoctorAvailability/index.ts
Frontend/src/features/Doctor/components/DoctorAvailability/ScheduleModal.tsx
Frontend/src/features/Doctor/components/DoctorAvailability/ScheduleTable.tsx
Frontend/src/features/Doctor/components/DoctorDashboard.tsx
Frontend/src/features/Doctor/components/DoctorHeader.tsx
Frontend/src/features/Doctor/components/DoctorProfileButton.tsx
Frontend/src/features/Doctor/components/DoctorSideBar.tsx
Frontend/src/features/Doctor/components/DoctorSkill.tsx
Frontend/src/features/Doctor/components/DoctorTypes.ts
Frontend/src/features/Doctor/components/PatientCard.tsx
Frontend/src/features/Doctor/components/QuickAction.tsx
Frontend/src/features/Doctor/components/ServiceTable.tsx
Frontend/src/features/Doctor/components/SlotsTable.tsx
Frontend/src/features/Doctor/components/StatsCard.tsx
Frontend/src/features/Doctor/components/StatusBadge.tsx
Frontend/src/features/Doctor/components/UpcomingRow.tsx
Frontend/src/features/Doctor/doctor.route.tsx
Frontend/src/features/Doctor/doctor.types.ts
Frontend/src/features/Doctor/Layout/doctor.layout.tsx
Frontend/src/features/Doctor/pages/DoctorAvailabilityPage.tsx
Frontend/src/features/Doctor/pages/DoctorDashboardPage.tsx
Frontend/src/features/Doctor/pages/DoctorProfilePage.tsx
Frontend/src/features/Doctor/pages/PatientsPage.tsx
Frontend/src/features/Doctor/pages/SkillPricing.tsx
Frontend/src/features/Doctorcart/apis/doctorProfile.api.ts
Frontend/src/features/Doctorcart/apis/getDoctors.api.ts
Frontend/src/features/Doctorcart/component/DoctorCard.tsx
Frontend/src/features/Doctorcart/component/DoctorProfile.tsx
Frontend/src/features/Doctorcart/component/DoctorsList.tsx
Frontend/src/features/Doctorcart/component/EditDoctorProfileForm.tsx
Frontend/src/features/Doctorcart/component/FilterSidebar.tsx
Frontend/src/features/Doctorcart/component/FindDoctor.tsx
Frontend/src/features/Doctorcart/component/PageHeader.tsx
Frontend/src/features/Doctorcart/component/Pagination.tsx
Frontend/src/features/Doctorcart/doctorAppointment.route.tsx
Frontend/src/features/Doctorcart/hooks/useDoctorProfile.ts
Frontend/src/features/Doctorcart/hooks/useGetDoctors.ts
Frontend/src/features/Doctorcart/pages/DoctorProfilePage.tsx
Frontend/src/features/Doctorcart/pages/EditDoctorProfilePage.tsx
Frontend/src/features/Doctorcart/pages/FindDoctorPage.tsx
Frontend/src/features/Doctorcart/schemas/doctorProfile.schema.ts
Frontend/src/features/Landing Page/components/About.tsx
Frontend/src/features/Landing Page/components/AIAssistance.tsx
Frontend/src/features/Landing Page/components/Banner.tsx
Frontend/src/features/Landing Page/components/ChooseUs.tsx
Frontend/src/features/Landing Page/components/CTA.tsx
Frontend/src/features/Landing Page/components/Popular.tsx
Frontend/src/features/Landing Page/components/Services.tsx
Frontend/src/features/Landing Page/components/Testimonials.tsx
Frontend/src/features/Landing Page/components/TopDoctor.tsx
Frontend/src/features/Landing Page/data/services.data.ts
Frontend/src/features/Landing Page/data/team.data.ts
Frontend/src/features/Landing Page/data/testimonial.data.ts
Frontend/src/features/Landing Page/pages/LandingPage.tsx
Frontend/src/features/Landing Page/routes.tsx
Frontend/src/features/Marketplace/components/MarketplaceBanner.tsx
Frontend/src/features/Marketplace/components/MarketplaceBenefits.tsx
Frontend/src/features/Marketplace/components/MarketplaceCategories.tsx
Frontend/src/features/Marketplace/components/MarketplaceCTA.tsx
Frontend/src/features/Marketplace/components/MarketplaceFilters.tsx
Frontend/src/features/Marketplace/components/MarketplaceHero.tsx
Frontend/src/features/Marketplace/components/ProductCard.tsx
Frontend/src/features/Marketplace/components/ProductsGrid.tsx
Frontend/src/features/Marketplace/data/marketplace.data.ts
Frontend/src/features/Marketplace/marketplace.route.tsx
Frontend/src/features/Marketplace/pages/MarketplacePage.tsx
Frontend/src/features/Payment/api/payment.api.ts
Frontend/src/features/Payment/components/PaymentSummaryCard.tsx
Frontend/src/features/Payment/page/AppointmentPaymentPage.tsx
Frontend/src/features/Payment/page/PaymentCancelPage.tsx
Frontend/src/features/Payment/page/PaymentSuccessPage.tsx
Frontend/src/features/Payment/payment.routes.tsx
Frontend/src/features/Pet Owner/pet details/apis/pet.api.ts
Frontend/src/features/Pet Owner/pet details/components/PetForm.tsx
Frontend/src/features/Pet Owner/pet details/components/PetIssueReportForm.tsx
Frontend/src/features/Pet Owner/pet details/pages/PetFormPage.tsx
Frontend/src/features/Pet Owner/pet details/pages/PetIssueReportPage.tsx
Frontend/src/features/Pet Owner/pet details/pets.route.tsx
Frontend/src/features/Pet Owner/pet details/schemas/pet.schema.ts
Frontend/src/features/Pet Owner/pet details/schemas/petIssueReport.schema.ts
Frontend/src/features/Pet Owner/pet profile/api/petOwnerProfile.api.ts
Frontend/src/features/Pet Owner/pet profile/api/pets.api.ts
Frontend/src/features/Pet Owner/pet profile/components/DeletePetModal.tsx
Frontend/src/features/Pet Owner/pet profile/components/MyPetsSection.tsx
Frontend/src/features/Pet Owner/pet profile/components/PetActionsMenu.tsx
Frontend/src/features/Pet Owner/pet profile/components/PetForm.tsx
Frontend/src/features/Pet Owner/pet profile/components/PetOwnerProfileHeader.tsx
Frontend/src/features/Pet Owner/pet profile/components/PetProfileCard.tsx
Frontend/src/features/Pet Owner/pet profile/pages/AddPetPage.tsx
Frontend/src/features/Pet Owner/pet profile/pages/EditPetPage.tsx
Frontend/src/features/Pet Owner/pet profile/pages/PetOwnerProfilePage.tsx
Frontend/src/features/Pet Owner/pet profile/petProfile.route.tsx
Frontend/src/features/Pet Owner/pet profile/schemas/pet.schema.ts
Frontend/src/features/Pet Owner/pet profile/types/petProfile.types.ts
Frontend/src/features/Pet Owner/SelectPet/components/AddNewPetCard.tsx
Frontend/src/features/Pet Owner/SelectPet/components/ExistingPetCard.tsx
Frontend/src/features/Pet Owner/SelectPet/components/ExistingPetsSection.tsx
Frontend/src/features/Pet Owner/SelectPet/components/SelectPetHeader.tsx
Frontend/src/features/Pet Owner/SelectPet/data/selectPet.data.ts
Frontend/src/features/Pet Owner/SelectPet/pages/SelectPetPage.tsx
Frontend/src/features/Pet Owner/SelectPet/selectPet.route.tsx
Frontend/src/features/Pet Owner/SelectPet/types/selectPet.types.ts
Frontend/src/features/PetOwnerDashboard/api/petOwnerDashboard.api.ts
Frontend/src/features/PetOwnerDashboard/components/DashboardBanner.tsx
Frontend/src/features/PetOwnerDashboard/components/DashboardHeader.tsx
Frontend/src/features/PetOwnerDashboard/components/DashboardSidebar.tsx
Frontend/src/features/PetOwnerDashboard/components/DashboardStats.tsx
Frontend/src/features/PetOwnerDashboard/components/MyPetsPreview.tsx
Frontend/src/features/PetOwnerDashboard/components/PetPreviewCard.tsx
Frontend/src/features/PetOwnerDashboard/components/QuickActions.tsx
Frontend/src/features/PetOwnerDashboard/components/UpcomingAppointments.tsx
Frontend/src/features/PetOwnerDashboard/data/dashboard.data.ts
Frontend/src/features/PetOwnerDashboard/pages/PetOwnerDashboardPage.tsx
Frontend/src/features/PetOwnerDashboard/petOwnerDashboard.route.tsx
Frontend/src/features/PetOwnerDashboard/types/petOwnerDashboard.types.ts
Frontend/src/features/Services/components/Banner.tsx
Frontend/src/features/Services/components/ServiceCard.tsx
Frontend/src/features/Services/components/ServicesCTA.tsx
Frontend/src/features/Services/components/ServicesGrid.tsx
Frontend/src/features/Services/components/ServicesHero.tsx
Frontend/src/features/Services/components/ServicesProcess.tsx
Frontend/src/features/Services/data/services.data.ts
Frontend/src/features/Services/index.tsx
Frontend/src/features/Services/pages/ServicesPage.tsx
Frontend/src/features/Services/service.route.tsx
Frontend/src/Global Provider/SmoothScroller.tsx
Frontend/src/index.css
Frontend/src/layout/landing.layout.tsx
Frontend/src/layout/service.layout.tsx
Frontend/src/main.tsx
Frontend/src/ProtectedRoutes/AdminProtectedRoutes.tsx
Frontend/src/ProtectedRoutes/DoctorProtectedRoutes.tsx
Frontend/src/ProtectedRoutes/PetOwnerProtectedRoutes.tsx
Frontend/src/ProtectedRoutes/ProtectedRoutes.tsx
Frontend/src/routes/routes.tsx
Frontend/src/shared/components/Button/Button.tsx
Frontend/src/shared/components/Button/index.ts
Frontend/src/shared/components/Card/Card.tsx
Frontend/src/shared/components/Footer/Footer.tsx
Frontend/src/shared/components/Input/index.ts
Frontend/src/shared/components/Input/Input.tsx
Frontend/src/shared/components/Logo/Logo.tsx
Frontend/src/shared/components/Navbar/navbar.data.ts
Frontend/src/shared/components/Navbar/Navbar.tsx
Frontend/src/shared/components/Notfound/Notfound.tsx
Frontend/src/shared/components/NotificationBell/NotificationBell.tsx
Frontend/src/shared/components/SearchBar/SearchBar.tsx
Frontend/src/shared/components/UserProfile/UserProfile.tsx
Frontend/src/shared/utils/toast.ts
Frontend/src/styles/doctor-signup.module.css
Frontend/src/styles/forgot-password.module.css
Frontend/src/styles/login.module.css
Frontend/src/styles/reset-password.module.css
Frontend/src/styles/verify-otp.module.css
Frontend/tsconfig.app.json
Frontend/tsconfig.json
Frontend/tsconfig.node.json
Frontend/vite.config.ts
```

# Files

## File: Backend/.gitignore
````
node_modules
.env
/generated/prisma
````

## File: Backend/app/app-code.md
````markdown
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
````

## File: Backend/app/config/cloudinary.config.js
````javascript
// const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// module.exports = cloudinary;
````

## File: Backend/app/config/multer.config.js
````javascript
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
````

## File: Backend/app/config/prisma.js
````javascript
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

module.exports = { default: prisma };
````

## File: Backend/app/config/redis.config.js
````javascript
const { createClient } = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
})


redisClient.on('connect', () => {
    console.log("Redis Connected")
})

redisClient.on('error', (err) => {
    console.error("Error is Redi Connection", err)
});

(async () => {
    try {
        await redisClient.connect();

    } catch (error) {
        console.error("Failed To Connect to Redis", error)
    }
})()


module.exports = redisClient;
````

## File: Backend/app/middleware/authorizeRole.middleware.js
````javascript
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
````

## File: Backend/app/middleware/globalErrorHandler.js
````javascript
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
````

## File: Backend/app/middleware/rateLimiter.js
````javascript
const redisClient = require('../config/redis.config');
const { RedisStore } = require('rate-limit-redis');
const { rateLimit } = require('express-rate-limit');

const authStore = new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: 'rl:auth:',
});

const adminStore = new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: 'rl:admin:'
});

const petOwnerStore = new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: 'rl:petOwner:'
});

const globalUserStore = new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: 'rl:global:'
})

const doctorStore = new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: 'rl:doctor:'
})


const authLimiter = rateLimit({
    store: authStore,
    windowMs: 5 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        status: 429,
        error: "To many Auth attempts"
    }
});

const adminLimiter = rateLimit({
    store: adminStore,
    windowMs: 10 * 60 * 1000,
    limit: 50,
    standardHeaders: false,
    message: {
        status: 429,
        error: "Admin resource limit reaached try again after some minutes"
    }
})

const petOwnerLimiter = rateLimit({
    store: petOwnerStore,
    windowMs: 10 * 60 * 1000,
    limit: 50,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        status: 429,
        error: "Resource limite Reach Wait for few second"
    }
});

const globalUserLimiter = rateLimit({
    store: globalUserStore,
    windowMs: 10 * 60 * 1000,
    limit: 150,
    legacyHeaders: false,
    standardHeaders: 'draft-8',
    message: {
        status: 429,
        error: "Too many request from this device Please slow down"
    }
});

const doctorLimiter = rateLimit({
    limit: 100,
    windowMs: 10 * 60 * 1000,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        status: 429,
        error: "Too many requests Please wait a minute only then proceed"
    }
})

module.exports = {
    adminLimiter,
    globalUserLimiter,
    authLimiter,
    petOwnerLimiter,
    doctorLimiter
}
````

## File: Backend/app/middleware/zod.middleware.js
````javascript
const zod = require('zod');

const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query
        });

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Zod Validate Failed",
                errors: result.error.flatten().fieldErrors,
            });
        }
        req.validated = result.data;
        next();
    };
};

module.exports = { validateRequest };
````

## File: Backend/app/schema/zod.schema.js
````javascript
const z = require('zod');

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

const loginSchema = z.object({
    body: z.object({
        email: z.string({ required_error: "Email and password required" })
            .trim()
            .email("Invalid email format"),
        password: z.string({ required_error: "Password is required" })
            .min(8, "Password must be 8 character long")
    }).strict()
});


const petOwnerSchema = z.object({
    body: z.object({
        fullName: z
            .string()
            .min(2, "Full name must be at least 2 years/characters long")
            .max(50, "Full name cannot exceed 50 characters"),

        username: z
            .string()
            .min(3, "Username must be at least 3 characters long")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

        email: z
            .email("Please enter a valid email address"),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters long"),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Highlights the error on the confirmPassword input field
    })
})

const doctorSchema = z.object({
    body: z.object({
        fullName: z.string().min(2, "Full name must be at least 2 characters"),
        username: z.string().min(3, "Username must be at least 3 characters"),
        email: z.string().email("Please enter a valid email address"),
        phone: z.string().min(10, "Please enter a valid phone number"),

        experience: z.coerce
            .number({ error: "Experience must be a number" })
            .min(0, "Experience cannot be negative"),

        medicalLicenseNumber: z.string().min(3, "License number is required"),
        education: z.string().min(2, "Education/Qualifications are required"),
        address: z.string().min(5, "Please enter a complete address"),
        specialization: z.string().min(1, "Please select a specialization"),
        fees: z.string().min(1, "Enter The Checkup Fees"),




        document: z
            .any()
            // 1. Check if the file exists
            .refine((file) => !!file, "Document is required.")

            // 2. Check the size directly on the parsed object
            .refine(
                (file) => file?.size <= MAX_FILE_SIZE,
                "Max file size is 5MB."
            )

            // 3. Check the MIME type (Backend parsers usually use 'mimetype' instead of 'type')
            .refine(
                (file) => ACCEPTED_FILE_TYPES.includes(file?.mimetype),
                "Only .jpg, .jpeg, .png and .pdf formats are supported."
            ),

        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Please confirm your password"),
    })

})

const resetPasswordSchema = z.object({
    body: z
        .object({
            password: z.string().min(6, "Password is required"),

            confirmPassword: z.string().min(6, "Confirm password is required"),
        })

        .refine(
            (data) => data.password === data.confirmPassword,

            {
                message: "Passwords do not match",

                path: ["confirmPassword"],
            },
        )
});

const forgotPasswordSchema = z.object({
    body: z.object({
        email: z
            .string()
            .min(1, "Email is required.")
            .email("Please enter a valid email address."),
    })
})


const verifyPasswordSchema = z.object({
    body: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digists")
})

module.exports = {
    loginSchema,
    petOwnerSchema,
    doctorSchema,
    resetPasswordSchema,
    forgotPasswordSchema,
    verifyPasswordSchema
}
````

## File: Backend/app/server.js
````javascript
const app = require('./app');

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server is running");
})
````

## File: Backend/app/services/authCookies.services.js
````javascript

````

## File: Backend/app/services/authToken.services.js
````javascript
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
````

## File: Backend/app/utils/AppError.js
````javascript
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
````

## File: Backend/app/utils/CatchAsync.js
````javascript
function catchAsync(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next)
    }
}

module.exports = catchAsync;
````

## File: Backend/app/utils/googleAuth.js
````javascript
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
````

## File: Backend/app/utils/jwt.js
````javascript
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
````

## File: Backend/app/utils/SendResponse.js
````javascript
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
````

## File: Backend/app/utils/validateRequest.js
````javascript
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
````

## File: Backend/prisma/dbClear.js
````javascript
// prisma/clear.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearDatabase() {
    console.log("🧼 Starting database wipe...");
    try {
        // 1. Delete dependent child records first to respect Foreign Key Constraints
        console.log("⏳ Removing child records (Doctors, Certificates, Roles)...");
        await prisma.doctor.deleteMany({});
        await prisma.doctorCertificate.deleteMany({});
        await prisma.userRole.deleteMany({});

        // 2. Delete parent records last
        console.log("⏳ Removing parent records (Users)...");
        await prisma.user.deleteMany({});

        console.log("🗑️ Database wiped clean successfully!");
    } catch (error) {
        console.error("❌ Error while clearing database:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

clearDatabase();
````

## File: Backend/prisma/migrations/20260522163130_y/migration.sql
````sql
-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "phone" TEXT NOT NULL DEFAULT '',
    "profileImageUrl" TEXT NOT NULL DEFAULT 'Enter your Image',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "refreshToken" TEXT,
    "otp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT false,
    "education" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "degreeLicenseUrl" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "fees" INTEGER NOT NULL,
    "isVerified" "VerificationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_fullName_idx" ON "User"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_userId_key" ON "Doctor"("userId");

-- CreateIndex
CREATE INDEX "Doctor_userId_idx" ON "Doctor"("userId");

-- CreateIndex
CREATE INDEX "Doctor_specialization_idx" ON "Doctor"("specialization");

-- CreateIndex
CREATE INDEX "Doctor_fees_idx" ON "Doctor"("fees");

-- CreateIndex
CREATE INDEX "Doctor_isAvailable_idx" ON "Doctor"("isAvailable");

-- CreateIndex
CREATE INDEX "Doctor_specialization_fees_isAvailable_idx" ON "Doctor"("specialization", "fees", "isAvailable");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_key" ON "UserRole"("userId");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
````

## File: Backend/prisma/migrations/20260525234038_y/migration.sql
````sql
/*
  Warnings:

  - You are about to drop the column `degreeLicenseUrl` on the `Doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "degreeLicenseUrl";

-- CreateTable
CREATE TABLE "DoctorCertificate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "publicUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,

    CONSTRAINT "DoctorCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DoctorCertificate_userId_key" ON "DoctorCertificate"("userId");

-- AddForeignKey
ALTER TABLE "DoctorCertificate" ADD CONSTRAINT "DoctorCertificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
````

## File: Backend/prisma/migrations/20260529162714_y/migration.sql
````sql
-- CreateEnum
CREATE TYPE "WeekDays" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "PatientAppointmentType" AS ENUM ('EMERGENCY', 'NORMAL_CHECKUP');

-- CreateEnum
CREATE TYPE "PetCategory" AS ENUM ('DOG', 'CAT', 'REPTILE', 'OTHER');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'COMPLETED');

-- CreateTable
CREATE TABLE "DoctorSchedule" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "day" "WeekDays" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isEmergency" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DoctorSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "petOwnerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" DECIMAL(10,2) NOT NULL,
    "breed" TEXT NOT NULL,
    "category" "PetCategory" NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetIssueReport" (
    "id" TEXT NOT NULL,
    "petOwnerId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "issue" TEXT NOT NULL,
    "appointmentType" "PatientAppointmentType" NOT NULL,

    CONSTRAINT "PetIssueReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "petIssueReportId" TEXT NOT NULL,
    "fees" INTEGER NOT NULL,
    "checkupTime" TIMESTAMP(3) NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DoctorSchedule" ADD CONSTRAINT "DoctorSchedule_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_petOwnerId_fkey" FOREIGN KEY ("petOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetIssueReport" ADD CONSTRAINT "PetIssueReport_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetIssueReport" ADD CONSTRAINT "PetIssueReport_petOwnerId_fkey" FOREIGN KEY ("petOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_petIssueReportId_fkey" FOREIGN KEY ("petIssueReportId") REFERENCES "PetIssueReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
````

## File: Backend/prisma/migrations/20260601125329_y/migration.sql
````sql
-- CreateTable
CREATE TABLE "DoctorSkills" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "DoctorSkills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DoctorSkills" ADD CONSTRAINT "DoctorSkills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
````

## File: Backend/prisma/migrations/20260602141932_patient_appointment_type/migration.sql
````sql
/*
  Warnings:

  - The values [EMERGENCY,NORMAL_CHECKUP] on the enum `PatientAppointmentType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `isEmergency` on the `DoctorSchedule` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PatientAppointmentType_new" AS ENUM ('ONLINE', 'PHYSICAL');
ALTER TABLE "PetIssueReport" ALTER COLUMN "appointmentType" TYPE "PatientAppointmentType_new" USING ("appointmentType"::text::"PatientAppointmentType_new");
ALTER TYPE "PatientAppointmentType" RENAME TO "PatientAppointmentType_old";
ALTER TYPE "PatientAppointmentType_new" RENAME TO "PatientAppointmentType";
DROP TYPE "public"."PatientAppointmentType_old";
COMMIT;

-- AlterTable
ALTER TABLE "DoctorSchedule" DROP COLUMN "isEmergency";
````

## File: Backend/prisma/migrations/20260602142224_remove_emergency_from_doctor_schedule/migration.sql
````sql
/*
  Warnings:

  - You are about to drop the column `appointmentType` on the `PetIssueReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PetIssueReport" DROP COLUMN "appointmentType";

-- DropEnum
DROP TYPE "PatientAppointmentType";
````

## File: Backend/prisma/migrations/20260602163310_y/migration.sql
````sql
/*
  Warnings:

  - You are about to drop the `DoctorSkills` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `DoctorSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DoctorSkills" DROP CONSTRAINT "DoctorSkills_userId_fkey";

-- AlterTable
ALTER TABLE "DoctorSchedule" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "DoctorSkills";

-- CreateTable
CREATE TABLE "DoctorSkill" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "DoctorSkill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DoctorSkill" ADD CONSTRAINT "DoctorSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
````

## File: Backend/prisma/migrations/20260610154859_y/migration.sql
````sql
-- CreateEnum
CREATE TYPE "AppointmentPayment" AS ENUM ('PENDING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AppointmentStatus" ADD VALUE 'CONFIRMED';
ALTER TYPE "AppointmentStatus" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "paymentStatus" "AppointmentPayment" NOT NULL DEFAULT 'PENDING';
````

## File: Backend/prisma/migrations/20260610160207/migration.sql
````sql
/*
  Warnings:

  - The `paymentStatus` column on the `Appointment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'SUCCEEDED';

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "AppointmentStatus" NOT NULL DEFAULT 'PENDING';
````

## File: Backend/prisma/migrations/20260611134421/migration.sql
````sql
/*
  Warnings:

  - The `paymentStatus` column on the `Appointment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `day` on the `DoctorSchedule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[scheduleId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scheduleId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "scheduleId" TEXT NOT NULL,
ADD COLUMN     "stripeSessionId" TEXT,
DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "DoctorSchedule" DROP COLUMN "day",
ADD COLUMN     "isBooked" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_scheduleId_key" ON "Appointment"("scheduleId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "DoctorSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
````

## File: Backend/prisma/migrations/20260611135922/migration.sql
````sql
/*
  Warnings:

  - A unique constraint covering the columns `[doctorId,startTime]` on the table `DoctorSchedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DoctorSchedule_doctorId_startTime_key" ON "DoctorSchedule"("doctorId", "startTime");
````

## File: Backend/prisma/migrations/migration_lock.toml
````toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"
````

## File: Frontend/.gitignore
````
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# enviroment file
.env
````

## File: Frontend/.vite/deps/_metadata.json
````json
{
  "hash": "f0ab971a",
  "configHash": "9b75550c",
  "lockfileHash": "e3b0c442",
  "browserHash": "b8f5d10f",
  "optimized": {},
  "chunks": {}
}
````

## File: Frontend/.vite/deps/package.json
````json
{
  "type": "module"
}
````

## File: Frontend/eslint.config.js
````javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
````

## File: Frontend/README.md
````markdown
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
````

## File: Frontend/src/features/About/about.route.tsx
````typescript
import About from "./pages/About";

export const aboutRoutes = [
  {
    path: "about",
    element: <About />,
  },
];
````

## File: Frontend/src/features/About/components/AboutMisson.tsx
````typescript
import {
  CalendarCheck,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Expert Doctors",
    text: "Experienced and verified veterinarians you can trust for your pet’s health.",
    icon: Stethoscope,
    bg: "bg-[#D4E2E0]/70",
    color: "text-[#078b91]",
  },
  {
    id: 2,
    title: "Easy Appointments",
    text: "Book appointments online in just a few clicks. Quick, easy and convenient.",
    icon: CalendarCheck,
    bg: "bg-[#F9C5A8]/50",
    color: "text-[#F28B5B]",
  },
  {
    id: 3,
    title: "Complete Care",
    text: "From checkups to health advice, we provide complete care for pets.",
    icon: HeartPulse,
    bg: "bg-[#D4E2E0]/70",
    color: "text-[#078b91]",
  },
  {
    id: 4,
    title: "Safe & Reliable",
    text: "We follow high standards of care and ensure a safe experience for your pets.",
    icon: ShieldCheck,
    bg: "bg-[#F9C5A8]/50",
    color: "text-[#F28B5B]",
  },
];

const AboutIntro = () => {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-widest text-[#078b91]">
          Who We Are
        </p>

        <h2 className="mt-4 text-3xl font-black leading-tight text-[#071B4D] md:text-[2.2rem]">
          A Better Way To Care For Your Pets
        </h2>

        <p className="mt-5 text-base leading-8 text-slate-600">
          We understand that pets are family. That is why we created PawCare —
          to help pet owners find trusted veterinary doctors, book appointments
          online, and get the best care for their furry companions.
        </p>

        <p className="mt-4 text-base leading-8 text-slate-600">
          From regular checkups to special treatments, our platform is here to
          make pet healthcare simple, reliable, and stress-free.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {features.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
              >
                <Icon size={26} />
              </div>

              <h3 className="mt-5 text-lg font-black text-[#071B4D]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutIntro;
````

## File: Frontend/src/features/About/components/AboutValues.tsx
````typescript
import { ArrowRight, CalendarCheck, PawPrint, UsersRound } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Choose Doctor",
    text: "Browse through our list of experienced veterinary doctors and select the best one for your pet.",
    icon: UsersRound,
    bg: "bg-[#D4E2E0]/70",
    color: "text-[#078b91]",
  },
  {
    id: "02",
    title: "Book Time Slot",
    text: "Pick your preferred date and time based on the doctor’s availability.",
    icon: CalendarCheck,
    bg: "bg-[#F9C5A8]/60",
    color: "text-[#F28B5B]",
  },
  {
    id: "03",
    title: "Visit & Get Care",
    text: "Visit the clinic, get expert care and keep your pet healthy and happy.",
    icon: PawPrint,
    bg: "bg-[#D4E2E0]/70",
    color: "text-[#078b91]",
  },
];

const AboutSteps = () => {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16">
      <div className="mb-8 text-center">
        <p className="text-sm font-extrabold uppercase tracking-widest text-[#078b91]">
          How It Works
        </p>

        <h2 className="mt-4 text-3xl font-black text-[#071B4D] md:text-[2.2rem]">
          Simple Steps For Pet Doctor Appointment
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">
          We keep the appointment process simple so pet owners can get help
          quickly.
        </p>
      </div>

      <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <>
              <div
                key={step.id}
                className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${step.bg} ${step.color}`}
                  >
                    <Icon size={26} />
                  </div>

                  <div>
                    <span className="text-lg font-black text-[#078b91]">
                      {step.id}
                    </span>
                    <h3 className="mt-1 text-lg font-black text-[#071B4D]">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {step.text}
                </p>
              </div>

              {index !== steps.length - 1 && (
                <div
                  key={`${step.id}-arrow`}
                  className="hidden text-[#078b91]/60 md:block"
                >
                    <ArrowRight size={22} />
                </div>
              )}
            </>
          );
        })}
      </div>
    </section>
  );
};

export default AboutSteps;
````

## File: Frontend/src/features/Admin/components/doctors/ContactRow.tsx
````typescript
export const ContactRow = ({
    icon,
    text,
    className = "",
}: {
    icon: React.ReactNode;
    text: string;
    className?: string;
}) => {
    return (
        <div
            className={`flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 ${className}`}
        >
            <span className="shrink-0 text-[#718198]">{icon}</span>
            <span className="min-w-0 truncate font-semibold">{text}</span>
        </div>
    );
};
````

## File: Frontend/src/features/Admin/components/doctors/DoctorNotFound.tsx
````typescript
import { memo } from 'react';
import { Stethoscope } from 'lucide-react';

const DoctorNotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-[350px] px-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50">
                    <Stethoscope
                        size={32}
                        className="text-[#06777D]"
                    />
                </div>

                <h2 className="mt-5 text-2xl font-bold text-gray-800">
                    No Doctors Found
                </h2>

                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    We couldn’t find any doctors matching your search or filter.
                    Try changing the filter or search term.
                </p>

            </div>
        </div>
    );
};

export default memo(DoctorNotFound);
````

## File: Frontend/src/features/Admin/components/doctors/InfoPill.tsx
````typescript
export const InfoPill = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
    return (
        <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-[#405169]">
            <span className="shrink-0 text-[#718198]">{icon}</span>
            <span className="truncate">{text}</span>
        </span>
    );
};
````

## File: Frontend/src/features/Admin/components/PaginationButton.tsx
````typescript
export const PaginationButton = ({
    children,
    ariaLabel,
    onClick,    
    disabled,   
}: {
    children: React.ReactNode;
    ariaLabel: string;
    onClick?: () => void;   
    disabled?: boolean;     
}) => {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            onClick={onClick}       
            disabled={disabled}     
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#8a99aa] shadow-sm transition hover:text-[#078b91] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-[#8a99aa]" // 👈 7. Visual guardrails
        >
            {children}
        </button>
    );
};
````

## File: Frontend/src/features/Admin/data/doctors.data.ts
````typescript
export const doctorsData = [
  {
    id: 1,
    name: "Dr. Ali Raza",
    specialist: "Pet Surgery",
    experience: "8 Years",
    email: "ali@gmail.com",
    phone: "+92 300000000",
    status: "Approved",
    image: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Dr. Sara Khan",
    specialist: "Pet Nutrition",
    experience: "5 Years",
    email: "sara@gmail.com",
    phone: "+92 311111111",
    status: "Pending",
    image: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Dr. Ahmed",
    specialist: "Dermatology",
    experience: "4 Years",
    email: "ahmed@gmail.com",
    phone: "+92 322222222",
    status: "Rejected",
    image: "https://i.pravatar.cc/40?img=3",
  },
];
````

## File: Frontend/src/features/Admin/data/stats.data.ts
````typescript
import {
  FaUserMd,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export const statsData = [
  {
    id: 1,
    title: "Total Doctors",
    total: "120",
    subtitle: "Available Doctors",
    color: "bg-cyan-600",
    icon: FaUserMd,
  },

  {
    id: 2,
    title: "Pending Approval",
    total: "15",
    subtitle: "Waiting Doctors",
    color: "bg-yellow-500",
    icon: FaClock,
  },

  {
    id: 3,
    title: "Approved Doctors",
    total: "95",
    subtitle: "Verified Doctors",
    color: "bg-green-500",
    icon: FaCheckCircle,
  },

  {
    id: 4,
    title: "Rejected Doctors",
    total: "10",
    subtitle: "Rejected Accounts",
    color: "bg-red-500",
    icon: FaTimesCircle,
  },
];
````

## File: Frontend/src/features/Admin/pages/AdminLoginPage.tsx
````typescript
import AdminLogin from "../components/AdminLogin";

const AdminLoginPage = () => {
  return <AdminLogin />;
};

export default AdminLoginPage;
````

## File: Frontend/src/features/Admin/pages/DoctorRequestsPage.tsx
````typescript
import DoctorRequests from "../components/doctors/DoctorRequests";

const DoctorRequestsPage = () => {
  return <DoctorRequests />;
};

export default DoctorRequestsPage;
````

## File: Frontend/src/features/Admin/schema/admin.login.schema.ts
````typescript
import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email required ")
    .email("Valid email enter "),

  password: z
    .string()
    .min(1, "Password required ")
    .min(6, "Password must be 6 characters "),
});

export type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;
````

## File: Frontend/src/features/Admin/types/admin.types.ts
````typescript
export interface SidebarItemType {
  id: number;
  title: string;
  icon: React.ElementType;
}

export interface StatsCardType {
  id: number;
  title: string;
  total: number;
  subtitle: string;
  color: string;
  icon: React.ElementType;
}

export interface DoctorType {
  id: number;
  name: string;
  specialist: string;
  experience: string;
  email: string;
  phone: string;
  status: string;
  image: string;
}
````

## File: Frontend/src/features/AiAssistance/aiAssistant.route.tsx
````typescript
import AiAssistantPage from "./pages/AiAssistantPage";

export const aiAssistantRoutes = [
    {
        path: "/ai-assistant",
        element: <AiAssistantPage />,
    },
];
````

## File: Frontend/src/features/AiAssistance/components/AiChatBox.tsx
````typescript
import { useState } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaPaw } from "react-icons/fa";

import Button from "../../../shared/components/Button";

type Message = {
    id: number;
    sender: "user" | "ai";
    text: string;
};

const AiChatBox = () => {
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: "ai",
            text: "Hello! I am your PetsVeta AI Assistant. Tell me your pet symptoms and I will guide you.",
        },
    ]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            sender: "user",
            text: message,
        };

        const aiReply: Message = {
            id: Date.now() + 1,
            sender: "ai",
            text: "Thanks for sharing. Based on the symptoms, please monitor your pet closely and consult a verified veterinary doctor if the issue continues.",
        };

        setMessages((prev) => [...prev, userMessage, aiReply]);
        setMessage("");
    };

    return (
        <section className="bg-white px-5 py-16 lg:px-16">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px]">
                <div className="rounded-3xl bg-[#f5fbff] p-4 shadow-[0_10px_35px_rgba(15,23,42,0.08)] md:p-6">
                    <div className="mb-5 flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm">
                        <div>
                            <h2 className="text-2xl font-extrabold text-[#07182c]">
                                Ask AI Assistant
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Describe your pet symptoms or care question.
                            </p>
                        </div>

                        <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-[#eefafa] text-xl text-[#009f9d] sm:flex">
                            <FaRobot />
                        </div>
                    </div>

                    <div className="h-[420px] space-y-4 overflow-y-auto rounded-3xl bg-white p-5">
                        {messages.map((item) => (
                            <div
                                key={item.id}
                                className={`flex ${item.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`flex max-w-[85%] gap-3 rounded-3xl p-4 ${item.sender === "user"
                                        ? "bg-[#07182c] text-white"
                                        : "bg-[#eefafa] text-[#07182c]"
                                        }`}
                                >
                                    <div
                                        className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${item.sender === "user"
                                            ? "bg-white/15"
                                            : "bg-white text-[#009f9d]"
                                            }`}
                                    >
                                        {item.sender === "user" ? <FaUser /> : <FaRobot />}
                                    </div>

                                    <p className="text-sm leading-6">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 grid gap-3 rounded-3xl bg-white p-4 md:grid-cols-[1fr_auto]">
                        <textarea
                            rows={2}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Example: My dog is vomiting and not eating..."
                            className="resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#009f9d] focus:ring-2 focus:ring-[#009f9d]/20"
                        />

                        <Button
                            type="button"
                            onClick={handleSendMessage}
                            className="flex items-center justify-center gap-2"
                        >
                            <FaPaperPlane />
                            Send
                        </Button>
                    </div>
                </div>

                <aside className="space-y-5">
                    <div className="rounded-3xl bg-gradient-to-br from-[#bdf0ee] to-[#fff3ec] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-[#009f9d]">
                            <FaPaw />
                        </div>

                        <h3 className="text-2xl font-extrabold text-[#07182c]">
                            Quick Symptom Guide
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            AI can guide you, but serious symptoms should always be checked by
                            a verified doctor.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                        <h3 className="text-lg font-extrabold text-[#07182c]">
                            Try asking:
                        </h3>

                        <div className="mt-4 space-y-3">
                            {[
                                "My cat is not eating",
                                "My dog is vomiting",
                                "My pet has skin allergy",
                                "Which doctor should I visit?",
                            ].map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setMessage(item)}
                                    className="w-full rounded-2xl bg-[#f5fbff] px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-[#eefafa] hover:text-[#009f9d]"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-[#07182c] p-6 text-white">
                        <h3 className="text-lg font-extrabold">
                            Emergency Reminder
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-white/75">
                            If your pet has breathing problems, bleeding, seizures, poisoning,
                            or extreme weakness, contact a vet immediately.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default AiChatBox;
````

## File: Frontend/src/features/AiAssistance/components/AiCTA.tsx
````typescript
import { Link } from "react-router-dom";
import Button from "../../../shared/components/Button";

const AiCTA = () => {
    return (
        <section className="bg-white px-5 pb-16 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-[36px] bg-gradient-to-br from-[#bdf0ee] via-[#f5fbff] to-[#fff3ec] p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.10)] md:p-12">
                <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
                    Need expert help after AI guidance?
                </h2>

                <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
                    AI can guide you, but verified veterinary doctors can provide proper
                    diagnosis and treatment for your pet.
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-4">
                    <Link to="/doctors">
                        <Button>Find Doctors</Button>
                    </Link>

                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center rounded-xl border border-[#009f9d] px-5 py-3 text-sm font-bold text-[#009f9d] transition hover:bg-[#eefafa]"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AiCTA;
````

## File: Frontend/src/features/AiAssistance/components/AiFeatures.tsx
````typescript
import {
    FaBrain,
    FaClock,
    FaNotesMedical,
    FaShieldAlt,
} from "react-icons/fa";

const features = [
    {
        icon: <FaBrain />,
        title: "Smart Symptom Guidance",
        text: "Describe your pet’s symptoms and get quick AI-powered guidance for the next best step.",
    },
    {
        icon: <FaNotesMedical />,
        title: "Care Suggestions",
        text: "Get basic care suggestions related to feeding, grooming, wellness and common pet issues.",
    },
    {
        icon: <FaShieldAlt />,
        title: "Safe Recommendations",
        text: "AI guidance is designed to support decisions, not replace professional veterinary care.",
    },
    {
        icon: <FaClock />,
        title: "Instant Support",
        text: "Ask pet-care questions anytime and get fast responses before booking a doctor.",
    },
];

const AiFeatures = () => {
    return (
        <section className="bg-[#f5fbff] px-5 py-16 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 max-w-2xl">
                    <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
                        What can{" "}
                        <span className="text-[#009f9d]">AI Assistant</span> help with?
                    </h2>

                    <p className="mt-3 leading-7 text-slate-600">
                        Use AI assistance for quick pet-care direction before choosing the
                        right doctor or service.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eefafa] text-xl text-[#009f9d]">
                                {item.icon}
                            </div>

                            <h3 className="text-lg font-extrabold text-[#07182c]">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AiFeatures;
````

## File: Frontend/src/features/AiAssistance/components/AiHero.tsx
````typescript
import {
    FaBrain,
    FaPaw,
    FaRobot,
    FaShieldAlt,
} from "react-icons/fa";

const AiHero = () => {
    return (
        <section className="bg-gradient-to-br from-[#f5fbff] via-white to-[#d9f7f6] px-5 py-16 lg:px-16">
            <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
                <div>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#009f9d] shadow-sm">
                        <FaRobot />
                        AI Pet Assistant
                    </div>

                    <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-[#07182c] md:text-5xl">
                        Smart AI assistance for your pet’s health and care.
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                        Describe symptoms, ask pet-care questions and get instant AI-powered
                        guidance for better pet wellness and faster decision making.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07182c] shadow-sm">
                            <FaBrain className="text-[#009f9d]" />
                            Smart Suggestions
                        </span>

                        <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07182c] shadow-sm">
                            <FaShieldAlt className="text-[#009f9d]" />
                            Safe Guidance
                        </span>

                        <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07182c] shadow-sm">
                            <FaPaw className="text-[#009f9d]" />
                            Pet Focused
                        </span>
                    </div>
                </div>

                <div className="rounded-[40px] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                    <div className="rounded-[32px] bg-gradient-to-br from-[#bdf0ee] to-[#fff3ec] p-6">
                        <div className="rounded-3xl bg-white p-5 shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eefafa] text-xl text-[#009f9d]">
                                    <FaRobot />
                                </div>

                                <div>
                                    <h3 className="text-lg font-extrabold text-[#07182c]">
                                        AI Assistant
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-slate-600">
                                        Tell me your pet symptoms.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 rounded-3xl bg-[#07182c] p-5 text-white shadow-sm">
                            <p className="text-sm leading-7">
                                My cat is not eating and feels weak.
                            </p>
                        </div>

                        <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
                            <p className="text-sm leading-7 text-slate-600">
                                Your pet may have digestion or infection-related issues. We
                                recommend consulting a verified veterinary physician.
                            </p>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#009f9d] shadow-sm">
                                Pet Symptoms
                            </span>

                            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#009f9d] shadow-sm">
                                AI Suggestions
                            </span>

                            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#009f9d] shadow-sm">
                                Smart Guidance
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AiHero;
````

## File: Frontend/src/features/AiAssistance/components/AiHowItWorks.tsx
````typescript
import { FaCommentMedical, FaRobot, FaUserMd } from "react-icons/fa";

const steps = [
    {
        icon: <FaCommentMedical />,
        title: "Describe Symptoms",
        text: "Tell AI what problem your pet is facing, such as vomiting, weakness, allergy or appetite loss.",
    },
    {
        icon: <FaRobot />,
        title: "Get AI Guidance",
        text: "AI gives basic guidance, possible care direction and suggests what type of doctor may be suitable.",
    },
    {
        icon: <FaUserMd />,
        title: "Book a Doctor",
        text: "If needed, continue to verified veterinary doctors and book an appointment easily.",
    },
];

const AiHowItWorks = () => {
    return (
        <section className="bg-white px-5 py-16 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
                        How It <span className="text-[#009f9d]">Works</span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
                        A simple pet-care flow from symptoms to trusted veterinary support.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <div
                            key={step.title}
                            className="relative rounded-3xl bg-[#f5fbff] p-6 text-center"
                        >
                            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-[#009f9d] shadow-sm">
                                {step.icon}
                            </div>

                            <span className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#009f9d]">
                                Step {index + 1}
                            </span>

                            <h3 className="text-xl font-extrabold text-[#07182c]">
                                {step.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AiHowItWorks;
````

## File: Frontend/src/features/AiAssistance/pages/AiAssistantPage.tsx
````typescript
import AiHero from "../components/AiHero";
import AiChatBox from "../components/AiChatBox";
import AiFeatures from "../components/AiFeatures";
import AiHowItWorks from "../components/AiHowItWorks";
import AiCTA from "../components/AiCTA";

const AiAssistantPage = () => {
    return (
        <>
            <AiHero />
            <AiChatBox />
            <AiFeatures />
            <AiHowItWorks />
            <AiCTA />
        </>
    );
};

export default AiAssistantPage;
````

## File: Frontend/src/features/Auth/components/AuthSuccess.tsx
````typescript
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUserSession = async () => {
            try {

                const response = await axios.get('http://localhost:8000/api/v1/auth/me', {
                    withCredentials: true
                });

                if (response.data.success) {

                    navigate('/');
                }
            } catch (error) {
                console.error("Session verification failed", error);
                navigate('/login');
            }
        };

        verifyUserSession();
    }, [navigate]);

    return <div>Completing login, please wait...</div>;
};
````

## File: Frontend/src/features/Auth/Context/auth.context.tsx
````typescript
import React, { useState, createContext, useEffect, type SetStateAction } from 'react'
import { type ApiResponse, verifyUser } from '../api/loginuser.api';


type AuthContextType = {
    isAuthenticatedUser: boolean,
    setIsAuthenticateUser: React.Dispatch<SetStateAction<boolean>>,
    user: ApiResponse | undefined,
    setUser: React.Dispatch<SetStateAction<ApiResponse | undefined>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [isAuthenticatedUser, setIsAuthenticateUser] = useState<boolean>(false);
    const [user, setUser] = useState<ApiResponse | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const veirfyAuthenticatedUser = async () => {
            try {
                setIsLoading(true);
                const response = await verifyUser();
                console.log("Auth Context working....", response)

                if (response.success) {
                    setUser(response);
                    setIsAuthenticateUser(true);
                } else {
                    setIsAuthenticateUser(false);
                    setUser(undefined);
                }
           

            } catch (error) {
                console.log("Error in Auth Provider:", error);
                setIsAuthenticateUser(false);
                setUser(undefined);
            } finally {
                console.log("Finally works");
                setIsLoading(false);
            }
        };

        veirfyAuthenticatedUser();

    }, [])




    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticatedUser, setIsAuthenticateUser, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
````

## File: Frontend/src/features/Auth/hooks/authhook.ts
````typescript
import { AuthContext } from "../Context/auth.context";
import { useContext } from "react";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthContextProvider");
    }
    return context;
}
````

## File: Frontend/src/features/Auth/hooks/useForgotPassword.ts
````typescript
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { type ForgotPasswordFormData } from '../schemas/forgot-password.schema'
import { veriyUserEmail, type ApiResponse } from '../api/verifyemail.api'

export const useForgotPassword = (options: UseMutationOptions<ApiResponse, Error, ForgotPasswordFormData>) => {

    return useMutation({
        mutationFn: veriyUserEmail,
        ...options,
        onSuccess: (data) => {
            console.log("Forgot Password Successful ", data)
        },
        onError: (error) => {
            console.log("Error is  Forgot Password ", error.message)
        }
    })
}
````

## File: Frontend/src/features/Auth/hooks/useLogin.ts
````typescript
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { userLogin, type ApiResponse } from '../api/loginuser.api'
import { type LoginFormData } from '../schemas/login.schema'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './authhook'

export const useLogin = (options: UseMutationOptions<ApiResponse, Error, LoginFormData>) => {
    const navigate = useNavigate();
    const { setIsAuthenticateUser, setUser } = useAuth()
    return useMutation({
        mutationFn: userLogin,
        ...options,

        onSuccess: (data) => {
            console.log("Login Success", data)
            setUser(data);
            setIsAuthenticateUser(true);
            if (data.data.role === "Admin") {
                navigate("/admin-dashboard", { replace: true });
            }
            else if (data.data.role === "Doctor") {
                navigate("/doctor-dashboard", { replace: true });
            }
            else {
                navigate("/", { replace: true });
            }
        },

        onError: (error) => {
            console.log("Login Error ", error.message)
        }

    })
}
````

## File: Frontend/src/features/Auth/hooks/useOtp.ts
````typescript
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { type VerifyOtpFormData } from '../schemas/verify-otp.schema'
import { verifyUserOtp, type ApiResponse } from '../api/verifyotp.api'

export const useOtp = (options: UseMutationOptions<ApiResponse, Error, VerifyOtpFormData>) => {

    return useMutation({
        mutationFn: verifyUserOtp,
        ...options,
        onSuccess: (data) => {
            console.log("Otp Send success", data)
        },
        onError: (error) => {
            console.log("OTP Error ", error.message);
        }
    })

}
````

## File: Frontend/src/features/Auth/hooks/usePetOwnerAccount.ts
````typescript
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { type PetOwnerFormData } from '../schemas/petowner.schema'
import { createPetOwnerAccount } from '../api/petOwner.api'
import { type ApiResponse } from '../api/petOwner.api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './authhook'
import { AxiosError } from 'axios'

type ApiErrorRespone = {
    message: string
}


export const usePetOwnerHook = (options: UseMutationOptions<ApiResponse, AxiosError<ApiErrorRespone>, PetOwnerFormData>) => {

    const { setUser, setIsAuthenticateUser } = useAuth();
    const navigate = useNavigate();


    return useMutation({

        mutationFn: createPetOwnerAccount,

        ...options,

        onSuccess: (response) => {
            console.log("Account Success", response)
            setUser(response);
            setIsAuthenticateUser(true);
            if (response?.success) {
                navigate('/verify-otp')
            }

        },

        onError: (error) => {
            console.log("Account Error ", error.message)

        }
    })
}
````

## File: Frontend/src/features/Auth/hooks/useResendOtp.ts
````typescript
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { resendUserOtp, type ApiResponse } from '../api/verifyotp.api'


export const useResendOtp = (options: UseMutationOptions<ApiResponse, Error>) => {
    return useMutation({
        mutationFn: resendUserOtp,
        ...options,
        onSuccess: (data) => {
            console.log("Resend OTP Success ", data)
        },
        onError: (error) => {
            console.log("Resend OTP error ", error.message)
        }
    })
}
````

## File: Frontend/src/features/Auth/hooks/useResetPassword.ts
````typescript
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { type ResetPasswordFormData } from '../schemas/reset-password.schema'
import { resetPasswordRequest, type ApiResponse } from '../api/resetpassword.api'


export const useResetPassword = (options: UseMutationOptions<ApiResponse, Error, ResetPasswordFormData>) => {

    return useMutation({
        mutationFn: resetPasswordRequest,
        ...options,
        onSuccess: (data) => {
            console.log("Password Reset Successfully", data)
        },
        onError(error) {
            console.log("Error is Reset Password is ", error)
        },
    })
}
````

## File: Frontend/src/features/Auth/pages/forgot-password.tsx
````typescript
import ForgotPasswordForm
from "../components/forgot-password-form";

import styles
from "../../../styles/forgot-password.module.css";

export default function ForgotPasswordPage() {
  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <div className={styles.imageWrapper}>
          <img
            src="/forgot-password-img.png"
            alt="forgot password"
            className={styles.image}
          />
        </div>

        <ForgotPasswordForm />

      </div>

    </div>
  );
}
````

## File: Frontend/src/features/Auth/pages/reset-password.tsx
````typescript
import ResetPasswordForm from "../components/reset-password-form";

import styles from "../../../styles/reset-password.module.css";

export default function ResetPasswordPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src="/reset-password-img.png"
            alt="reset password"
            className={styles.image}
          />
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
}
````

## File: Frontend/src/features/Auth/pages/verify-otp.tsx
````typescript
import VerifyOtpForm from "../components/verify-otp-form";

import styles from "../../../styles/verify-otp.module.css";

export default function VerifyOtpPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src="/verify-otp-img.png"
            alt="verify otp"
            className={styles.image}
          />
        </div>

        <VerifyOtpForm />
      </div>
    </div>
  );
}
````

## File: Frontend/src/features/Auth/Query/Providers/AuthQueryProvider.tsx
````typescript
import React from "react";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5
        }
    }
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    )
}
````

## File: Frontend/src/features/Auth/schemas/forgot-password.schema.tsx
````typescript
// forgotPasswordSchema.ts
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
});

// Optional: Export the type generated from the schema
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
````

## File: Frontend/src/features/Auth/schemas/login.schema.tsx
````typescript
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
````

## File: Frontend/src/features/Auth/schemas/petowner.schema.tsx
````typescript
// src/features/auth/schemas/petOwner.schema.ts
import { z } from "zod";

export const petOwnerSchema = z
    .object({
        fullName: z
            .string()
            .min(2, "Full name must be at least 2 years/characters long")
            .max(50, "Full name cannot exceed 50 characters"),

        username: z
            .string()
            .min(3, "Username must be at least 3 characters long")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

        email: z
            .email("Please enter a valid email address"),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters long"),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Highlights the error on the confirmPassword input field
    });

// Export the inferred TypeScript type from the Zod schema
export type PetOwnerFormData = z.infer<typeof petOwnerSchema>;
````

## File: Frontend/src/features/Auth/schemas/reset-password.schema.tsx
````typescript
import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password is required"),

    confirmPassword: z.string().min(6, "Confirm password is required"),
  })

  .refine(
    (data) => data.password === data.confirmPassword,

    {
      message: "Passwords do not match",

      path: ["confirmPassword"],
    },
  );

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
````

## File: Frontend/src/features/Auth/schemas/verify-otp.schema.tsx
````typescript
import { z } from "zod";

export const verifyOtpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digists"),
});

export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>
````

## File: Frontend/src/features/Contact/components/ContactFAQ.tsx
````typescript
const faqs = [
    {
        question: "How can I book a doctor appointment?",
        answer:
            "You can search doctors, open their profile and click the Book Appointment button.",
    },
    {
        question: "Are all doctors verified?",
        answer:
            "Yes. Every doctor goes through admin approval and verification process.",
    },
    {
        question: "Can I use AI assistance for pet symptoms?",
        answer:
            "Yes. PetsVeta provides AI-powered guidance for pet symptom assistance.",
    },
];

const ContactFAQ = () => {
    return (
        <section className="bg-white px-5 py-16 lg:px-16">
            <div className="mx-auto max-w-5xl">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
                        Frequently Asked Questions
                    </h2>

                    <p className="mt-3 text-slate-600">
                        Quick answers to common questions.
                    </p>
                </div>

                <div className="space-y-5">
                    {faqs.map((item) => (
                        <div
                            key={item.question}
                            className="rounded-3xl bg-[#f5fbff] p-6"
                        >
                            <h3 className="text-lg font-extrabold text-[#07182c]">
                                {item.question}
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                {item.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactFAQ;
````

## File: Frontend/src/features/Contact/components/ContactInfo.tsx
````typescript
import {
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone Number",
    value: "+92 300 1234567",
  },
  {
    icon: <FaEnvelope />,
    title: "Email Address",
    value: "support@petsveta.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location",
    value: "Lahore, Pakistan",
  },
  {
    icon: <FaClock />,
    title: "Support Hours",
    value: "24/7 Available",
  },
];

const ContactInfo = () => {
  return (
    <section className="bg-white px-5 py-14 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {info.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl bg-[#f5fbff] p-6 text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl text-[#009f9d] shadow-sm">
              {item.icon}
            </div>

            <h3 className="text-lg font-extrabold text-[#07182c]">
              {item.title}
            </h3>

            <p className="mt-2 text-sm font-semibold text-slate-600">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactInfo;
````

## File: Frontend/src/features/Contact/pages/ContactPage.tsx
````typescript
import ContactHero from "../components/ContactHero";
import ContactInfo from "../components/ContactInfo";
import ContactForm from "../components/ContactForm";
import ContactFAQ from "../components/ContactFAQ";
import ContactCTA from "../components/ContactCTA";

const ContactPage = () => {
    return (
        <>
            <ContactHero />
            <ContactInfo />
            <ContactForm />
            <ContactFAQ />
            <ContactCTA />
        </>
    );
};

export default ContactPage;
````

## File: Frontend/src/features/Doctor/api/doctorAppointments.api.ts
````typescript
import { api, handleAxiosError } from "@/features/api interface/axios.interface";

export type DoctorAppointment = {
  id: string;
  fees: number;
  checkupTime: string;
  status: "PENDING" | "COMPLETED";
  petIssueReport: {
    id: string;
    issue: string;
    user: {
      fullName: string;
      email: string;
      phone: string;
      profileImageUrl: string;
    };
    pet: {
      id: string;
      name: string;
      age: number;
      breed: string;
      category: string;
    };
  };
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const getDoctorAppointments = async () => {
  try {
    const response =
      await api.get<ApiResponse<DoctorAppointment[]>>("doctor/appointments");

    return response.data?.data || [];
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
````

## File: Frontend/src/features/Doctor/components/AddSlotModal.tsx
````typescript
import React from "react";
import { X } from "lucide-react";
import Button from "../../../shared/components/Button/Button";
import type { SlotForm, WeekDay } from "./DoctorTypes";
import { weekDays } from "./DoctorTypes";

interface AddSlotModalProps {
    isOpen: boolean;
    onClose: () => void;
    slotForm: SlotForm;
    setSlotForm: React.Dispatch<React.SetStateAction<SlotForm>>;
    handleAddSlot: () => void;
    error: string | null;
    resetSlotForm: () => void;
    setError: (error: string | null) => void; // Added setError prop to update state directly from the modal if needed
}

const AddSlotModal = ({
    isOpen,
    onClose,
    slotForm,
    setSlotForm,
    handleAddSlot,
    error,
    resetSlotForm,
    setError,
}: AddSlotModalProps) => {
    if (!isOpen) return null;

    // Helper validation function to catch past dates and times
    const timeFilter = (dateStr: string, timeStr: string): boolean => {
        if (!dateStr) return false;

        const now = new Date();

        // 1. Check if the date is strictly in the past (ignores time)
        const selectedDateOnly = new Date(dateStr);
        // Normalize times to midnight for an accurate date-only comparison
        const todayDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (selectedDateOnly < todayDateOnly) {
            setError("You cannot select a past date.");
            return false;
        }

        // 2. If the date is today, verify the selected time hasn't passed
        if (selectedDateOnly.getTime() === todayDateOnly.getTime() && timeStr) {
            const [hours, minutes] = timeStr.split(":").map(Number);
            const selectedDateTime = new Date(todayDateOnly.getTime());
            selectedDateTime.setHours(hours, minutes, 0, 0);

            if (selectedDateTime < now) {
                setError("You cannot select a past time for today.");
                return false;
            }
        }

        // Clear error if validation passes
        setError(null);
        return true;
    };

    // Wrapper for submission to enforce the filters
    const handleSubmission = () => {
        const isDateValid = timeFilter(slotForm.date, slotForm.startTime);
        if (isDateValid) {
            handleAddSlot();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-[#101b3d]">Add Time Slot</h2>
                        <p className="mt-1 text-sm text-slate-500">Select date, day, start time and end time.</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => { resetSlotForm(); onClose(); }}
                        className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-black text-[#20263D]">Date</label>
                        <input
                            type="date"
                            value={slotForm.date}
                            onChange={(e) => {
                                const newDate = e.target.value;
                                setSlotForm((prev) => ({ ...prev, date: newDate }));
                                timeFilter(newDate, slotForm.startTime);
                            }}
                            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-black text-[#20263D]">Day</label>
                        <select
                            value={slotForm.day}
                            onChange={(e) => setSlotForm((prev) => ({ ...prev, day: e.target.value as WeekDay }))}
                            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60"
                        >
                            {weekDays.map((item) => (
                                <option key={item.value} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-2 block text-sm font-black text-[#20263D]">Start Time</label>
                            <input
                                type="time"
                                value={slotForm.startTime}
                                onChange={(e) => {
                                    const newTime = e.target.value;
                                    setSlotForm((prev) => ({ ...prev, startTime: newTime }));
                                    timeFilter(slotForm.date, newTime);
                                }}
                                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-black text-[#20263D]">End Time</label>
                            <input
                                type="time"
                                value={slotForm.endTime}
                                onChange={(e) => setSlotForm((prev) => ({ ...prev, endTime: e.target.value }))}
                                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60"
                            />
                        </div>
                    </div>

                    {error ? (
                        <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600 border border-red-100">{error}</div>
                    ) : (
                        <div className="rounded-2xl bg-[#F0FAF7] p-4 text-sm font-semibold text-[#078b91]">This slot will be added to your appointment availability.</div>
                    )}

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={() => { resetSlotForm(); onClose(); }}>Cancel</Button>
                        <Button type="button" onClick={handleSubmission}>Add Slot</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSlotModal;
````

## File: Frontend/src/features/Doctor/components/DeleteModal.tsx
````typescript
import { AlertTriangle } from "lucide-react";

type DeleteModalProps = {
    isOpen: boolean;
    serviceName: string;
    price: string;
    itemId: string;
    onCancel: () => void;
    onConfirmDelete: (itemId: string) => void;
    isLoading?: boolean;
}

const DeleteModal = ({
    isOpen,
    serviceName,
    price,
    itemId,
    onCancel,
    onConfirmDelete,
    isLoading = false
}: DeleteModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 animate-in fade-in zoom-in-95 duration-200">
                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-red-50 rounded-full">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900">Delete Service</h2>
                </div>

                {/* Content */}
                <div className="mb-6">
                    <p className="text-slate-600 text-sm mb-4">
                        Are you sure you want to delete this service? This action cannot be undone.
                    </p>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Service</p>
                                <p className="font-medium text-slate-900">{serviceName}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500 mb-1">Price</p>
                                <p className="font-semibold text-red-600">Rs. {Number(price).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirmDelete(itemId)}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Delete"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
````

## File: Frontend/src/features/Doctor/components/DoctorAvailability/index.ts
````typescript
export { default } from "./DoctorAvailability";
````

## File: Frontend/src/features/Doctor/components/DoctorAvailability/ScheduleModal.tsx
````typescript
import React from 'react';

const ScheduleModal = ({
    isOpen,
    onClose,
    schedule,
    setSchedule,
    error,
    setError,
    onConfirm
}) => {

    if (!isOpen) return null;

    const defaultState = {
        date: "",
        startTime: "",
        endTime: ""
    };

    const handleCancel = () => {

        setSchedule(defaultState);

        if (setError) setError("");

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">


            <div className="w-full max-w-md transform rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200">


                <h3 className="text-xl font-extrabold text-slate-900">
                    Confirm Your Schedule
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    Please review the time slot details below before making it active.
                </p>


                {error && (
                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-600">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-black text-white">
                            !
                        </span>
                        <p>{error}</p>
                    </div>
                )}


                <div className="mt-5 space-y-4 rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <div className="flex justify-between items-center border-b border-slate-200/60 pb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Selected Date</span>
                        <span className="text-sm font-bold text-slate-700">{schedule.date || "Not Selected"}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Shift Timings</span>
                        <span className="text-sm font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
                            {schedule.startTime || "--:--"} to {schedule.endTime || "--:--"}
                        </span>
                    </div>
                </div>


                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 active:bg-slate-100"
                    >
                        Cancel & Reset
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex-1 rounded-xl bg-teal-600 py-3 text-sm font-bold text-white transition hover:bg-teal-700 shadow-sm shadow-teal-600/10 active:transform active:scale-[0.98]"
                    >
                        Confirm Slot
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ScheduleModal;
````

## File: Frontend/src/features/Doctor/components/DoctorAvailability/ScheduleTable.tsx
````typescript
import React from "react";

interface BackendScheduleItem {
    id: string;
    doctorId: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
}

interface ScheduleTableProps {
    schedules: BackendScheduleItem[];
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedules }) => {

    // 1. Helper to format dates cleanly (e.g., "Jun 12, 2026")
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // 2. Helper to format times cleanly (e.g., "07:30 PM")
    const formatTime = (timeStr: string) => {
        return new Date(timeStr).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    if (schedules.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm font-medium text-slate-500">
                No slots generated yet. Set a schedule block above to create availability.
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full border-collapse text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Start Time</th>
                        <th className="px-6 py-4">End Time</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {schedules.map((item) => (
                        <tr key={item.id} className="transition hover:bg-slate-50/50">
                            {/* Formatted Date */}
                            <td className="white-space-nowrap px-6 py-4 font-semibold text-slate-800">
                                {formatDate(item.date)}
                            </td>

                            {/* Formatted Start Time */}
                            <td className="px-6 py-4 text-slate-600 font-medium">
                                {formatTime(item.startTime)}
                            </td>

                            {/* Formatted End Time */}
                            <td className="px-6 py-4 text-slate-600 font-medium">
                                {formatTime(item.endTime)}
                            </td>

                            {/* Status Badge */}
                            <td className="px-6 py-4">
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${item.isBooked
                                            ? "bg-red-50 text-red-700 border border-red-100"
                                            : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                        }`}
                                >
                                    <span className={`h-1.5 w-1.5 rounded-full ${item.isBooked ? "bg-red-500" : "bg-emerald-500"}`} />
                                    {item.isBooked ? "Booked" : "Available"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;
````

## File: Frontend/src/features/Doctor/components/DoctorProfileButton.tsx
````typescript
import { useNavigate } from "react-router-dom";

type DoctorProfileButtonProps = {
  name: string;
  image?: string;
};

const DoctorProfileButton = ({ name, image }: DoctorProfileButtonProps) => {
  const navigate = useNavigate();

  const handleOpenProfile = () => {
    navigate("/doctor/profile");
  };

  return (
    <button
      type="button"
      onClick={handleOpenProfile}
      className="rounded-full transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-100"
      title="Open Profile"
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="h-12 w-12 rounded-full object-cover ring-4 ring-slate-100"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F9C5A8] text-2xl ring-4 ring-slate-100">
          👩‍⚕️
        </div>
      )}
    </button>
  );
};

export default DoctorProfileButton;
````

## File: Frontend/src/features/Doctor/components/DoctorTypes.ts
````typescript
export type WeekDay =
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";

export type TimeSlot = {
    id: string;
    date: string;
    day: WeekDay;
    label: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
};

export type SlotForm = {
    date: string;
    day: WeekDay;
    startTime: string;
    endTime: string;
};

export const weekDays: { value: WeekDay; label: string }[] = [
    { value: "MONDAY", label: "Monday" },
    { value: "TUESDAY", label: "Tuesday" },
    { value: "WEDNESDAY", label: "Wednesday" },
    { value: "THURSDAY", label: "Thursday" },
    { value: "FRIDAY", label: "Friday" },
    { value: "SATURDAY", label: "Saturday" },
    { value: "SUNDAY", label: "Sunday" },
];
````

## File: Frontend/src/features/Doctor/components/QuickAction.tsx
````typescript
const QuickAction = ({
    icon,
    title,
    text,
}: {
    icon: React.ReactNode;
    title: string;
    text: string;
}) => {
    return (
        <div className="flex gap-4 border-b border-slate-100 pb-4 last:border-b-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4E2E0]/60 text-[#078b91]">
                {icon}
            </div>
            <div>
                <h3 className="font-black text-[#101b3d]">{title}</h3>
                <p className="mt-1 text-sm text-slate-500">{text}</p>
            </div>
        </div>
    );
};

export default QuickAction;
````

## File: Frontend/src/features/Doctor/components/SlotsTable.tsx
````typescript
import Button from "../../../shared/components/Button/Button";
import { Trash2 } from "lucide-react";
import type { TimeSlot } from "./DoctorTypes";

const SlotsTable = ({
    slots,
    toggleAvailability,
    deleteSlot,
    formatDate,
    formatTime,
}: {
    slots: TimeSlot[];
    toggleAvailability: (id: string) => void;
    deleteSlot: (id: string) => void;
    formatDate: (d: string) => string;
    formatTime: (t: string) => string;
}) => {
    return (
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-[#F0FAF7] px-5 py-4">
                <p className="flex items-center gap-3 text-sm font-semibold text-[#078b91]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#078b91] text-white">
                        i
                    </span>
                    These availability slots will be shown to users on the Find Doctor
                    page.
                </p>
            </div>

            <div className="overflow-visible">
                <table className="w-full table-fixed text-left">
                    <thead className="bg-slate-50">
                        <tr className="border-b border-slate-200">
                            <th className="w-[18%] px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                                Date
                            </th>
                            <th className="w-[17%] px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                                Day
                            </th>
                            <th className="w-[16%] px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                                Start Time
                            </th>
                            <th className="w-[16%] px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                                End Time
                            </th>
                            <th className="w-[20%] px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                                Status
                            </th>
                            <th className="w-[13%] px-4 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-500">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {slots.length > 0 ? (
                            slots.map((slot) => (
                                <tr key={slot.id} className="transition hover:bg-slate-50">
                                    <td className="px-4 py-5 align-middle">
                                        <span className="inline-flex rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-[#20263D]">
                                            {formatDate(slot.date)}
                                        </span>
                                    </td>

                                    <td className="px-4 py-5 align-middle">
                                        <h3 className="truncate text-sm font-black text-[#101b3d]">{slot.label}</h3>
                                        <p className="mt-1 truncate text-[11px] font-bold uppercase tracking-wide text-slate-400">{slot.day}</p>
                                    </td>

                                    <td className="px-4 py-5 align-middle">
                                        <span className="inline-flex rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-[#20263D]">
                                            {formatTime(slot.startTime)}
                                        </span>
                                    </td>

                                    <td className="px-4 py-5 align-middle">
                                        <span className="inline-flex rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-[#20263D]">
                                            {formatTime(slot.endTime)}
                                        </span>
                                    </td>

                                    <td className="px-4 py-5 align-middle">
                                        <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
                                            <button
                                                type="button"
                                                onClick={() => toggleAvailability(slot.id)}
                                                className={`relative h-7 w-12 rounded-full transition ${slot.isAvailable ? "bg-[#078b91]" : "bg-slate-300"}`}>
                                                <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${slot.isAvailable ? "left-6" : "left-1"}`} />
                                            </button>

                                            <span className={`w-fit rounded-full px-3 py-1.5 text-[11px] font-black ${slot.isAvailable ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                                                {slot.isAvailable ? "Available" : "Inactive"}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-5 text-right align-middle">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="ml-auto w-auto border-red-200 px-3 py-2 text-xs text-red-500 hover:border-red-400 hover:bg-red-50"
                                            onClick={() => deleteSlot(slot.id)}
                                        >
                                            <span className="flex items-center justify-center gap-1">
                                                <Trash2 size={14} />
                                                Delete
                                            </span>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-14 text-center text-sm font-semibold text-slate-500">No availability slots added yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default SlotsTable;
````

## File: Frontend/src/features/Doctor/components/StatsCard.tsx
````typescript
const StatsCard = ({ title, value }: { title: string; value: string }) => {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">{title}</p>
            <h3 className="mt-2 text-3xl font-black text-[#078b91]">{value}</h3>
        </div>
    );
};

export default StatsCard;
````

## File: Frontend/src/features/Doctor/components/StatusBadge.tsx
````typescript
import { type AppointmentStatus } from "../doctor.types";

export const StatusBadge = ({ status }: { status: AppointmentStatus }) => {
    const styles: Record<AppointmentStatus, string> = {
        Confirmed: "bg-green-50 text-green-700",
        Pending: "bg-orange-50 text-orange-600",
        Completed: "bg-blue-50 text-blue-700",
        Cancelled: "bg-red-50 text-red-700",
    };

    return (
        <span
            className={`inline-flex rounded-xl px-4 py-2 text-xs font-black ${styles[status]}`}
        >
            {status}
        </span>
    );
};
````

## File: Frontend/src/features/Doctor/components/UpcomingRow.tsx
````typescript
const UpcomingRow = ({
    date,
    day,
    startTime,
    endTime,
}: {
    date: string;
    day: string;
    startTime: string;
    endTime: string;
}) => {
    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h3 className="font-black text-[#101b3d]">
                    {day} · {date}
                </h3>
                <p className="text-sm text-slate-500">
                    {startTime} - {endTime}
                </p>
            </div>
            <span className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-xs font-black text-green-700">
                Available
            </span>
        </div>
    );
};

export default UpcomingRow;
````

## File: Frontend/src/features/Doctor/doctor.types.ts
````typescript
export type AppointmentStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";

export type Doctor = {
    name: string;
    image?: string;
};

export type DashboardStats = {
    todayAppointments: number;
    pendingAppointments: number;
    totalPatients: number;
    completedToday: number;
};

export type Appointment = {
    id: string | number;
    time: string;
    petName: string;
    petType: string;
    ownerName: string;
    purpose: string;
    status: AppointmentStatus;
};

export type DashboardData = {
    doctor: Doctor;
    stats: DashboardStats;
    appointments: Appointment[];
};


export type TimeSlot = {
    id: string;
    day: string;
    startTime: string;
    endTime: string;
};

export const DAYS_OF_WEEK = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];
````

## File: Frontend/src/features/Doctor/pages/DoctorDashboardPage.tsx
````typescript
import DoctorDashboard from "../components/DoctorDashboard";

const DoctorDashboardPage = () => {
  return <DoctorDashboard />;
};

export default DoctorDashboardPage;
````

## File: Frontend/src/features/Doctor/pages/DoctorProfilePage.tsx
````typescript
const DoctorProfilePage = () => {
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-4xl font-black text-slate-900">
        Doctor Profile Page
      </h1>
    </main>
  );
};

export default DoctorProfilePage;
````

## File: Frontend/src/features/Doctor/pages/PatientsPage.tsx
````typescript
import { Loader2, RefreshCw, Users } from "lucide-react";
import { useEffect, useState } from "react";

import {
  getDoctorAppointments,
  type DoctorAppointment,
} from "../api/doctorAppointments.api";
import PatientCard from "../components/PatientCard";
import Button from "../../../shared/components/Button/Button";

const PatientsPage = () => {
  const [appointments, setAppointments] = useState<DoctorAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadAppointments = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await getDoctorAppointments();
      setAppointments(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load booked appointments.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFA] text-[#20263D]">
      <section className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#078b91]">
            Doctor Panel
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#101b3d]">
            Patients
          </h1>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
            View pet owners who booked appointments with you and review their
            pet issue details.
          </p>
        </div>

        <Button
          type="button"
          className="flex h-12 w-auto items-center justify-center gap-2 px-5"
          onClick={loadAppointments}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <RefreshCw size={17} />
          )}
          Refresh
        </Button>
      </section>

      {errorMessage && (
        <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-sm font-black text-[#078b91] shadow-sm">
          <Loader2 size={22} className="mx-auto mb-3 animate-spin" />
          Loading booked appointments...
        </div>
      ) : appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <PatientCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0FAF7] text-[#078b91]">
            <Users size={26} />
          </div>

          <h2 className="mt-4 text-xl font-black text-[#101b3d]">
            No booked patients yet
          </h2>

          <p className="mt-2 text-sm font-medium text-slate-500">
            New appointment bookings will appear here.
          </p>
        </div>
      )}
    </main>
  );
};

export default PatientsPage;
````

## File: Frontend/src/features/Doctorcart/component/DoctorProfile.tsx
````typescript
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CircleCheck,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
  Star,
  Stethoscope,
  UserRound,
  Wallet,
  IdCard,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button/Button";

type DoctorProfileData = {
  fullName: string;
  email: string;
  phone: string;
  profileImageUrl: string;
  specialization: string;
  education: string;
  experience: number;
  fees: number;
  rating: number;
  reviews: number;
  licenseNumber: string;
  languages: string;
  address: string;
  about: string;
  isVerified: boolean;
  isAvailable: boolean;
};

const doctor: DoctorProfileData = {
  fullName: "Dr. Ayesha Khan",
  email: "ayesha.khan@gmail.com",
  phone: "+92 300 1234567",
  profileImageUrl:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
  specialization: "Veterinary Surgeon",
  education: "DVM",
  experience: 5,
  fees: 2500,
  rating: 4.8,
  reviews: 128,
  licenseNumber: "VS-PK-2021-11234",
  languages: "English, Urdu, Punjabi",
  address: "PetCare Clinic, Gulberg III, Lahore",
  about:
    "Passionate about animal care and dedicated to providing the best medical services to pets.",
  isVerified: true,
  isAvailable: true,
};

const DoctorProfile = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#078b91]">
            Doctor Panel
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#101b3d]">
            Doctor Profile
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Manage your professional information and public doctor details.
          </p>
        </div>

        <section className="grid gap-5 xl:grid-cols-[330px_1fr]">
          <aside className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="relative h-32 bg-gradient-to-br from-[#D4E2E0] via-[#EAF7F5] to-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(23,143,149,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(249,197,168,0.18),transparent_38%)]" />
            </div>

            <div className="-mt-16 flex flex-col items-center px-6 pb-6">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-xl">
                <img
                  src={doctor.profileImageUrl}
                  alt={doctor.fullName}
                  className="h-full w-full object-cover"
                />

                <span className="absolute bottom-3 right-3 h-5 w-5 rounded-full border-2 border-white bg-green-500" />
              </div>

              <h2 className="mt-5 text-center text-2xl font-black text-[#101b3d]">
                {doctor.fullName}
              </h2>

              <p className="mt-1 text-sm font-bold text-[#078b91]">
                {doctor.specialization}
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                {doctor.isVerified && (
                  <span className="inline-flex items-center gap-2 rounded-lg bg-[#EAF7F5] px-4 py-2 text-sm font-black text-[#078b91]">
                    <BadgeCheck size={17} />
                    Verified
                  </span>
                )}

                {doctor.isAvailable && (
                  <span className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-black text-green-700">
                    <CircleCheck size={17} />
                    Available
                  </span>
                )}
              </div>

              <div className="mt-6 h-px w-full bg-slate-200" />

              <div className="mt-6 w-full space-y-5">
                <ContactRow icon={<Mail size={20} />} value={doctor.email} />
                <ContactRow icon={<Phone size={20} />} value={doctor.phone} />
                <ContactRow icon={<MapPin size={20} />} value={doctor.address} />
              </div>

              <div className="mt-7 w-full">
                <Button
                  type="button"
                  className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl px-3 py-0 text-xs font-black"
                  onClick={() => navigate("/doctor-profile/edit")}
                >
                  <Pencil size={15} />
                  Edit Profile
                </Button>
              </div>
            </div>
          </aside>

          <div className="space-y-5">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                icon={<BriefcaseBusiness size={28} />}
                iconClass="bg-[#D4E2E0]/70 text-[#078b91]"
                label="Experience"
                value={`${doctor.experience}+ Years`}
                description="Professional work"
              />

              <MetricCard
                icon={<GraduationCap size={30} />}
                iconClass="bg-purple-100 text-purple-600"
                label="Education"
                value={doctor.education}
                description="Doctor of Veterinary Medicine"
              />

              <MetricCard
                icon={<Wallet size={30} />}
                iconClass="bg-orange-100 text-orange-500"
                label="Consultation Fee"
                value={`Rs. ${doctor.fees.toLocaleString()}`}
                description="Per Consultation"
              />

              <MetricCard
                icon={<Star size={30} />}
                iconClass="bg-blue-100 text-blue-500"
                label="Total Rating"
                value={doctor.rating.toString()}
                description={`(${doctor.reviews} Reviews)`}
              />
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#101b3d]">
                Professional Information
              </h2>

              <div className="mt-6 grid gap-x-8 gap-y-0 lg:grid-cols-2">
                <InfoRow
                  icon={<Stethoscope size={23} />}
                  label="Specialization"
                  value={doctor.specialization}
                />

                <InfoRow
                  icon={<CalendarDays size={23} />}
                  label="Experience"
                  value={`${doctor.experience}+ Years`}
                />

                <InfoRow
                  icon={<IdCard size={23} />}
                  label="License Number"
                  value={doctor.licenseNumber}
                />

                <InfoRow
                  icon={<MapPin size={23} />}
                  label="Clinic Address"
                  value={doctor.address}
                />

                <InfoRow
                  icon={<Languages size={23} />}
                  label="Languages"
                  value={doctor.languages}
                />

                <InfoRow
                  icon={<UserRound size={23} />}
                  label="About Me"
                  value={doctor.about}
                  noBorder
                />
              </div>
            </section>
          </div>
        </section>
      </section>
    </main>
  );
};

const ContactRow = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) => {
  return (
    <div className="flex items-start gap-4 text-sm font-semibold text-slate-600">
      <span className="mt-0.5 text-[#078b91]">{icon}</span>
      <span className="leading-6">{value}</span>
    </div>
  );
};

const MetricCard = ({
  icon,
  iconClass,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  iconClass: string;
  label: string;
  value: string;
  description: string;
}) => {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${iconClass}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>

          <h3 className="mt-1 text-2xl font-black text-[#101b3d]">{value}</h3>

          <p className="mt-1 text-sm font-medium leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
  noBorder = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  noBorder?: boolean;
}) => {
  return (
    <div
      className={`flex gap-4 py-4 ${
        noBorder ? "" : "border-b border-dashed border-slate-200"
      }`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF7F5] text-[#078b91]">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">{label}</p>

        <h3 className="mt-1 text-sm font-black leading-6 text-[#101b3d]">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default DoctorProfile;
````

## File: Frontend/src/features/Doctorcart/component/FilterSidebar.tsx
````typescript
import Button from "../../../shared/components/Button/Button";
import SearchBar from "../../../shared/components/SearchBar/SearchBar";

interface FilterSidebarProps {
    search: string;
    onSearchChange: (value: string) => void;
    onReset: () => void;
}

const FilterSidebar = ({
    search,
    onSearchChange,
    onReset,
}: FilterSidebarProps) => {
    return (
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-black">Filters</h2>

                <button
                    type="button"
                    onClick={onReset}
                    className="text-sm font-bold text-[#078b91]"
                >
                    Reset
                </button>
            </div>

            <div className="mt-6 space-y-5">
                <div className="w-full max-w-full overflow-hidden">
                    <SearchBar
                        placeholder="Search doctor..."
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            onSearchChange(e.target.value);
                        }}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-bold">
                        Specialization
                    </label>

                    <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60">
                        <option>All Specializations</option>
                        <option>Veterinary Surgeon</option>
                        <option>Pet Dermatology</option>
                        <option>Animal Nutritionist</option>
                    </select>
                </div>

                <Button type="button">Apply Filters</Button>
            </div>
        </aside>
    );
};

export default FilterSidebar;
````

## File: Frontend/src/features/Doctorcart/component/PageHeader.tsx
````typescript
const PageHeader = () => {
    return (
        <div className="mb-6">
            <h1 className="text-3xl font-black md:text-4xl">Find a Doctor</h1>
            <p className="mt-2 text-sm text-slate-500">
                Choose a doctor and book an appointment from available time slots.
            </p>
        </div>
    );
};

export default PageHeader;
````

## File: Frontend/src/features/Doctorcart/component/Pagination.tsx
````typescript
interface PaginationProps {
    page: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
}

const Pagination = ({
    page,
    totalPages,
    onPrevious,
    onNext,
}: PaginationProps) => {
    return (
        <div className="mt-8 flex items-center justify-center gap-3">
            <button
                type="button"
                disabled={page === 1}
                onClick={onPrevious}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
            >
                Previous
            </button>

            <span className="rounded-xl bg-[#D4E2E0]/60 px-4 py-2 text-sm font-black text-[#078b91]">
                Page {page} of {totalPages}
            </span>

            <button
                type="button"
                disabled={page === totalPages}
                onClick={onNext}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
````

## File: Frontend/src/features/Doctorcart/hooks/useDoctorProfile.ts
````typescript
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { getDoctorProfileApi, type DoctorProfileApiResponse } from '../apis/doctorProfile.api'



export const useDoctorProfileById = (
    options?: Omit<UseQueryOptions<DoctorProfileApiResponse, Error>, 'queryFn' | 'queryKey'>
) => {
    return useQuery({
        queryKey: ['doctor-profile'],
        queryFn: () => getDoctorProfileApi(),
        ...options
    })
}
````

## File: Frontend/src/features/Doctorcart/pages/DoctorProfilePage.tsx
````typescript
import DoctorProfile from "../component/DoctorProfile";

const DoctorProfilePage = () => {
  return <DoctorProfile />;
};

export default DoctorProfilePage;
````

## File: Frontend/src/features/Doctorcart/pages/EditDoctorProfilePage.tsx
````typescript
import EditDoctorProfileForm from "../component/EditDoctorProfileForm";

const EditDoctorProfilePage = () => {
  return <EditDoctorProfileForm />;
};

export default EditDoctorProfilePage;
````

## File: Frontend/src/features/Doctorcart/pages/FindDoctorPage.tsx
````typescript
import Navbar from "../../../shared/components/Navbar/Navbar";
import FindDoctor from "../component/FindDoctor";

const FindDoctorPage = () => {
  return (
    <>
      <Navbar />
      <FindDoctor />
    </>
  );
};

export default FindDoctorPage;
````

## File: Frontend/src/features/Doctorcart/schemas/doctorProfile.schema.ts
````typescript
import { z } from "zod";

export const doctorProfileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  username: z.string().min(2, "Username is required"),
  phone: z.string().min(10, "Phone number is required"),

  profileImageUrl: z.string().optional(),

  specialization: z.string().min(2, "Specialization is required"),
  education: z.string().min(2, "Education is required"),
  address: z.string().min(5, "Clinic address is required"),

  experience: z.coerce
    .number({
      message: "Experience is required",
    })
    .min(0, "Experience cannot be negative")
    .max(60, "Experience is too high"),

  fees: z.coerce
    .number({
      message: "Fees is required",
    })
    .min(0, "Fees cannot be negative"),

  isAvailable: z.boolean(),
});

export type DoctorProfileFormInput = z.input<typeof doctorProfileSchema>;
export type DoctorProfileFormData = z.output<typeof doctorProfileSchema>;
````

## File: Frontend/src/features/Landing Page/components/AIAssistance.tsx
````typescript
import { FaPaw, FaPaperPlane } from "react-icons/fa";

import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import img from "@/assets/shared/images/dog2.jpeg"

const AIAssistantBanner = () => {
    return (
        <section className="bg-[#f5fbff] px-6 py-8 lg:px-16">
            <div className="relative mx-auto flex max-w-7xl items-center overflow-hidden rounded-[26px] border border-[#c9f1ee] bg-gradient-to-r from-[#dff8f7] via-[#eefdfc] to-[#f6fffe] px-8 py-8 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                <img
                    src={img}
                    alt="AI Assistant"
                    className="absolute bottom-0 left-8 hidden h-[210px] object-contain md:block"
                />

                <div className="relative z-10 ml-0 md:ml-[250px]">
                    <p className="mb-2 flex items-center gap-2 text-sm font-extrabold text-[#009f9d]">
                        AI Assistant <FaPaw />
                    </p>

                    <h2 className="mb-3 text-[24px] font-extrabold text-[#07182c]">
                        Ask anything about your pet
                    </h2>

                    <p className="max-w-md text-sm leading-6 text-slate-600">
                        Get instant answers about symptoms, care, nutrition, vaccination and
                        more.
                    </p>
                </div>

                <div className="relative z-10 ml-auto hidden w-[430px] items-center rounded-full bg-white px-5 py-3 shadow-lg lg:flex">
                    <Input
                        type="text"
                        placeholder="Ask your question..."
                        className="!border-0 !bg-transparent !shadow-none !outline-none !ring-0"
                    />

                    <Button
                        variant="primary"
                        size="md"
                        className="flex !h-14 !w-14 items-center justify-center !rounded-full !border-[#009f9d] !bg-[#009f9d] !p-0 !text-white hover:!bg-[#008f8d] hover:!text-white"
                    >
                        <FaPaperPlane />
                    </Button>
                </div>

                <div className="absolute right-10 top-10 hidden h-16 w-20 items-center justify-center rounded-[22px] bg-[#a7eee7] text-white lg:flex">
                    • • •
                </div>
            </div>
        </section>
    );
};

export default AIAssistantBanner;
````

## File: Frontend/src/features/Landing Page/components/ChooseUs.tsx
````typescript
import {
    FaUserMd,
    FaLock,
    FaCalendarCheck,
    FaBoxOpen,
    FaHeadset,
    FaShieldAlt,
} from "react-icons/fa";
import img from "@/assets/shared/images/dog2.jpeg"

const features = [
    { icon: <FaUserMd />, title: "Experienced\n& Verified Vets" },
    { icon: <FaLock />, title: "Affordable\nPricing" },
    { icon: <FaCalendarCheck />, title: "Fast & Easy\nBookings" },
    { icon: <FaBoxOpen />, title: "Wide Range of\nQuality Products" },
    { icon: <FaHeadset />, title: "24/7 Customer\nSupport" },
    { icon: <FaShieldAlt />, title: "Secure & Safe\nPlatform" },
];

const WhyChoose = () => {
    return (
        <section className="bg-[#f5fbff] px-6 py-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <h2 className="mb-7 text-center text-[20px] font-extrabold text-[#07182c]">
                    Why Pet Parents Choose{" "}
                    <span className="text-[#009f9d]">PetsVeta</span>
                </h2>

                <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
                    <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                        {features.map((item) => (
                            <div
                                key={item.title}
                                className="flex flex-col items-center border-slate-200 text-center lg:border-r last:border-r-0"
                            >
                                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#d9f7f6] text-2xl text-[#008f8d]">
                                    {item.icon}
                                </div>

                                <p className="whitespace-pre-line text-[13px] font-extrabold leading-5 text-[#07182c]">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="relative hidden w-[320px] shrink-0 lg:block">
                        <div className="absolute -left-8 top-2 h-28 w-28 rounded-full border-[5px] border-[#9ee6e1]" />
                        <img
                            src={img}
                            alt="Pets"
                            className="relative z-10 w-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
````

## File: Frontend/src/features/Landing Page/components/CTA.tsx
````typescript
import Button from "@/shared/components/Button/Button";
import img from "@/assets/shared/images/dog2.jpeg"

const CTA = () => {
    return (
        <section className="bg-[#f5fbff] px-6 py-10 lg:px-16">
            <div className="relative mx-auto flex max-w-7xl items-center justify-between overflow-hidden rounded-[34px] bg-gradient-to-r from-[#12aaa5] to-[#079895] px-8 py-10 shadow-xl md:px-14">
                <img
                    src={img}
                    alt="Dog"
                    className="absolute bottom-0 left-6 hidden h-[260px] object-contain md:block"
                />

                <div className="relative z-10 mx-auto max-w-2xl text-center">
                    <h2 className="text-[30px] font-extrabold leading-tight text-white md:text-[42px]">
                        Your pet’s health is our priority
                        <br />
                        Join PetsVeta today!
                    </h2>

                    <div className="mt-8 flex justify-center gap-5">
                        <Button
                            variant="primary"
                            size="md"
                            className="!rounded-2xl !border-white !bg-white !px-10 !text-[#009f9d] hover:!bg-white hover:!text-[#008f8d]"
                        >
                            Get Started
                        </Button>

                        <Button
                            variant="outline"
                            size="md"
                            className="!rounded-2xl !border-white !bg-transparent !px-10 !text-white hover:!bg-white hover:!text-[#009f9d]"
                        >
                            Explore Features
                        </Button>
                    </div>
                </div>

                <img
                    src={img}
                    alt="Cat"
                    className="absolute bottom-0 right-8 hidden h-[275px] object-contain md:block"
                />
            </div>
        </section>
    );
};

export default CTA;
````

## File: Frontend/src/features/Landing Page/components/Popular.tsx
````typescript
import { FaArrowRight, FaStar } from "react-icons/fa";
import img from "@/assets/shared/images/dog2.jpeg"

const products = [
    {
        title: "Royal Canin\nDog Food",
        price: "Rs. 2,450",
        rating: "4.8",
        image: img,
    },
    {
        title: "Cat Litter\nPremium",
        price: "Rs. 1,350",
        rating: "4.6",
        image: img,
    },
    {
        title: "Chew Toy\nFor Dogs",
        price: "Rs. 650",
        rating: "4.7",
        image: img,
    },
    {
        title: "Pet Shampoo\nGentle Care",
        price: "Rs. 890",
        rating: "4.5",
        image: img,
    },
    {
        title: "Nutritional\nSupplements",
        price: "Rs. 1,250",
        rating: "4.6",
        image: img,
    },
];

const PopularMarketplace = () => {
    return (
        <section className="bg-[#f5fbff] px-6 py-8 lg:px-16">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[22px] font-extrabold text-[#07182c]">
                    Popular in <span className="text-[#009f9d]">Marketplace</span>
                </h2>

                <button className="flex items-center gap-2 text-sm font-extrabold text-[#009f9d]">
                    View All Products
                    <FaArrowRight className="text-xs" />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {products.map((product) => (
                    <div
                        key={product.title}
                        className="rounded-[20px] bg-white p-4 shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
                    >
                        <div className="mb-4 flex h-[130px] items-center justify-center rounded-[16px] bg-gradient-to-br from-[#fff3ef] via-[#f8fbfb] to-[#edfafa]">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-[110px] w-full object-contain"
                            />
                        </div>

                        <h3 className="whitespace-pre-line text-[16px] font-extrabold leading-[19px] text-[#07182c]">
                            {product.title}
                        </h3>

                        <p className="mt-2 text-[14px] font-extrabold text-[#009f9d]">
                            {product.price}
                        </p>

                        <div className="mt-2 flex items-center gap-[2px]">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <FaStar key={index} className="text-[13px] text-[#ffb020]" />
                            ))}
                            <span className="ml-2 text-[12px] font-semibold text-slate-500">
                                ({product.rating})
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularMarketplace;
````

## File: Frontend/src/features/Landing Page/components/TopDoctor.tsx
````typescript
import { FaArrowRight, FaStar } from "react-icons/fa";
import img from "@/assets/shared/images/dog2.jpeg"


const doctors = [
    {
        name: "Dr. Sarah Khan",
        specialty: "Veterinary Surgeon",
        rating: "4.9",
        reviews: "120",
        image: img,
    },
    {
        name: "Dr. Ali Raza",
        specialty: "Pet Specialist",
        rating: "4.8",
        reviews: "98",
        image: img,
    },
    {
        name: "Dr. Mehwish Noor",
        specialty: "Dermatologist",
        rating: "4.9",
        reviews: "110",
        image: img,
    },
    {
        name: "Dr. Usman Ahmed",
        specialty: "Orthopedic Vet",
        rating: "4.7",
        reviews: "85",
        image: img,
    },
];

const TopRatedDoctors = () => {
    return (
        <section className="bg-[#f5fbff] px-6 py-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-[22px] font-extrabold text-[#07182c]">
                        Top Rated <span className="text-[#009f9d]">Doctors</span>
                    </h2>

                    <button className="flex items-center gap-2 text-sm font-extrabold text-[#009f9d]">
                        View All Doctors
                        <FaArrowRight className="text-xs" />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor.name}
                            className="relative flex h-[140px] overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                        >
                            <div className="relative w-[105px] shrink-0 bg-gradient-to-br from-[#eefafa] to-white">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="absolute bottom-0 left-0 h-[130px] w-full object-contain object-bottom"
                                />

                                <span className="absolute bottom-4 left-4 h-3 w-3 rounded-full bg-[#22c55e] ring-2 ring-white" />
                            </div>

                            <div className="flex flex-1 flex-col justify-center px-4">
                                <h3 className="text-[15px] font-extrabold text-[#07182c]">
                                    {doctor.name}
                                </h3>

                                <p className="mt-1 text-[12px] font-semibold text-slate-500">
                                    {doctor.specialty}
                                </p>

                                <div className="mt-3 flex items-center gap-1">
                                    <FaStar className="text-[13px] text-[#ffb020]" />
                                    <span className="text-[13px] font-extrabold text-[#07182c]">
                                        {doctor.rating}
                                    </span>
                                    <span className="text-[12px] font-semibold text-slate-400">
                                        ({doctor.reviews})
                                    </span>
                                </div>

                                <p className="mt-2 text-[12px] font-bold text-[#f7b731]">
                                    Online Available
                                </p>
                            </div>

                            <span className="absolute left-[98px] top-5 h-3 w-3 rounded-full bg-[#22c55e] ring-2 ring-white" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopRatedDoctors;
````

## File: Frontend/src/features/Landing Page/data/services.data.ts
````typescript
import service1 from "../../../assets/shared/images/petGenralService.webp";
import service2 from "../../../assets/shared/images/petVaccinationService.webp";
import service3 from "../../../assets/shared/images/petGroomingService.webp";
import service4 from "../../../assets/shared/images/petDiagnosticService.webp";
import service5 from "../../../assets/shared/images/petSurgicalService.webp"
import service6 from "../../../assets/shared/images/petTraining&behavior.webp"

export const servicesData = [
  {
    id: 1,
    title: "General Vet Services",
    description: "Professional health checkups and routine care for your pets.",
    image: service1
  },
  {
    id: 2,
    title: "Vaccination Services",
    description: "Protect your pets with safe and timely vaccinations.",
    image: service2
  },
  {
    id: 3,
    title: "Grooming Services",
    description: "Keep your pets clean, fresh, healthy, and happy.",
    image: service3
  },
  {
    id: 4,
    title: "Diagnostic Services",
    description: "Accurate testing and diagnosis for better pet treatment.",
    image:service4
  },
  {
    id: 5,
    title: "Surgical Services",
    description: "Safe surgical care handled by experienced pet doctors.",
    image: service5
  },
  {
    id: 6,
    title: "Training & Behavior",
    description: "Helpful training sessions for better pet behavior.",
    image: service6
  },
];
````

## File: Frontend/src/features/Landing Page/data/team.data.ts
````typescript
import team1 from ".././../../assets/shared/images/maleDoctor1.webp";
import team2 from ".././../../assets/shared/images/maleDoctor2.webp";
import team3 from ".././../../assets/shared/images/maleDoctor3.webp";
import team4 from ".././../../assets/shared/images/femaleDoctor1.webp";
import team5 from ".././../../assets/shared/images/femaleDoctor2.webp";
import team6 from ".././../../assets/shared/images/femaleDoctor3.webp";

export const teamData = [
    {
        id: 1,
        name: "Dr. Ahmad Khan",
        specialization: "Professional health checkups for your pets.",
        description: "Professional health checkups for your pets.",
        image: team1
    },
    {
        id: 2,
        name: "Dr. Ahmad Khan",
        specialization: "Professional health checkups for your pets.",
        description: "Professional health checkups for your pets.",
        image: team2
    },
    {
        id: 3,
        name: "Dr. Ahmad Khan",
        specialization: "Professional health checkups for your pets.",
        description: "Professional health checkups for your pets.",
        image: team3
    },
    {
        id: 4,
        name: "Dr. Ahmad Khan",
        specialization: "Professional health checkups for your pets.",
        description: "Professional health checkups for your pets.",
        image: team4
    },
    {
        id: 5,
        name: "Dr. Ahmad Khan",
        specialization: "Professional health checkups for your pets.",
        description: "Professional health checkups for your pets.",
        image: team5
    },
    {
        id: 6,
        name: "Dr. Ahmad Khan",
        specialization: "Professional health checkups for your pets.",
        description: "Professional health checkups for your pets.",
        image: team6
    },
];
````

## File: Frontend/src/features/Landing Page/data/testimonial.data.ts
````typescript
import testimonial1 from "../../../assets/shared/images/testimonial1.webp";
import testimonial2 from "../../../assets/shared/images/testimonial2.webp";
import testimonial3 from "../../../assets/shared/images/testimonial3.webp"

export const testimonialData = [
    {
        id: 1,
        title: "Razia Ahmed",
        description: "It was a very good experience. The service was on time and the staff was very professional.” — Razia Ahmed",
        image: testimonial1
    },
    {
        id: 2,
        title: "Farzana Malik",
        description: "I got very good results here. The treatment was smooth and clearly explained. — Farzana Malik",
        image: testimonial2
    },
    {
        id: 3,
        title: "Shabana Khan",
        description: "The doctor provided excellent care, and the whole process was simple and comfortable.” — Shabana Khan",
        image: testimonial3
    }
];
````

## File: Frontend/src/features/Marketplace/components/MarketplaceBanner.tsx
````typescript
import { Link } from "react-router-dom";
import { FaGift, FaShippingFast } from "react-icons/fa";

import Button from "../../../shared/components/Button";

const MarketplaceBanner = () => {
    return (
        <section className="bg-[#f5fbff] px-5 py-16 lg:px-16">
            <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[36px] bg-gradient-to-br from-[#bdf0ee] via-white to-[#fff3ec] p-8 shadow-[0_18px_50px_rgba(15,23,42,0.10)] lg:grid-cols-[1fr_380px] lg:p-12">
                <div>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#009f9d] shadow-sm">
                        <FaGift />
                        Special Offer
                    </div>

                    <h2 className="text-3xl font-extrabold leading-tight text-[#07182c] md:text-4xl">
                        Get premium pet products with fast delivery and trusted quality.
                    </h2>

                    <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                        Explore food, accessories, grooming tools and healthcare products
                        designed for your pet’s daily comfort.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-4">
                        <Button>Shop Now</Button>

                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center rounded-xl border border-[#009f9d] px-5 py-3 text-sm font-bold text-[#009f9d] transition hover:bg-[#eefafa]"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>

                <div className="rounded-[32px] bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eefafa] text-3xl text-[#009f9d]">
                            <FaShippingFast />
                        </div>

                        <div>
                            <h3 className="text-2xl font-extrabold text-[#07182c]">
                                Free Delivery
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                On selected pet-care products
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-3xl bg-[#f5fbff] p-5">
                        <p className="text-sm leading-6 text-slate-600">
                            Order pet food, grooming tools and accessories from PetsVeta and
                            get reliable delivery at your doorstep.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketplaceBanner;
````

## File: Frontend/src/features/Marketplace/components/MarketplaceBenefits.tsx
````typescript
import {
    FaCheckCircle,
    FaShieldAlt,
    FaShippingFast,
    FaUndo,
} from "react-icons/fa";

const benefits = [
    {
        icon: <FaCheckCircle />,
        title: "100% Genuine Products",
        subtitle: "Trusted pet brands",
    },

    {
        icon: <FaUndo />,
        title: "Easy Returns",
        subtitle: "7 days return policy",
    },

    {
        icon: <FaShippingFast />,
        title: "Fast Delivery",
        subtitle: "Quick doorstep delivery",
    },

    {
        icon: <FaShieldAlt />,
        title: "Secure Payments",
        subtitle: "Safe & encrypted checkout",
    },
];

const MarketplaceBenefits = () => {
    return (
        <section className="bg-white px-5 py-10 lg:px-16">
            <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
                {benefits.map((item) => (
                    <div
                        key={item.title}
                        className="flex items-center gap-4 rounded-3xl bg-[#f5fbff] p-5"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-[#009f9d] shadow-sm">
                            {item.icon}
                        </div>

                        <div>
                            <h3 className="font-extrabold text-[#07182c]">
                                {item.title}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                {item.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MarketplaceBenefits;
````

## File: Frontend/src/features/Marketplace/components/MarketplaceCTA.tsx
````typescript
import { Link } from "react-router-dom";
import Button from "../../../shared/components/Button";

const MarketplaceCTA = () => {
    return (
        <section className="bg-white px-5 pb-16 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-[36px] bg-gradient-to-br from-[#bdf0ee] via-[#f5fbff] to-[#fff3ec] p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.10)] md:p-12">
                <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
                    Need help choosing the right product?
                </h2>

                <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
                    Use AI assistance or contact our support team to find suitable
                    products for your pet.
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-4">
                    <Link to="/ai-assistant">
                        <Button>Ask AI Assistant</Button>
                    </Link>

                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center rounded-xl border border-[#009f9d] px-5 py-3 text-sm font-bold text-[#009f9d] transition hover:bg-[#eefafa]"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default MarketplaceCTA;
````

## File: Frontend/src/features/Marketplace/components/MarketplaceFilters.tsx
````typescript
import { FaFilter } from "react-icons/fa";
import { categories } from "../data/marketplace.data";

const MarketplaceFilters = () => {
    return (
        <aside className="h-fit rounded-3xl bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-extrabold text-[#07182c]">
                    <FaFilter className="text-[#009f9d]" />
                    Filters
                </h3>

                <button
                    type="button"
                    className="text-sm font-bold text-[#009f9d] hover:underline"
                >
                    Reset
                </button>
            </div>

            <div>
                <h4 className="mb-3 text-sm font-extrabold text-[#07182c]">
                    Categories
                </h4>

                <div className="space-y-3">
                    {categories.slice(0, 7).map((category) => (
                        <label
                            key={category}
                            className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-600"
                        >
                            <input
                                type="checkbox"
                                className="accent-[#009f9d]"
                            />
                            {category}
                        </label>
                    ))}
                </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-6">
                <h4 className="mb-3 text-sm font-extrabold text-[#07182c]">
                    Price Range
                </h4>

                <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full accent-[#009f9d]"
                />

                <div className="mt-2 flex justify-between text-xs font-bold text-slate-500">
                    <span>$0</span>
                    <span>$100+</span>
                </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-6">
                <h4 className="mb-3 text-sm font-extrabold text-[#07182c]">
                    Rating
                </h4>

                {["4.5 & above", "4.0 & above", "3.5 & above"].map((rating) => (
                    <label
                        key={rating}
                        className="mb-3 flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-600"
                    >
                        <input
                            type="checkbox"
                            className="accent-[#009f9d]"
                        />
                        {rating}
                    </label>
                ))}
            </div>

            <div className="mt-6 border-t border-slate-100 pt-6">
                <h4 className="mb-3 text-sm font-extrabold text-[#07182c]">
                    Availability
                </h4>

                {["In Stock", "On Sale", "Best Seller"].map((item) => (
                    <label
                        key={item}
                        className="mb-3 flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-600"
                    >
                        <input
                            type="checkbox"
                            className="accent-[#009f9d]"
                        />
                        {item}
                    </label>
                ))}
            </div>
        </aside>
    );
};

export default MarketplaceFilters;
````

## File: Frontend/src/features/Marketplace/components/MarketplaceHero.tsx
````typescript
import {
    FaSearch,
    FaShoppingCart,
    FaTruck,
} from "react-icons/fa";

import Button from "../../../shared/components/Button";

const MarketplaceHero = () => {
    return (
        <section className="bg-white px-5 pt-10 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-[40px] bg-gradient-to-br from-[#f5fbff] via-white to-[#d9f7f6] p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:p-12">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#009f9d] shadow-sm">
                            <FaShoppingCart />
                            PetsVeta Marketplace
                        </div>

                        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-[#07182c] md:text-5xl">
                            Everything your pet needs,
                            <br />
                            all in{" "}
                            <span className="text-[#009f9d]">
                                one place
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                            Discover premium pet food, accessories, grooming tools,
                            medicines and trusted products for your furry friends.
                        </p>

                        <div className="mt-7 flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm sm:flex-row">
                            <div className="relative flex-1">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="text"
                                    placeholder="Search pet products..."
                                    className="h-14 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] pl-12 pr-4 text-sm outline-none focus:border-[#009f9d] focus:ring-2 focus:ring-[#009f9d]/20"
                                />
                            </div>

                            <Button className="h-14 px-8">
                                Search
                            </Button>
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#07182c] shadow-sm">
                                Premium Products
                            </span>

                            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#07182c] shadow-sm">
                                Fast Delivery
                            </span>

                            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#07182c] shadow-sm">
                                Trusted Brands
                            </span>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="overflow-hidden rounded-[40px] bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                            <img
                                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1400&auto=format&fit=crop"
                                alt="Pets Marketplace"
                                className="h-[450px] w-full rounded-[32px] object-cover"
                            />
                        </div>

                        <div className="absolute -bottom-6 left-6 rounded-3xl bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eefafa] text-xl text-[#009f9d]">
                                    <FaTruck />
                                </div>

                                <div>
                                    <h3 className="font-extrabold text-[#07182c]">
                                        Fast Delivery
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        At your doorstep
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -right-4 top-10 rounded-3xl bg-[#009f9d] p-5 text-white shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                            <h3 className="text-2xl font-extrabold">
                                10K+
                            </h3>

                            <p className="mt-1 text-sm text-white/80">
                                Happy Pet Owners
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketplaceHero;
````

## File: Frontend/src/features/Marketplace/marketplace.route.tsx
````typescript
import MarketplacePage from "./pages/MarketplacePage";

export const marketplaceRoutes = [
    {
        path: "/marketplace",
        element: <MarketplacePage />,
    },
];
````

## File: Frontend/src/features/Pet Owner/pet details/pages/PetFormPage.tsx
````typescript
import PetForm from "../components/PetForm";

const PetFormPage = () => {
  return <PetForm />;
};

export default PetFormPage;
````

## File: Frontend/src/features/Pet Owner/pet details/pages/PetIssueReportPage.tsx
````typescript
import PetIssueReportForm from "../components/PetIssueReportForm";

const PetIssueReportPage = () => {
  return <PetIssueReportForm />;
};

export default PetIssueReportPage;
````

## File: Frontend/src/features/Pet Owner/pet details/pets.route.tsx
````typescript
import PetFormPage from "./pages/PetFormPage";
import PetIssueReportPage from "./pages/PetIssueReportPage";

export const petsRoutes = [
  {
    path: "/pets/add",
    element: <PetFormPage />,
  },
  {
    path: "/pets/report-issue",
    element: <PetIssueReportPage />,
  },
];
````

## File: Frontend/src/features/Pet Owner/pet details/schemas/pet.schema.ts
````typescript
import { z } from "zod";

export const petSchema = z.object({
  name: z.string().min(2, "Pet name must be at least 2 characters"),

  age: z.coerce
    .number({
      message: "Age is required",
    })
    .positive("Age must be greater than 0")
    .max(100, "Age is too high"),

  breed: z.string().min(2, "Breed is required"),

  category: z.enum(["DOG", "CAT", "REPTILE", "OTHER"], {
    message: "Please select pet category",
  }),
});

export type PetFormInput = z.input<typeof petSchema>;
export type PetFormData = z.output<typeof petSchema>;
````

## File: Frontend/src/features/Pet Owner/pet profile/api/petOwnerProfile.api.ts
````typescript
import {api} from "@/features/api interface/axios.interface";

import type { PetOwnerProfileResponse } from "../types/petProfile.types";

export const getPetOwnerProfileApi =
  async (): Promise<PetOwnerProfileResponse> => {
    const response = await api.get<PetOwnerProfileResponse>(
      "/pet-owner/profile",
    );

    return response.data;
  };
````

## File: Frontend/src/features/Pet Owner/pet profile/api/pets.api.ts
````typescript
import {api} from "@/features/api interface/axios.interface";

import type { PetFormData } from "../schemas/pet.schema";

import type {
  PetResponse,
  PetsResponse,
} from "../types/petProfile.types";

export const getMyPetsApi = async (): Promise<PetsResponse> => {
  const response = await api.get<PetsResponse>("/pets/my-pets");

  return response.data;
};

export const getPetByIdApi = async (
  petId: string,
): Promise<PetResponse> => {
  const response = await api.get<PetResponse>(`/pets/${petId}`);

  return response.data;
};

export const createPetApi = async (
  payload: PetFormData,
): Promise<PetResponse> => {
  const response = await api.post<PetResponse>("/pets", payload);

  return response.data;
};

export const updatePetApi = async (
  petId: string,
  payload: PetFormData,
): Promise<PetResponse> => {
  const response = await api.patch<PetResponse>(
    `/pets/${petId}`,
    payload,
  );

  return response.data;
};

export const deletePetApi = async (
  petId: string,
): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await api.delete<{
    success: boolean;
    message: string;
  }>(`/pets/${petId}`);

  return response.data;
};
````

## File: Frontend/src/features/Pet Owner/pet profile/components/DeletePetModal.tsx
````typescript
import { useEffect, useRef, useState } from "react";

import {
  EllipsisVertical,
  Pencil,
  Trash2,
} from "lucide-react";

type PetActionsMenuProps = {
  petName: string;
  onEdit: () => void;
  onDelete: () => void;
};

const PetActionsMenu = ({
  petName,
  onEdit,
  onDelete,
}: PetActionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleEdit = () => {
    setIsOpen(false);
    onEdit();
  };

  const handleDelete = () => {
    setIsOpen(false);
    onDelete();
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label={`Open actions for ${petName}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-[#101b3d] transition hover:bg-slate-100"
      >
        <EllipsisVertical size={21} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 z-30 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
          <button
            type="button"
            onClick={handleEdit}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-[#101b3d] transition hover:bg-slate-50"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PetActionsMenu;
````

## File: Frontend/src/features/Pet Owner/pet profile/components/MyPetsSection.tsx
````typescript
import { PawPrint, Plus } from "lucide-react";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import type { Pet } from "../types/petProfile.types";

import PetProfileCard from "./PetProfileCard";

type MyPetsSectionProps = {
  pets: Pet[];
  onAddPet: () => void;
  onEditPet: (petId: string) => void;
  onDeletePet: (pet: Pet) => void;
  onBookAppointment: (petId: string) => void;
};

const MyPetsSection = ({
  pets,
  onAddPet,
  onEditPet,
  onDeletePet,
  onBookAppointment,
}: MyPetsSectionProps) => {
  return (
    <section className="mt-8">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <PawPrint
            size={28}
            className="mt-0.5 shrink-0 text-[#078b91]"
          />

          <div>
            <h2 className="text-2xl font-black text-[#101b3d]">
              My Pets
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Manage your pets and book veterinary appointments.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="flex h-11 w-auto items-center justify-center gap-2 border-[#078b91] px-5 text-[#078b91]"
          onClick={onAddPet}
        >
          <Plus size={18} />
          Add New Pet
        </Button>
      </div>

      {pets.length === 0 ? (
        <Card className="border-dashed py-14 text-center shadow-none">
          <PawPrint size={50} className="mx-auto text-[#D4E2E0]" />

          <h3 className="mt-4 text-xl font-black text-[#101b3d]">
            No pets added yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-slate-500">
            Add your first pet to start booking veterinary appointments.
          </p>

          <Button
            type="button"
            className="mx-auto mt-5 flex w-auto items-center gap-2 px-6"
            onClick={onAddPet}
          >
            <Plus size={17} />
            Add First Pet
          </Button>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pets.map((pet) => (
            <PetProfileCard
              key={pet.id}
              pet={pet}
              onEdit={onEditPet}
              onDelete={onDeletePet}
              onBookAppointment={onBookAppointment}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyPetsSection;
````

## File: Frontend/src/features/Pet Owner/pet profile/components/PetActionsMenu.tsx
````typescript
import { useEffect, useRef, useState } from "react";

import {
  EllipsisVertical,
  Pencil,
  Trash2,
} from "lucide-react";

type PetActionsMenuProps = {
  petName: string;
  onEdit: () => void;
  onDelete: () => void;
};

const PetActionsMenu = ({
  petName,
  onEdit,
  onDelete,
}: PetActionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleEdit = () => {
    setIsOpen(false);
    onEdit();
  };

  const handleDelete = () => {
    setIsOpen(false);
    onDelete();
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label={`Open actions for ${petName}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-[#101b3d] transition hover:bg-slate-100"
      >
        <EllipsisVertical size={21} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 z-30 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
          <button
            type="button"
            onClick={handleEdit}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-[#101b3d] transition hover:bg-slate-50"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PetActionsMenu;
````

## File: Frontend/src/features/Pet Owner/pet profile/components/PetForm.tsx
````typescript
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Input from "@/shared/components/Input/Input";
import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import {
  petSchema,
  type PetFormData,
  type PetFormInput,
} from "../schemas/pet.schema";

type PetFormProps = {
  title: string;
  description: string;
  defaultValues?: Partial<PetFormInput>;
  isSaving?: boolean;
  onSubmit: (data: PetFormData) => Promise<void>;
  onCancel: () => void;
};

const PetForm = ({
  title,
  description,
  defaultValues,
  isSaving = false,
  onSubmit,
  onCancel,
}: PetFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PetFormInput, unknown, PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      age: defaultValues?.age ?? "",
      breed: defaultValues?.breed ?? "",
      category: defaultValues?.category,
    },
  });

  return (
    <Card className="mx-auto max-w-3xl p-6 sm:p-8">
      <div className="mb-7">
        <h1 className="text-3xl font-black tracking-[-0.03em] text-[#101b3d]">
          {title}
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-500">
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Pet Name"
            placeholder="Enter pet name"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Age"
            type="number"
            step="0.1"
            min="0"
            placeholder="Enter age"
            error={errors.age?.message}
            {...register("age")}
          />

          <Input
            label="Breed"
            placeholder="Enter breed"
            error={errors.breed?.message}
            {...register("breed")}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              {...register("category")}
              className={`h-[46px] w-full rounded-xl border bg-white px-4 text-sm font-medium text-slate-600 outline-none transition-all ${
                errors.category
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-[#078b91]"
              }`}
            >
              <option value="">Select category</option>
              <option value="DOG">Dog</option>
              <option value="CAT">Cat</option>
              <option value="REPTILE">Reptile</option>
              <option value="OTHER">Other</option>
            </select>

            {errors.category && (
              <p className="text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="w-auto px-7"
            onClick={onCancel}
            disabled={isSaving || isSubmitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="w-auto px-7"
            disabled={isSaving || isSubmitting}
            isSubmitting={isSaving || isSubmitting}
          >
            Save Pet
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PetForm;
````

## File: Frontend/src/features/Pet Owner/pet profile/components/PetOwnerProfileHeader.tsx
````typescript
import {
  Mail,
  PawPrint,
  Pencil,
  Phone,
  UserRound,
} from "lucide-react";

import Card from "@/shared/components/Card/Card";

import type { PetOwnerProfile } from "../types/petProfile.types";

type PetOwnerProfileHeaderProps = {
  profile: PetOwnerProfile;
  onEditProfile: () => void;
};

const PetOwnerProfileHeader = ({
  profile,
  onEditProfile,
}: PetOwnerProfileHeaderProps) => {
  const fallbackProfileImage =
    "https://ui-avatars.com/api/?name=Pet+Owner&background=EAF7F5&color=078b91";

  return (
    <Card className="p-5 sm:p-7 lg:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="relative mx-auto shrink-0 md:mx-0">
          <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-[#EAF7F5] shadow-lg sm:h-40 sm:w-40">
            <img
              src={profile.profileImageUrl || fallbackProfileImage}
              alt={profile.fullName}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.src = fallbackProfileImage;
              }}
            />
          </div>

          <button
            type="button"
            onClick={onEditProfile}
            aria-label="Edit profile"
            className="absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-white text-[#078b91] shadow-md transition hover:bg-[#078b91] hover:text-white"
          >
            <Pencil size={18} />
          </button>
        </div>

        <div className="min-w-0 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <h1 className="text-3xl font-black tracking-[-0.04em] text-[#101b3d] sm:text-4xl">
              {profile.fullName}
            </h1>

            <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7F5] px-4 py-2 text-xs font-black text-[#078b91]">
              <PawPrint size={15} />
              Pet Parent
            </span>
          </div>

          <p className="mt-2 text-sm font-bold text-slate-500">
            @{profile.username}
          </p>

          <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-600">
            Manage your pets, veterinary appointments, and health information
            from one place.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-600 md:justify-start">
            <ProfileMeta
              icon={<Mail size={18} />}
              value={profile.email}
            />

            <ProfileMeta
              icon={<Phone size={18} />}
              value={profile.phone || "Phone not added"}
            />

            <ProfileMeta
              icon={<UserRound size={18} />}
              value="Pet Owner"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

const ProfileMeta = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#078b91]">{icon}</span>
      <span>{value}</span>
    </div>
  );
};

export default PetOwnerProfileHeader;
````

## File: Frontend/src/features/Pet Owner/pet profile/components/PetProfileCard.tsx
````typescript
import { CalendarDays } from "lucide-react";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import type {
  Pet,
  PetCategory,
} from "../types/petProfile.types";

import PetActionsMenu from "./PetActionsMenu";

type PetProfileCardProps = {
  pet: Pet;
  onEdit: (petId: string) => void;
  onDelete: (pet: Pet) => void;
  onBookAppointment: (petId: string) => void;
};

const categoryImages: Record<PetCategory, string> = {
  DOG: "https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=700&q=80",
  CAT: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=700&q=80",
  REPTILE:
    "https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?auto=format&fit=crop&w=700&q=80",
  OTHER:
    "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=700&q=80",
};

const categoryStyles: Record<PetCategory, string> = {
  DOG: "bg-cyan-50 text-cyan-700",
  CAT: "bg-orange-50 text-orange-600",
  REPTILE: "bg-green-50 text-green-700",
  OTHER: "bg-slate-100 text-slate-700",
};

const formatCategory = (category: PetCategory) => {
  return category.charAt(0) + category.slice(1).toLowerCase();
};

const PetProfileCard = ({
  pet,
  onEdit,
  onDelete,
  onBookAppointment,
}: PetProfileCardProps) => {
  const age = Number(pet.age);

  return (
    <Card className="overflow-visible p-3">
      <div className="flex flex-col gap-4 sm:flex-row xl:flex-col">
        <div className="h-52 w-full shrink-0 overflow-hidden rounded-2xl bg-[#EAF7F5] sm:w-48 xl:w-full">
          <img
            src={categoryImages[pet.category]}
            alt={pet.name}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col px-1 py-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-black text-[#101b3d]">
                {pet.name}
              </h3>

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-black ${
                  categoryStyles[pet.category]
                }`}
              >
                {formatCategory(pet.category)}
              </span>
            </div>

            <PetActionsMenu
              petName={pet.name}
              onEdit={() => onEdit(pet.id)}
              onDelete={() => onDelete(pet)}
            />
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-600">
            {pet.breed}
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-slate-600">
            <CalendarDays size={16} className="text-[#078b91]" />

            <span>
              {age} {age === 1 ? "Year" : "Years"}
            </span>
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="mt-4 flex h-11 w-full items-center justify-center gap-2 border-[#078b91] text-[#078b91] hover:bg-[#078b91] hover:text-white"
        onClick={() => onBookAppointment(pet.id)}
      >
        <CalendarDays size={17} />
        Book Appointment
      </Button>
    </Card>
  );
};

export default PetProfileCard;
````

## File: Frontend/src/features/Pet Owner/pet profile/pages/AddPetPage.tsx
````typescript
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PetForm from "../components/PetForm";
import { createPetApi } from "../api/pets.api";

import type { PetFormData } from "../schemas/pet.schema";

const AddPetPage = () => {
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (data: PetFormData) => {
    try {
      setIsSaving(true);
      setApiError("");

      await createPetApi(data);

      navigate("/pet-owner/profile");
    } catch (error) {
      console.error("Create pet error:", error);

      setApiError(
        "Unable to add pet. The same pet may already exist.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-8 sm:px-6">
      {apiError && (
        <div className="mx-auto mb-5 max-w-3xl rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600">
          {apiError}
        </div>
      )}

      <PetForm
        title="Add New Pet"
        description="Enter your pet details to create a new pet profile."
        isSaving={isSaving}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/pet-owner/profile")}
      />
    </main>
  );
};

export default AddPetPage;
````

## File: Frontend/src/features/Pet Owner/pet profile/pages/EditPetPage.tsx
````typescript
import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import PetForm from "../components/PetForm";

import {
  getPetByIdApi,
  updatePetApi,
} from "../api/pets.api";

import type {
  PetFormData,
  PetFormInput,
} from "../schemas/pet.schema";

const EditPetPage = () => {
  const navigate = useNavigate();
  const { petId } = useParams<{ petId: string }>();

  const [defaultValues, setDefaultValues] =
    useState<PetFormInput | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      if (!petId) {
        setApiError("Pet ID is missing.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const response = await getPetByIdApi(petId);

        setDefaultValues({
          name: response.data.name,
          age: Number(response.data.age),
          breed: response.data.breed,
          category: response.data.category,
        });
      } catch (error) {
        console.error("Fetch pet error:", error);
        setApiError("Unable to load pet details.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchPet();
  }, [petId]);

  const handleSubmit = async (data: PetFormData) => {
    if (!petId) return;

    try {
      setIsSaving(true);
      setApiError("");

      await updatePetApi(petId, data);

      navigate("/pet-owner/profile");
    } catch (error) {
      console.error("Update pet error:", error);
      setApiError("Unable to update pet.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F8FAFA] px-4 py-8">
        <div className="mx-auto h-[500px] max-w-3xl animate-pulse rounded-3xl bg-slate-200" />
      </main>
    );
  }

  if (!defaultValues) {
    return (
      <main className="min-h-screen bg-[#F8FAFA] px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
          {apiError || "Pet not found."}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-8 sm:px-6">
      {apiError && (
        <div className="mx-auto mb-5 max-w-3xl rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600">
          {apiError}
        </div>
      )}

      <PetForm
        title="Edit Pet"
        description="Update your pet information."
        defaultValues={defaultValues}
        isSaving={isSaving}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/pet-owner/profile")}
      />
    </main>
  );
};

export default EditPetPage;
````

## File: Frontend/src/features/Pet Owner/pet profile/pages/PetOwnerProfilePage.tsx
````typescript
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import DeletePetModal from "../components/DeletePetModal";
import MyPetsSection from "../components/MyPetsSection";
import PetOwnerProfileHeader from "../components/PetOwnerProfileHeader";

import { getPetOwnerProfileApi } from "../api/petOwnerProfile.api";
import {
  deletePetApi,
  getMyPetsApi,
} from "../api/pets.api";

import type {
  Pet,
  PetOwnerProfile,
} from "../types/petProfile.types";

const PetOwnerProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<PetOwnerProfile | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const fetchProfileData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const [profileResponse, petsResponse] = await Promise.all([
        getPetOwnerProfileApi(),
        getMyPetsApi(),
      ]);

      setProfile(profileResponse.data);
      setPets(petsResponse.data);
    } catch (fetchError) {
      console.error("Pet owner profile fetch error:", fetchError);
      setError("Unable to load your profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProfileData();
  }, [fetchProfileData]);

  const handleDeletePet = async () => {
    if (!selectedPet) return;

    try {
      setIsDeleting(true);

      await deletePetApi(selectedPet.id);

      setPets((previousPets) =>
        previousPets.filter((pet) => pet.id !== selectedPet.id),
      );

      setSelectedPet(null);
    } catch (deleteError) {
      console.error("Delete pet error:", deleteError);
      setError("Unable to delete pet. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 sm:px-6 lg:px-10">
        <section className="mx-auto max-w-7xl space-y-6">
          <div className="h-64 animate-pulse rounded-3xl bg-slate-200" />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-3xl bg-slate-200"
              />
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (error && !profile) {
    return (
      <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 sm:px-6 lg:px-10">
        <Card className="mx-auto max-w-xl py-12 text-center">
          <h1 className="text-xl font-black text-[#101b3d]">
            Unable to load profile
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            {error}
          </p>

          <Button
            type="button"
            className="mx-auto mt-5 w-auto px-6"
            onClick={() => void fetchProfileData()}
          >
            Try Again
          </Button>
        </Card>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-10">
        <section className="mx-auto max-w-7xl">
          {error && (
            <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          {profile && (
            <PetOwnerProfileHeader
              profile={profile}
              onEditProfile={() =>
                navigate("/pet-owner/profile/edit")
              }
            />
          )}

          <MyPetsSection
            pets={pets}
            onAddPet={() => navigate("/pet-owner/pets/add")}
            onEditPet={(petId) =>
              navigate(`/pet-owner/pets/${petId}/edit`)
            }
            onDeletePet={setSelectedPet}
            onBookAppointment={(petId) =>
              navigate(`/doctors?petId=${petId}`)
            }
          />
        </section>
      </main>

      <DeletePetModal
        isOpen={Boolean(selectedPet)}
        petName={selectedPet?.name ?? ""}
        isDeleting={isDeleting}
        onClose={() => {
          if (!isDeleting) {
            setSelectedPet(null);
          }
        }}
        onConfirm={() => void handleDeletePet()}
      />
    </>
  );
};

export default PetOwnerProfilePage;
````

## File: Frontend/src/features/Pet Owner/pet profile/petProfile.route.tsx
````typescript
import PetOwnerProfilePage from "./pages/PetOwnerProfilePage";
import AddPetPage from "./pages/AddPetPage";
import EditPetPage from "./pages/EditPetPage";

export const petProfileRoutes = [
  {
    path: "/pet-owner/profile",
    element: <PetOwnerProfilePage />,
  },
  {
    path: "/pet-owner/pets/add",
    element: <AddPetPage />,
  },
  {
    path: "/pet-owner/pets/:petId/edit",
    element: <EditPetPage />,
  },
];
````

## File: Frontend/src/features/Pet Owner/pet profile/schemas/pet.schema.ts
````typescript
import { z } from "zod";

export const petSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Pet name must contain at least 2 characters")
    .max(50, "Pet name is too long"),

  age: z.coerce
    .number({
      message: "Age is required",
    })
    .min(0, "Age cannot be negative")
    .max(100, "Enter a valid pet age"),

  breed: z
    .string()
    .trim()
    .min(2, "Breed must contain at least 2 characters")
    .max(50, "Breed is too long"),

  category: z.enum(["DOG", "CAT", "REPTILE", "OTHER"], {
    message: "Please select a category",
  }),
});

export type PetFormInput = z.input<typeof petSchema>;
export type PetFormData = z.output<typeof petSchema>;
````

## File: Frontend/src/features/Pet Owner/pet profile/types/petProfile.types.ts
````typescript
export type PetCategory = "DOG" | "CAT" | "REPTILE" | "OTHER";

export type PetOwnerProfile = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  profileImageUrl: string;
};

export type Pet = {
  id: string;
  petOwnerId: string;
  name: string;
  age: number | string;
  breed: string;
  category: PetCategory;
};

export type PetOwnerProfileResponse = {
  success: boolean;
  message: string;
  data: PetOwnerProfile;
};

export type PetsResponse = {
  success: boolean;
  message: string;
  data: Pet[];
};

export type PetResponse = {
  success: boolean;
  message: string;
  data: Pet;
};
````

## File: Frontend/src/features/Pet Owner/SelectPet/components/AddNewPetCard.tsx
````typescript
import { ChevronRight, Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Card from "@/shared/components/Card/Card";

const AddNewPetCard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const action = searchParams.get("action");

  const handleAddNewPet = () => {
    const continueQuery = action ? `&continue=${action}` : "";

    navigate(`/pet-owner/profile?action=add-pet${continueQuery}`);
  };

  return (
    <Card
      className="
        mx-auto mt-8 w-full max-w-2xl
        border border-orange-200
        bg-gradient-to-r from-orange-50 to-white
        p-0 shadow-sm
        transition duration-300
        hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md
      "
    >
      <button
        type="button"
        onClick={handleAddNewPet}
        className="flex w-full items-center gap-5 p-5 text-left sm:p-7"
      >
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
          <Plus size={34} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-xl font-black text-orange-500">
            Add New Pet
          </span>

          <span className="mt-1 block text-sm font-medium leading-6 text-slate-600">
            Go to your profile to add a new pet before continuing.
          </span>
        </span>

        <ChevronRight size={26} className="shrink-0 text-[#101b3d]" />
      </button>
    </Card>
  );
};

export default AddNewPetCard;
````

## File: Frontend/src/features/Pet Owner/SelectPet/components/ExistingPetCard.tsx
````typescript
import {
  CalendarDays,
  MoreVertical,
  UserRound,
} from "lucide-react";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import type { ExistingPet } from "../types/selectPet.types";

type ExistingPetCardProps = {
  pet: ExistingPet;
  onSelect: (pet: ExistingPet) => void;
};

const formatCategory = (category: ExistingPet["category"]) => {
  return (
    category.charAt(0).toUpperCase() +
    category.slice(1).toLowerCase()
  );
};

const ExistingPetCard = ({
  pet,
  onSelect,
}: ExistingPetCardProps) => {
  return (
    <Card
      className="
        overflow-hidden border border-slate-200
        bg-white p-4 shadow-sm
        transition duration-300
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      <div className="flex gap-4">
        <div className="h-40 w-36 shrink-0 overflow-hidden rounded-2xl bg-[#EAF7F5] sm:h-44 sm:w-40">
          <img
            src={pet.profileImageUrl}
            alt={pet.name}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-[#101b3d]">
                {pet.name}
              </h2>

              <p className="mt-2 text-sm font-semibold text-slate-500">
                {formatCategory(pet.category)}

                <span className="mx-2 text-[#078b91]">•</span>

                {pet.breed}
              </p>
            </div>

            <button
              type="button"
              aria-label={`More options for ${pet.name}`}
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-[#078b91]"
            >
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <CalendarDays size={17} className="text-[#078b91]" />

              <span>
                {pet.age} {pet.age === 1 ? "Year" : "Years"}
              </span>
            </div>

            {pet.gender && (
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <UserRound size={17} className="text-[#078b91]" />
                <span>{pet.gender}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="
          mt-4 h-11 w-full
          border-[#078b91] text-[#078b91]
          hover:bg-[#078b91] hover:text-white
        "
        onClick={() => onSelect(pet)}
      >
        Select Pet
      </Button>
    </Card>
  );
};

export default ExistingPetCard;
````

## File: Frontend/src/features/Pet Owner/SelectPet/components/ExistingPetsSection.tsx
````typescript
import Card from "@/shared/components/Card/Card";

import type { ExistingPet } from "../types/selectPet.types";
import ExistingPetCard from "./ExistingPetCard";

type ExistingPetsSectionProps = {
  pets: ExistingPet[];
  onSelectPet: (pet: ExistingPet) => void;
};

const ExistingPetsSection = ({
  pets,
  onSelectPet,
}: ExistingPetsSectionProps) => {
  if (pets.length === 0) {
    return (
      <Card
        className="
          mt-10 border border-dashed border-slate-300
          bg-white px-6 py-12 text-center shadow-none
        "
      >
        <h2 className="text-xl font-black text-[#101b3d]">
          No existing pets found
        </h2>

        <p className="mt-2 text-sm font-medium text-slate-500">
          Add a pet from your profile before continuing.
        </p>
      </Card>
    );
  }

  return (
    <section className="mt-10">
      <div className="mb-5">
        <h2 className="text-2xl font-black text-[#101b3d]">
          Existing Pets
        </h2>

        <p className="mt-1 text-sm font-medium text-slate-500">
          Select a pet to continue.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {pets.map((pet) => (
          <ExistingPetCard
            key={pet.id}
            pet={pet}
            onSelect={onSelectPet}
          />
        ))}
      </div>
    </section>
  );
};

export default ExistingPetsSection;
````

## File: Frontend/src/features/Pet Owner/SelectPet/components/SelectPetHeader.tsx
````typescript
import { PawPrint } from "lucide-react";

const SelectPetHeader = () => {
  return (
    <header className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF7F5] text-[#078b91]">
        <PawPrint size={30} />
      </div>

      <h1 className="mt-5 text-3xl font-black tracking-[-0.04em] text-[#101b3d] sm:text-4xl">
        Choose Your Pet
      </h1>

      <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 text-slate-500 sm:text-base">
        Select one of your existing pets or go to your profile to add a new
        pet.
      </p>
    </header>
  );
};

export default SelectPetHeader;
````

## File: Frontend/src/features/Pet Owner/SelectPet/data/selectPet.data.ts
````typescript
import type { ExistingPet } from "../types/selectPet.types";

export const existingPets: ExistingPet[] = [
  {
    id: "pet-1",
    name: "Khokhar",
    category: "DOG",
    breed: "German Shepherd",
    age: 3,
    gender: "Male",
    profileImageUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "pet-2",
    name: "Kitty",
    category: "CAT",
    breed: "Persian",
    age: 2,
    gender: "Female",
    profileImageUrl:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "pet-3",
    name: "Coco",
    category: "BIRD",
    breed: "Parrot",
    age: 1,
    gender: "Male",
    profileImageUrl:
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=500&q=80",
  },
];
````

## File: Frontend/src/features/Pet Owner/SelectPet/pages/SelectPetPage.tsx
````typescript
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import AddNewPetCard from "../components/AddNewPetCard";
import ExistingPetsSection from "../components/ExistingPetsSection";
import SelectPetHeader from "../components/SelectPetHeader";

import { existingPets } from "../data/selectPet.data";

import type {
  ExistingPet,
  SelectPetAction,
} from "../types/selectPet.types";

const SelectPetPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const action = searchParams.get("action") as SelectPetAction | null;

  const handleSelectPet = (pet: ExistingPet) => {
    if (action === "report-issue") {
      navigate(`/pet-owner/pets/${pet.id}/report-issue`);
      return;
    }

    if (action === "book-appointment") {
      navigate(`/doctors?petId=${pet.id}`);
      return;
    }

    navigate(`/pet-owner/pets/${pet.id}`);
  };

  const handleGoToProfile = () => {
    const continueQuery = action ? `&continue=${action}` : "";

    navigate(`/pet-owner/profile?action=add-pet${continueQuery}`);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-5 text-[#20263D] sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex h-11 w-auto items-center gap-2 px-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back
          </Button>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="h-11 w-11 overflow-hidden rounded-full bg-[#EAF7F5]">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                alt="Pet owner"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-black text-[#101b3d]">
                Ayesha Khan
              </p>

              <p className="text-xs font-semibold text-slate-500">
                Pet Parent
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <SelectPetHeader />
        </div>

        <AddNewPetCard />

        <ExistingPetsSection
          pets={existingPets}
          onSelectPet={handleSelectPet}
        />

        {/* Shared helper card */}
        <Card
          className="
            mt-8 border border-[#D4E2E0]
            bg-[#EAF7F5]/70 p-5 shadow-none sm:p-6
          "
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#078b91] shadow-sm">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h3 className="text-base font-black text-[#078b91]">
                  Can&apos;t find your pet?
                </h3>

                <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-600">
                  Add a new pet from your profile to access appointments,
                  reports, and other pet-care features.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="
                flex h-11 w-auto shrink-0 items-center gap-2
                border-[#078b91] px-5 text-[#078b91]
              "
              onClick={handleGoToProfile}
            >
              Go to Profile
              <ArrowRight size={18} />
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
};

export default SelectPetPage;
````

## File: Frontend/src/features/Pet Owner/SelectPet/selectPet.route.tsx
````typescript
import SelectPetPage from "./pages/SelectPetPage";

export const selectPetRoutes = [
  {
    path: "/pet-owner/select-pet",
    element: <SelectPetPage />,
  },
];
````

## File: Frontend/src/features/Pet Owner/SelectPet/types/selectPet.types.ts
````typescript
export type PetCategory = "DOG" | "CAT" | "BIRD" | "REPTILE" | "OTHER";

export type ExistingPet = {
  id: string;
  name: string;
  breed: string;
  category: PetCategory;
  age: number;
  gender?: string;
  profileImageUrl: string;
};

export type SelectPetAction = "report-issue" | "book-appointment";
````

## File: Frontend/src/features/PetOwnerDashboard/api/petOwnerDashboard.api.ts
````typescript
import {api} from "@/features/api interface/axios.interface";

import type {
  PetOwnerDashboardResponse,
} from "../types/petOwnerDashboard.types";

export const getPetOwnerDashboardApi =
  async (): Promise<PetOwnerDashboardResponse> => {
    const response =
      await api.get<PetOwnerDashboardResponse>(
        "/pet-owner/dashboard",
      );

    return response.data;
  };
````

## File: Frontend/src/features/PetOwnerDashboard/components/DashboardBanner.tsx
````typescript
import { HeartPulse } from "lucide-react";

const DashboardBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#EAF7F5] px-6 py-5">
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#078b91]">
          <HeartPulse size={24} />
        </div>

        <div>
          <h3 className="font-black text-[#078b91]">
            A happy pet makes a happy family!
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-600">
            Regular checkups and timely care keep your pets healthy and joyful.
          </p>
        </div>
      </div>

      <div className="absolute -bottom-8 right-6 hidden text-[100px] opacity-10 md:block">
        🐾
      </div>
    </section>
  );
};

export default DashboardBanner;
````

## File: Frontend/src/features/PetOwnerDashboard/components/DashboardHeader.tsx
````typescript
import { Bell, ChevronDown } from "lucide-react";

import type {
  DashboardUser,
} from "../types/petOwnerDashboard.types";

type DashboardHeaderProps = {
  user: DashboardUser;
};

const DashboardHeader = ({
  user,
}: DashboardHeaderProps) => {
  const firstName =
    user.fullName.split(" ")[0] || user.fullName;

  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-black tracking-[-0.04em] text-[#101b3d]">
          Hi, {firstName}!
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-500">
          Here&apos;s what&apos;s happening with your pets today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-11 w-11 items-center justify-center rounded-full text-[#101b3d] transition hover:bg-slate-100"
        >
          <Bell size={23} />

          <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
            3
          </span>
        </button>

        <div className="h-12 w-12 overflow-hidden rounded-full bg-[#EAF7F5]">
          <img
            src={user.profileImageUrl}
            alt={user.fullName}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="hidden sm:block">
          <p className="text-sm font-black text-[#101b3d]">
            {user.fullName}
          </p>

          <p className="text-xs font-semibold text-slate-500">
            Pet Parent
          </p>
        </div>

        <ChevronDown size={18} className="text-[#101b3d]" />
      </div>
    </header>
  );
};

export default DashboardHeader;
````

## File: Frontend/src/features/PetOwnerDashboard/components/DashboardSidebar.tsx
````typescript
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  PawPrint,
  Settings,
  ShoppingCart,
  Stethoscope,
  UserRound,
  FileText,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

type SidebarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    path: "/pet-owner/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: "Appointments",
    path: "/pet-owner/appointments",
    icon: <CalendarDays size={20} />,
  },
  {
    label: "Reports",
    path: "/pet-owner/reports",
    icon: <FileText size={20} />,
  },
  {
    label: "Find Doctor",
    path: "/doctors",
    icon: <Stethoscope size={20} />,
  },
  {
    label: "Marketplace",
    path: "/marketplace",
    icon: <ShoppingCart size={20} />,
  },
  {
    label: "Profile",
    path: "/pet-owner/profile",
    icon: <UserRound size={20} />,
  },
  {
    label: "Settings",
    path: "/pet-owner/settings",
    icon: <Settings size={20} />,
  },
];

const DashboardSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-[260px] border-r border-slate-200 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-7 py-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7F5] text-[#078b91]">
          <PawPrint size={27} />
        </div>

        <div>
          <h1 className="text-xl font-black text-[#078b91]">
            Pets Veta
          </h1>

          <p className="text-xs font-semibold text-slate-500">
            Care • Love • Heal
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold transition ${
                isActive
                  ? "bg-[#EAF7F5] text-[#078b91]"
                  : "text-[#20263D] hover:bg-slate-50"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Small sidebar info */}
      <div className="mx-4 mb-5 rounded-2xl bg-[#F1FAF8] p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#078b91]">
          <PawPrint size={24} />
        </div>

        <h3 className="mt-4 text-lg font-black text-[#101b3d]">
          We care for your pets
        </h3>

        <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
          Book appointments and track your pet&apos;s health easily.
        </p>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="mx-5 mb-6 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default DashboardSidebar;
````

## File: Frontend/src/features/PetOwnerDashboard/components/DashboardStats.tsx
````typescript
import {
  ArrowRight,
  FileText,
  PawPrint,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Card from "@/shared/components/Card/Card";

import type {
  DashboardCounts,
} from "../types/petOwnerDashboard.types";

type DashboardStatsProps = {
  counts: DashboardCounts;
};

const DashboardStats = ({
  counts,
}: DashboardStatsProps) => {
  const navigate = useNavigate();

  return (
    <section className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {/* Pets */}
      <Card className="p-6">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#EAF7F5] text-[#078b91]">
            <PawPrint size={35} />
          </div>

          <div>
            <p className="text-sm font-black text-[#101b3d]">
              My Pets
            </p>

            <h2 className="mt-1 text-4xl font-black text-[#101b3d]">
              {counts.totalPets}
            </h2>

            <button
              type="button"
              onClick={() => navigate("/pet-owner/profile")}
              className="mt-3 flex items-center gap-2 text-sm font-bold text-[#078b91]"
            >
              View all pets
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Appointments without icon */}
      <Card className="p-6">
        <div className="grid grid-cols-[1fr_auto] gap-6">
          <div>
            <p className="text-sm font-black text-[#101b3d]">
              Total Appointments
            </p>

            <h2 className="mt-2 text-4xl font-black text-[#101b3d]">
              {counts.totalAppointments}
            </h2>

            <button
              type="button"
              onClick={() =>
                navigate("/pet-owner/appointments")
              }
              className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              View all appointments
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="border-l border-slate-200 pl-6">
            <StatusCount
              label="Upcoming"
              value={counts.upcomingAppointments}
              className="text-blue-600"
            />

            <StatusCount
              label="Completed"
              value={counts.completedAppointments}
              className="mt-3 text-emerald-600"
            />

            <StatusCount
              label="Cancelled"
              value={counts.cancelledAppointments}
              className="mt-3 text-red-500"
            />
          </div>
        </div>
      </Card>

      {/* Reports */}
      <Card className="p-6 md:col-span-2 xl:col-span-1">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
            <FileText size={35} />
          </div>

          <div>
            <p className="text-sm font-black text-[#101b3d]">
              Reports
            </p>

            <h2 className="mt-1 text-4xl font-black text-[#101b3d]">
              {counts.totalReports}
            </h2>

            <button
              type="button"
              onClick={() => navigate("/pet-owner/reports")}
              className="mt-3 flex items-center gap-2 text-sm font-bold text-[#078b91]"
            >
              View all reports
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
};

const StatusCount = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: number;
  className?: string;
}) => {
  return (
    <div className={className}>
      <p className="text-xs font-bold">{label}</p>
      <p className="mt-0.5 text-sm font-black">{value}</p>
    </div>
  );
};

export default DashboardStats;
````

## File: Frontend/src/features/PetOwnerDashboard/components/MyPetsPreview.tsx
````typescript
import {
  ArrowRight,
  PawPrint,
  Plus,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import type { Pet } from "../types/petOwnerDashboard.types";

import PetPreviewCard from "./PetPreviewCard";

type MyPetsPreviewProps = {
  pets: Pet[];
};

const MyPetsPreview = ({ pets }: MyPetsPreviewProps) => {
  const navigate = useNavigate();

  return (
    <Card className="min-w-0 p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <PawPrint size={25} className="text-[#078b91]" />

          <h2 className="text-xl font-black text-[#101b3d]">
            My Pets
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigate("/pet-owner/profile")}
          className="flex w-fit items-center gap-2 text-sm font-black text-[#078b91]"
        >
          View All Pets
          <ArrowRight size={17} />
        </button>
      </div>

      {pets.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 px-5 py-12 text-center">
          <PawPrint
            size={45}
            className="mx-auto text-[#D4E2E0]"
          />

          <h3 className="mt-4 text-lg font-black text-[#101b3d]">
            No pets added yet
          </h3>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Add your first pet to book appointments.
          </p>

          <Button
            type="button"
            className="mx-auto mt-5 flex w-auto items-center gap-2 px-5"
            onClick={() => navigate("/pet-owner/pets/add")}
          >
            <Plus size={17} />
            Add New Pet
          </Button>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pets.slice(0, 3).map((pet) => (
            <PetPreviewCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}

      {/* Bottom Add Pet Button */}
      <div className="mt-5 flex justify-end">
        <Button
          type="button"
          variant="outline"
          className="flex h-10 w-auto items-center gap-2 border-[#078b91] px-5 text-[#078b91]"
          onClick={() => navigate("/pet-owner/pets/add")}
        >
          <Plus size={17} />
          Add New Pet
        </Button>
      </div>
    </Card>
  );
};

export default MyPetsPreview;
````

## File: Frontend/src/features/PetOwnerDashboard/components/PetPreviewCard.tsx
````typescript
import {
  CalendarDays,
  EllipsisVertical,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import type {
  Pet,
  PetCategory,
} from "../types/petOwnerDashboard.types";

type PetPreviewCardProps = {
  pet: Pet;
};

const categoryImages: Record<PetCategory, string> = {
  DOG: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80",

  CAT: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=700&q=80",

  REPTILE:
    "https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?auto=format&fit=crop&w=700&q=80",

  OTHER:
    "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=700&q=80",
};

const categoryLabels: Record<PetCategory, string> = {
  DOG: "Dog",
  CAT: "Cat",
  REPTILE: "Reptile",
  OTHER: "Bird",
};

const PetPreviewCard = ({ pet }: PetPreviewCardProps) => {
  const navigate = useNavigate();

  const age = Number(pet.age);

  return (
    <Card className="min-w-0 overflow-visible p-3">
      {/* Image */}
      <div className="relative h-44 overflow-hidden rounded-2xl bg-[#EAF7F5]">
        <img
          src={categoryImages[pet.category]}
          alt={pet.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />

        <span className="absolute right-3 top-3 rounded-lg bg-white/90 px-3 py-1 text-xs font-black text-[#078b91] shadow-sm">
          {categoryLabels[pet.category]}
        </span>
      </div>

      {/* Information */}
      <div className="px-1 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-black text-[#101b3d]">
              {pet.name}
            </h3>

            <p className="mt-1 truncate text-sm font-semibold text-slate-500">
              {pet.breed}
            </p>
          </div>

          <button
            type="button"
            aria-label={`More actions for ${pet.name}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#101b3d] transition hover:bg-slate-100"
          >
            <EllipsisVertical size={19} />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
          <CalendarDays size={16} className="shrink-0 text-[#078b91]" />

          <span>
            {age} {age === 1 ? "Year" : "Years"}
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="mt-4 flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap border-[#078b91] px-3 text-xs text-[#078b91]"
        onClick={() => navigate(`/doctors?petId=${pet.id}`)}
      >
        <CalendarDays size={15} />
        Book Appointment
      </Button>
    </Card>
  );
};

export default PetPreviewCard;
````

## File: Frontend/src/features/PetOwnerDashboard/components/QuickActions.tsx
````typescript
import {
  ArrowRight,
  Bell,
  CalendarPlus,
  FileText,
  HeartPulse,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Card from "@/shared/components/Card/Card";

const quickActions = [
  {
    title: "Book Appointment",
    description: "Find and book a vet appointment",
    icon: <CalendarPlus size={26} />,
    iconClass: "bg-[#EAF7F5] text-[#078b91]",
    path: "/doctors",
  },
  {
    title: "Report Issue",
    description: "Report an issue for your pet",
    icon: <FileText size={26} />,
    iconClass: "bg-orange-50 text-orange-500",
    path: "/pet-owner/select-pet?action=report-issue",
  },
  {
    title: "Health Records",
    description: "View your pet's health history",
    icon: <HeartPulse size={26} />,
    iconClass: "bg-blue-50 text-blue-600",
    path: "/pet-owner/reports",
  },
  {
    title: "Reminders",
    description: "Set reminders for meds and checkups",
    icon: <Bell size={26} />,
    iconClass: "bg-purple-50 text-purple-600",
    path: "/pet-owner/reminders",
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-5">
      <h2 className="text-xl font-black text-[#101b3d]">
        Quick Actions
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => (
          <button
            key={action.title}
            type="button"
            onClick={() => navigate(action.path)}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#078b91]/30 hover:shadow-sm"
          >
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${action.iconClass}`}
            >
              {action.icon}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-black text-[#101b3d]">
                {action.title}
              </h3>

              <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                {action.description}
              </p>
            </div>

            <ArrowRight
              size={18}
              className="shrink-0 text-[#078b91]"
            />
          </button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
````

## File: Frontend/src/features/PetOwnerDashboard/components/UpcomingAppointments.tsx
````typescript
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Card from "@/shared/components/Card/Card";

import type {
  DashboardAppointment,
} from "../types/petOwnerDashboard.types";

type UpcomingAppointmentsProps = {
  appointments: DashboardAppointment[];
};

const petImages = [
  "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=200&q=80",
];

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const formatTime = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const UpcomingAppointments = ({
  appointments,
}: UpcomingAppointmentsProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-black text-[#101b3d]">
          Upcoming Appointments
        </h2>

        <button
          type="button"
          onClick={() =>
            navigate("/pet-owner/appointments")
          }
          className="flex items-center gap-2 text-sm font-black text-[#078b91]"
        >
          View All
          <ArrowRight size={17} />
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {appointments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 px-5 py-10 text-center">
            <p className="text-sm font-bold text-slate-500">
              No upcoming appointments.
            </p>
          </div>
        ) : (
          appointments.slice(0, 2).map((appointment, index) => (
            <button
              key={appointment.id}
              type="button"
              onClick={() =>
                navigate(
                  `/pet-owner/appointments/${appointment.id}`,
                )
              }
              className="flex w-full items-start gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-[#078b91]/30 hover:bg-[#F8FCFB]"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#EAF7F5]">
                <img
                  src={petImages[index % petImages.length]}
                  alt={appointment.petName}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black text-[#101b3d]">
                      {appointment.petName}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      {appointment.doctorName}
                    </p>
                  </div>

                  <span className="rounded-lg bg-[#EAF7F5] px-3 py-1 text-xs font-black text-[#078b91]">
                    {appointment.appointmentType}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={14} />
                    {formatDate(appointment.checkupTime)}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock3 size={14} />
                    {formatTime(appointment.checkupTime)}
                  </span>

                  <span className="flex items-center gap-2">
                    <MapPin size={14} />
                    {appointment.clinicAddress}
                  </span>
                </div>
              </div>

              <ArrowRight
                size={18}
                className="mt-5 shrink-0 text-[#078b91]"
              />
            </button>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={() =>
          navigate("/pet-owner/appointments")
        }
        className="mt-5 flex items-center gap-2 text-sm font-black text-[#078b91]"
      >
        View All Appointments
        <ArrowRight size={17} />
      </button>
    </Card>
  );
};

export default UpcomingAppointments;
````

## File: Frontend/src/features/PetOwnerDashboard/data/dashboard.data.ts
````typescript
import type {
  PetOwnerDashboardData,
} from "../types/petOwnerDashboard.types";

export const dashboardData: PetOwnerDashboardData = {
  user: {
    id: "user-1",
    fullName: "Ayesha Khan",
    profileImageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },

  counts: {
    totalPets: 3,
    totalAppointments: 8,
    upcomingAppointments: 2,
    completedAppointments: 5,
    cancelledAppointments: 1,
    totalReports: 4,
  },

  pets: [
    {
      id: "pet-1",
      petOwnerId: "user-1",
      name: "Bruno",
      age: 3,
      breed: "German Shepherd",
      category: "DOG",
    },
    {
      id: "pet-2",
      petOwnerId: "user-1",
      name: "Kitty",
      age: 2,
      breed: "Persian Cat",
      category: "CAT",
    },
    {
      id: "pet-3",
      petOwnerId: "user-1",
      name: "Coco",
      age: 1,
      breed: "Parrot",
      category: "OTHER",
    },
  ],

  upcomingAppointments: [
    {
      id: "appointment-1",
      petId: "pet-1",
      petName: "Bruno",
      doctorId: "doctor-1",
      doctorName: "Dr. Ayesha Khan",
      appointmentType: "Checkup",
      checkupTime: "2026-05-24T10:00:00.000Z",
      clinicAddress: "Downtown Pet Clinic",
      status: "PENDING",
    },
    {
      id: "appointment-2",
      petId: "pet-2",
      petName: "Kitty",
      doctorId: "doctor-2",
      doctorName: "Dr. Ali Raza",
      appointmentType: "Vaccination",
      checkupTime: "2026-05-28T14:30:00.000Z",
      clinicAddress: "City Pet Care Hospital",
      status: "PENDING",
    },
  ],
};
````

## File: Frontend/src/features/PetOwnerDashboard/pages/PetOwnerDashboardPage.tsx
````typescript
import DashboardBanner from "../components/DashboardBanner";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardStats from "../components/DashboardStats";
import MyPetsPreview from "../components/MyPetsPreview";
import QuickActions from "../components/QuickActions";
import UpcomingAppointments from "../components/UpcomingAppointments";

import { dashboardData } from "../data/dashboard.data";

const PetOwnerDashboardPage = () => {
  return (
    <main className="min-h-screen bg-[#F8FAFA] text-[#20263D]">
      <DashboardSidebar />

      <section className="min-h-screen px-4 py-6 sm:px-6 lg:ml-[260px] lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <DashboardHeader user={dashboardData.user} />

          <DashboardStats counts={dashboardData.counts} />

          <section className="mt-5 grid gap-5 2xl:grid-cols-[minmax(0,1fr)_390px]">
            <MyPetsPreview pets={dashboardData.pets} />

            <UpcomingAppointments
              appointments={dashboardData.upcomingAppointments}
            />
          </section>

          <div className="mt-5">
            <QuickActions />
          </div>

          <div className="mt-5">
            <DashboardBanner />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PetOwnerDashboardPage;
````

## File: Frontend/src/features/PetOwnerDashboard/petOwnerDashboard.route.tsx
````typescript
import PetOwnerDashboardPage from "./pages/PetOwnerDashboardPage";

export const petOwnerDashboardRoutes = [
  {
    path: "/pet-owner/dashboard",
    element: <PetOwnerDashboardPage />,
  },
];
````

## File: Frontend/src/features/PetOwnerDashboard/types/petOwnerDashboard.types.ts
````typescript
export type PetCategory = "DOG" | "CAT" | "REPTILE" | "OTHER";

export type Pet = {
  id: string;
  petOwnerId: string;
  name: string;
  age: number | string;
  breed: string;
  category: PetCategory;
};

export type AppointmentStatus =
  | "PENDING"
  | "COMPLETED"
  | "CANCELLED";

export type DashboardAppointment = {
  id: string;
  petId: string;
  petName: string;
  doctorId: string;
  doctorName: string;
  appointmentType: string;
  checkupTime: string;
  clinicAddress: string;
  status: AppointmentStatus;
};

export type DashboardCounts = {
  totalPets: number;
  totalAppointments: number;
  upcomingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalReports: number;
};

export type DashboardUser = {
  id: string;
  fullName: string;
  profileImageUrl: string;
};

export type PetOwnerDashboardData = {
  user: DashboardUser;
  counts: DashboardCounts;
  pets: Pet[];
  upcomingAppointments: DashboardAppointment[];
};

export type PetOwnerDashboardResponse = {
  success: boolean;
  message: string;
  data: PetOwnerDashboardData;
};
````

## File: Frontend/src/features/Services/components/ServiceCard.tsx
````typescript
import type { IconType } from "react-icons";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: IconType;
  color: string;
};

const ServiceCard = ({
  title,
  description,
  icon: Icon,
  color,
}: ServiceCardProps) => {
  return (
    <div className="group rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-2xl text-[#009f9d]`}
      >
        <Icon />
      </div>

      <h3 className="text-xl font-extrabold text-[#07182c]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <button
        type="button"
        className="mt-5 text-sm font-extrabold text-[#009f9d] transition group-hover:underline"
      >
        Learn More
      </button>
    </div>
  );
};

export default ServiceCard;
````

## File: Frontend/src/features/Services/components/ServicesCTA.tsx
````typescript
import { Link } from "react-router-dom";
import Button from "../../../shared/components/Button";

const ServicesCTA = () => {
    return (
        <section className="bg-white px-5 pb-16 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-[36px] bg-gradient-to-br from-[#bdf0ee] via-[#f5fbff] to-[#fff3ec] p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.10)] md:p-12">
                <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
                    Need professional care for your pet?
                </h2>

                <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
                    Book verified doctors, explore pet-care services and get AI-powered
                    guidance from PetsVeta.
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-4">
                    <Link to="/doctors">
                        <Button>Find Doctors</Button>
                    </Link>

                    <Link
                        to="/ai-assistant"
                        className="inline-flex items-center justify-center rounded-xl border border-[#009f9d] px-5 py-3 text-sm font-bold text-[#009f9d] transition hover:bg-[#eefafa]"
                    >
                        Try AI Assistant
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesCTA;
````

## File: Frontend/src/features/Services/components/ServicesGrid.tsx
````typescript
import ServiceCard from "./ServiceCard";
import { servicesData } from "../data/services.data";

const ServicesGrid = () => {
    return (
        <section className="bg-white px-5 py-16 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 max-w-2xl">
                    <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
                        Our Pet-Care{" "}
                        <span className="text-[#009f9d]">Services</span>
                    </h2>

                    <p className="mt-3 leading-7 text-slate-600">
                        Choose from professional pet-care services designed for everyday
                        health, safety and wellness.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {servicesData.map((service) => (
                        <ServiceCard
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            color={service.color}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
````

## File: Frontend/src/features/Services/components/ServicesHero.tsx
````typescript
import {
    FaPaw,
    FaShieldAlt,
    FaStethoscope,
} from "react-icons/fa";

const ServicesHero = () => {
    return (
        <section className="bg-gradient-to-br from-[#f5fbff] via-white to-[#d9f7f6] px-5 py-16 lg:px-16">
            <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
                <div>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#009f9d] shadow-sm">
                        <FaPaw />
                        PetsVeta Services
                    </div>

                    <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-[#07182c] md:text-5xl">
                        Complete pet-care services for healthier and happier pets.
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                        Explore professional veterinary care, grooming, vaccinations,
                        emergency support and AI-powered pet assistance in one platform.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07182c] shadow-sm">
                            <FaShieldAlt className="text-[#009f9d]" />
                            Trusted Care
                        </span>

                        <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07182c] shadow-sm">
                            <FaStethoscope className="text-[#009f9d]" />
                            Verified Doctors
                        </span>
                    </div>
                </div>

                <div className="rounded-[40px] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                    <div className="grid gap-5 rounded-[32px] bg-gradient-to-br from-[#bdf0ee] to-[#fff3ec] p-6 sm:grid-cols-2">
                        <div className="rounded-3xl bg-white p-5 shadow-sm">
                            <h3 className="text-3xl font-extrabold text-[#009f9d]">
                                100+
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-slate-600">
                                Veterinary Doctors
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-5 shadow-sm">
                            <h3 className="text-3xl font-extrabold text-[#009f9d]">
                                24/7
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-slate-600">
                                Emergency Support
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-5 shadow-sm">
                            <h3 className="text-3xl font-extrabold text-[#009f9d]">
                                AI
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-slate-600">
                                Smart Assistance
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-5 shadow-sm">
                            <h3 className="text-3xl font-extrabold text-[#009f9d]">
                                10K+
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-slate-600">
                                Happy Pet Owners
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesHero;
````

## File: Frontend/src/features/Services/components/ServicesProcess.tsx
````typescript
import {
    FaCalendarCheck,
    FaClipboardCheck,
    FaPaw,
    FaUserMd,
} from "react-icons/fa";

const processSteps = [
    {
        icon: <FaPaw />,
        title: "Choose Service",
        description:
            "Select the service your pet needs such as consultation, grooming or emergency care.",
    },

    {
        icon: <FaUserMd />,
        title: "Find Experts",
        description:
            "Browse verified veterinary doctors and professional pet-care providers.",
    },

    {
        icon: <FaCalendarCheck />,
        title: "Book Appointment",
        description:
            "Schedule appointments easily with flexible timings and secure booking.",
    },

    {
        icon: <FaClipboardCheck />,
        title: "Get Pet Care",
        description:
            "Receive trusted pet-care services and ongoing health support.",
    },
];

const ServicesProcess = () => {
    return (
        <section className="bg-[#f5fbff] px-5 py-16 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
                        How It <span className="text-[#009f9d]">Works</span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
                        A simple process to help pet owners quickly access trusted services
                        and care.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {processSteps.map((step, index) => (
                        <div
                            key={step.title}
                            className="relative rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
                        >
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eefafa] text-2xl text-[#009f9d]">
                                {step.icon}
                            </div>

                            <span className="mb-3 inline-flex rounded-full bg-[#f5fbff] px-3 py-1 text-xs font-extrabold text-[#009f9d]">
                                Step {index + 1}
                            </span>

                            <h3 className="text-xl font-extrabold text-[#07182c]">
                                {step.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesProcess;
````

## File: Frontend/src/features/Services/data/services.data.ts
````typescript
import {
    FaStethoscope,
    FaSyringe,
    FaCut,
    FaHeartbeat,
    FaAmbulance,
    FaPaw,
} from "react-icons/fa";

export const servicesData = [
    {
        id: 1,
        title: "Veterinary Consultation",
        description:
            "Book professional veterinary consultations for regular pet checkups and health guidance.",
        icon: FaStethoscope,
        color: "from-[#bdf0ee] to-[#eefafa]",
    },

    {
        id: 2,
        title: "Vaccination Services",
        description:
            "Protect your pets with timely vaccinations and preventive healthcare plans.",
        icon: FaSyringe,
        color: "from-[#fff3ec] to-[#fef7f2]",
    },

    {
        id: 3,
        title: "Pet Grooming",
        description:
            "Professional grooming services including cleaning, trimming and hygiene care.",
        icon: FaCut,
        color: "from-[#eefafa] to-[#f5fbff]",
    },

    {
        id: 4,
        title: "Emergency Care",
        description:
            "Immediate emergency support for serious pet health situations and urgent treatment.",
        icon: FaAmbulance,
        color: "from-[#ffe7e7] to-[#fff5f5]",
    },

    {
        id: 5,
        title: "Pet Wellness",
        description:
            "Health monitoring, nutrition advice and wellness programs for long-term pet care.",
        icon: FaHeartbeat,
        color: "from-[#eefafa] to-[#f5fbff]",
    },

    {
        id: 6,
        title: "AI Pet Assistance",
        description:
            "Smart AI guidance for pet symptoms, care suggestions and doctor recommendations.",
        icon: FaPaw,
        color: "from-[#fff3ec] to-[#fef7f2]",
    },
];
````

## File: Frontend/src/features/Services/pages/ServicesPage.tsx
````typescript
import ServicesHero from "../components/ServicesHero";
import ServicesGrid from "../components/ServicesGrid";
import ServicesProcess from "../components/ServicesProcess";
import ServicesCTA from "../components/ServicesCTA";

const ServicesPage = () => {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ServicesProcess />
      <ServicesCTA />
    </>
  );
};

export default ServicesPage;
````

## File: Frontend/src/Global Provider/SmoothScroller.tsx
````typescript
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.9,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.95,
            touchMultiplier: 1.5,
            infinite: false,
            syncTouch: false,
        });

        // 1. Function to instantly snap Lenis to the top
        const handleScrollToTop = () => {
            lenis.scrollTo(0, { immediate: true });
        };

        // 2. Listen to browser navigation history changes natively
        window.addEventListener("popstate", handleScrollToTop);

        // 3. Patch the standard history pushState to catch programmatic route clicks
        const originalPushState = history.pushState;
        history.pushState = function (...args) {
            originalPushState.apply(this, args);
            handleScrollToTop(); // Trigger scroll up when a new page is pushed
        };

        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            cancelAnimationFrame(rafId);
            window.removeEventListener("popstate", handleScrollToTop);
            history.pushState = originalPushState; // Restore native behavior on cleanup
        };
    }, []);

    return <>{children}</>;
}
````

## File: Frontend/src/layout/service.layout.tsx
````typescript
import Navbar from "../shared/components/Navbar/Navbar";

const ServiceLayout = () => {
    return (
        <>
            <Navbar />
            {/* <Footer />/ */}
            {/* <Hero />
            <About />
            <Services /> */}
        </>
    );
};

export default ServiceLayout;
````

## File: Frontend/src/ProtectedRoutes/AdminProtectedRoutes.tsx
````typescript
import { useAuth } from "@/features/Auth/hooks/authhook";
import Notfound from "@/shared/components/Notfound/Notfound";
import type React from "react";
import { Navigate } from "react-router-dom";


export const AdminProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticatedUser, isLoading, user } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticatedUser) {
        return <Navigate to={'/admin-login'} />
    }
    if (!user?.data.role.includes('Admin')) {
        return <Notfound />
    }
    return children;
}
````

## File: Frontend/src/ProtectedRoutes/PetOwnerProtectedRoutes.tsx
````typescript

````

## File: Frontend/src/ProtectedRoutes/ProtectedRoutes.tsx
````typescript
import { useAuth } from "@/features/Auth/hooks/authhook";
import type React from "react";
import { Navigate } from "react-router-dom";


export const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticatedUser, isLoading } = useAuth();
    if (isLoading) {
        return <div>Loading....</div>
    }
    if (!isAuthenticatedUser) {
        return <Navigate to={'/login'} />
    }
    return children;
}
````

## File: Frontend/src/shared/components/Button/index.ts
````typescript
export { default } from "./Button";
````

## File: Frontend/src/shared/components/Card/Card.tsx
````typescript
import {
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onClick">;

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = "",
      clickable = false,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);

      if (!clickable || !onClick) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={clickable ? onClick : undefined}
        onKeyDown={handleKeyDown}
        className={`
          rounded-2xl
          border border-slate-200
          bg-white
          p-5
          shadow-sm
          transition-all duration-300
          
          ${
            clickable
              ? "cursor-pointer hover:-translate-y-0.5 hover:border-[#078b91]/30 hover:shadow-md"
              : ""
          }

          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
````

## File: Frontend/src/shared/components/Input/index.ts
````typescript
export { default } from "./Input";
````

## File: Frontend/src/shared/components/NotificationBell/NotificationBell.tsx
````typescript
import { FaBell } from "react-icons/fa";

const NotificationBell = () => {
  return (
    <div className="relative cursor-pointer">
      <FaBell size={20} />

      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        0
      </span>
    </div>
  );
};

export default NotificationBell;
````

## File: Frontend/src/shared/components/UserProfile/UserProfile.tsx
````typescript
import userImage from "../../../assets/icons/user-profile-1.jpg";

const UserProfile = () => {
  return (
    <div className="flex items-center gap-3">
      <img
        // src="https://i.pravatar.cc/50"
        src={userImage}
        alt="user"
        className="w-12 h-12 rounded-full object-cover"
      />

      <div>
        <h3 className="font-semibold">Admin User</h3>
        <p className="text-sm text-gray-500">Administrator</p>
      </div>
    </div>
  );
};

export default UserProfile;
````

## File: Frontend/src/shared/utils/toast.ts
````typescript
import { toast } from "sonner";

export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  warning: (message: string) => toast.warning(message),
  info: (message: string) => toast.info(message),
};
````

## File: Frontend/src/styles/forgot-password.module.css
````css
.container {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: linear-gradient(
    180deg,
    rgba(249, 197, 168, 1) 0%,
    rgba(249, 197, 168, 1) 19%,
    rgba(249, 197, 168, 1) 27%,
    rgba(212, 226, 224, 1) 100%
  );
}

.card {
  width: 100%;
  max-width: 430px;

  background: rgba(255,255,255,0.95);

  padding: 36px;

  border-radius: 28px;

  box-shadow:
    0 20px 60px rgba(0,0,0,0.1);

  backdrop-filter: blur(10px);
}

.imageWrapper {
  display: flex;
  justify-content: center;

  margin-bottom: 24px;
}

.image {
  width: 120px;
  height: 120px;

  object-fit: cover;

  border-radius: 50%;

  border: 5px solid white;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

@media (max-width: 768px) {
  .card {
    padding: 24px;
    border-radius: 18px;
  }

  .image {
    width: 100px;
    height: 100px;
  }
}
````

## File: Frontend/src/styles/reset-password.module.css
````css
.container {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: linear-gradient(
    180deg,
    rgba(249, 197, 168, 1) 0%,
    rgba(249, 197, 168, 1) 19%,
    rgba(249, 197, 168, 1) 27%,
    rgba(212, 226, 224, 1) 100%
  );
}

.card {
  width: 100%;
  max-width: 460px;

  background: rgba(255, 255, 255, 0.95);

  padding: 36px;

  border-radius: 28px;

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);

  backdrop-filter: blur(10px);
}

.imageWrapper {
  display: flex;
  justify-content: center;

  margin-bottom: 24px;
}

.image {
  width: 110px;
  height: 110px;

  border-radius: 50%;

  object-fit: cover;

  border: 4px solid white;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .card {
    padding: 24px;
  }

  .image {
    width: 90px;
    height: 90px;
  }
}
````

## File: Frontend/src/styles/verify-otp.module.css
````css
.container {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: linear-gradient(
    180deg,
    rgba(249, 197, 168, 1) 0%,
    rgba(249, 197, 168, 1) 19%,
    rgba(249, 197, 168, 1) 27%,
    rgba(212, 226, 224, 1) 100%
  );
}

/* .card {
  width: 100%;
  max-width: 450px;

  background: white;

  padding: 32px;

  border-radius: 24px;

  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
} */

.card {
  width: 100%;
  max-width: 460px;

  background: rgba(255, 255, 255, 0.95);

  padding: 36px;

  border-radius: 28px;

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);

  backdrop-filter: blur(10px);
}

.imageWrapper {
  display: flex;
  justify-content: center;

  margin-bottom: 24px;
}

/* .image {
  width: 110px;
  height: 110px;

  border-radius: 50%;

  object-fit: cover;
} */

.image {
  width: 110px;
  height: 110px;

  border-radius: 50%;

  object-fit: cover;

  border: 4px solid white;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
````

## File: Frontend/tsconfig.app.json
````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": [
      "ES2023",
      "DOM"
    ],
    "module": "esnext",
    "types": [
      "vite/client"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": false,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "ignoreDeprecations": "6.0",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "src"
  ]
}
````

## File: Frontend/tsconfig.json
````json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
````

## File: Frontend/tsconfig.node.json
````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "module": "esnext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
````

## File: Frontend/vite.config.ts
````typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
````

## File: Backend/app/config/stripe.js
````javascript
const Stripe = require('stripe');
const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY
)

module.exports = {
    stripe
}
````

## File: Backend/app/middleware/auth.middleware.js
````javascript
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
````

## File: Backend/app/utils/auth.utils.js
````javascript
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
````

## File: Backend/app/utils/cloudinary.utils.js
````javascript
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
````

## File: Backend/app/utils/cookiesOption.js
````javascript
const cookiesOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",

    secure: false,
};

module.exports = cookiesOptions;
````

## File: Frontend/index.html
````html
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>pets-veta-frontend</title>
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>

</html>
````

## File: Frontend/src/features/About/components/AboutCTA.tsx
````typescript
import { Link } from "react-router-dom";
import Button from "../../../shared/components/Button";

const AboutCTA = () => {
  return (
    <section className="bg-white px-5 pb-16 lg:px-16">
      <div className="mx-auto max-w-7xl rounded-[36px] bg-gradient-to-br from-[#bdf0ee] via-[#f5fbff] to-[#fff3ec] p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.10)] md:p-12">
        <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
          Ready to care better for your pet?
        </h2>

        <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
          Explore verified doctors, book appointments and get smart assistance
          for your pet’s health.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <Link to="/doctors">
            <Button>Find Doctors</Button>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border border-[#009f9d] px-5 py-3 text-sm font-bold text-[#009f9d] transition hover:bg-[#eefafa]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
````

## File: Frontend/src/features/About/components/AboutHero.tsx
````typescript
import { FaPaw, FaShieldAlt, FaUserMd } from "react-icons/fa";

const AboutHero = () => {
  return (
    <section className="bg-gradient-to-br from-[#f5fbff] via-white to-[#d9f7f6] px-5 py-16 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#009f9d] shadow-sm">
            <FaPaw />
            About PetsVeta
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-[#07182c] md:text-5xl">
            Trusted pet care, marketplace and veterinary support in one place.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            PetsVeta is designed to help pet owners find verified doctors,
            quality pet products, reliable services and smart AI assistance for
            better pet care.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07182c] shadow-sm">
              <FaShieldAlt className="text-[#009f9d]" />
              Verified Doctors
            </span>

            <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07182c] shadow-sm">
              <FaUserMd className="text-[#009f9d]" />
              Smart Pet Care
            </span>
          </div>
        </div>

        <div className="rounded-[40px] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
          <div className="rounded-[32px] bg-gradient-to-br from-[#bdf0ee] to-[#fff3ec] p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-extrabold text-[#009f9d]">
                  100+
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Verified Doctors
                </p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-extrabold text-[#009f9d]">
                  10K+
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Pet Owners
                </p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-extrabold text-[#009f9d]">
                  24/7
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Pet Support
                </p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-extrabold text-[#009f9d]">
                  4.8
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Average Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
````

## File: Frontend/src/features/About/components/AboutStats.tsx
````typescript
const stats = [
  {
    value: "100+",
    label: "Verified Veterinary Doctors",
  },
  {
    value: "500+",
    label: "Pet Products Listed",
  },
  {
    value: "10K+",
    label: "Happy Pet Parents",
  },
  {
    value: "24/7",
    label: "AI Pet Assistance",
  },
];

const AboutStats = () => {
  return (
    <section className="bg-[#f5fbff] px-5 py-14 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl bg-white p-6 text-center shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
            >
              <h3 className="text-4xl font-extrabold text-[#009f9d]">
                {item.value}
              </h3>

              <p className="mt-2 text-sm font-bold text-[#07182c]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
````

## File: Frontend/src/features/About/pages/About.tsx
````typescript
import AboutHero from "../components/AboutHero";
import AboutMission from "../components/AboutMisson";
import AboutStats from "../components/AboutStats";
import AboutValues from "../components/AboutValues";
import AboutCTA from "../components/AboutCTA";

const AboutPage = () => {
    return (
        <>
            <AboutHero />
            <AboutMission />
            <AboutStats />
            <AboutValues />
            <AboutCTA />
        </>
    );
};

export default AboutPage;
````

## File: Frontend/src/features/Admin/components/AdminNavbar.tsx
````typescript
import { memo } from 'react';
import { Bell, Menu } from 'lucide-react'
import { useAuth } from '@/features/Auth/hooks/authhook';

type AdminNavbarProps = {
    onMenuClick: () => void;
};

const AdminNavbar = ({ onMenuClick }: AdminNavbarProps) => {
    const { user } = useAuth();
    return (
        <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:h-[76px] sm:px-6 lg:justify-end lg:px-10">
            <button
                type="button"
                onClick={onMenuClick}
                aria-label="Open sidebar"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#0f172a] transition hover:bg-slate-100 lg:hidden"
            >
                <Menu size={24} strokeWidth={2.4} />
            </button>

            <div className="flex items-center justify-end gap-3 sm:gap-8">
            <button
                type="button"
                aria-label="Notifications"
                className="relative cursor-pointer rounded-lg p-2 text-[#0f172a] transition hover:bg-slate-100"
            >
                <Bell size={27} strokeWidth={2.4} />
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#ef4444] text-[11px] font-black text-white">
                    4
                </span>
            </button>

            <button type="button" className="cursor-pointer flex items-center gap-2">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                    alt="Admin"
                    className="h-10 w-10 rounded-full bg-[#dff5f3] sm:h-11 sm:w-11"
                />
                <div className="flex items-center gap-2">

                    <p className="max-w-28 truncate rounded-full bg-[#078b91]/10 px-3 py-1 text-sm font-bold tracking-wider text-[#078b91] lowercase sm:max-w-none sm:text-[15px]">
                        {user?.data?.role === 'Admin' ? user.data.username : 'Admin'}
                    </p>
                </div>
            </button>
            </div>
        </header>
    );
};

export default memo(AdminNavbar);
````

## File: Frontend/src/features/Admin/components/doctors/DoctorFilter.tsx
````typescript
import { memo, type SetStateAction } from 'react';


const DoctorFilter = ({ doctorStatus, setDoctorStatus }: { doctorStatus: string, setDoctorStatus: React.Dispatch<SetStateAction<string>> }) => {

    // const [status, setStatus] = useState<string>(doctorStatus)
    console.log("Status is ", doctorStatus);
    const setStatusAll = (doctorStatus: string) => {
        if (doctorStatus === 'all') {
            return;
        }
        setDoctorStatus('all');
    }

    const setStatusApproved = (doctorStatus: string) => {
        if (doctorStatus === 'approved') {
            return;
        }
        setDoctorStatus('approved');
    }

    const setStatusPending = (doctorStatus: string) => {
        if (doctorStatus === 'pending') {
            return;
        }
        setDoctorStatus('pending');
    }

    return (
        <div className='mt-3 grid grid-cols-1 gap-2 p-2 sm:grid-cols-3'>

            <button
                onClick={()=>setStatusAll(doctorStatus)}
                className={`
                    w-full font-medium rounded-md p-2 border 
                    border-[#06777D] transition-all duration-300
                    ${doctorStatus === 'all'
                        ? 'bg-[#06777D] text-white'
                        : 'hover:bg-[#06777D] hover:text-white'
                    }
                `}
            >
                All
            </button>
            <button
                 onClick={()=>setStatusApproved(doctorStatus)}
                className={`
                    w-full font-medium rounded-md p-2 border 
                    border-[#06777D] transition-all duration-300
                    ${doctorStatus === 'approved'
                        ? 'bg-[#06777D] text-white'
                        : 'hover:bg-[#06777D] hover:text-white'
                    }
                `}
            >
                Approved
            </button>

            <button
                 onClick={()=>setStatusPending(doctorStatus)}
                className={`
                    w-full font-medium rounded-md p-2 border 
                    border-red-600 transition-all duration-300
                    ${doctorStatus === 'pending'
                        ? 'bg-orange-700 text-white'
                        : 'text-red-500 hover:bg-orange-700 hover:text-white'
                    }
                `}
            >
                Pending
            </button>

        </div>
    );
};

export default memo(DoctorFilter);
````

## File: Frontend/src/features/Appointment/apis/doctorProfile.api.ts
````typescript
import { api } from "@/features/api interface/axios.interface";
import { handleAxiosError } from "@/features/api interface/axios.interface";

export type BookableSlot = {
    scheduleId: string;
    date: string;
    day: string;
    startTime: string;
    endTime: string;
    startDateTime: string;
    endDateTime: string;
}

export type Data = {
    id: string;
    name: string;
    image: string;
    specialization: string;
    specialty?: string;
    education: string;
    experience: number;
    fees: number;
    status: string;
    availableDays: string[];
    availableSlots: BookableSlot[];
    todaySlots: BookableSlot[];
    nextAvailable: BookableSlot | null;
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}


export const getDoctorProfileData = async (id: string) => {
    try {
        const response = await api.get(`http://localhost:8000/api/v1/user/doctor-profile?doctorId=${id}`);
        return response.data?.data;
    } catch (error) {
        handleAxiosError(error)
    }
}
````

## File: Frontend/src/features/Appointment/appointment.routes.tsx
````typescript
import DoctorProfilePage from "./pages/DoctorProfilePage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import { ProtectedRoutes } from "../../ProtectedRoutes/ProtectedRoutes";

export const doctorRoutes = [
    {
        path: '/doctor-profile/:id',
        element: <DoctorProfilePage />
    },
    {
        path: '/book-appointment/:id',
        element: (
            <ProtectedRoutes>
                <BookAppointmentPage />
            </ProtectedRoutes>
        )
    }
]
````

## File: Frontend/src/features/Auth/hooks/useDoctorAccount.ts
````typescript
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { createDoctorAccount } from '../api/doctor.api';
import { type ApiResponse } from '../api/doctor.api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authhook';

export const useDoctorAccountHook = (options: UseMutationOptions<ApiResponse, Error, FormData> = {}) => {
    const { setUser, setIsAuthenticateUser } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createDoctorAccount,
        ...options,

        onSuccess: (response, variables, onMutateResult, context) => {
            setUser(response);
            setIsAuthenticateUser(true);

            if (response.success) {
                console.log("Account Success", response);
                navigate("/verify-otp", { replace: true });
            }

            if (options.onSuccess) {
                options.onSuccess(response, variables, onMutateResult, context);
            }
        },

        onError: (error, variables, onMutateResult, context) => {
            console.log("Doctor Account Error ", error);

            if (options.onError) {
                options.onError(error, variables, onMutateResult, context);
            }
        }
    });
}
````

## File: Frontend/src/features/Auth/pages/ContinueAs.tsx
````typescript
import { useNavigate } from "react-router-dom";
import { Stethoscope, UserRound } from "lucide-react";

const ContinueAsPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f4fbff] via-white to-[#e8fbfa] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-10">
          <span className="inline-block px-5 py-2 rounded-full bg-white shadow text-[#178f95] font-semibold mb-4">
            Join Pets Veta
          </span>

          <h1 className="text-3xl md:text-5xl font-bold text-[#17233f] mb-4">
            Continue as
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your account type to continue registration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <button
            onClick={() => navigate("/signup/pet-owner")}
            className="group bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-left hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-16 w-16 rounded-2xl bg-[#e8fbfa] text-[#178f95] flex items-center justify-center mb-6 group-hover:bg-[#178f95] group-hover:text-white transition">
              <UserRound size={32} />
            </div>

            <h2 className="text-2xl font-bold text-[#17233f] mb-3">
              Pet Owner
            </h2>

            <p className="text-gray-600 mb-7 leading-relaxed">
              Create an account to book veterinary appointments, manage your pets,
              and access pet care services.
            </p>

            <span className="inline-flex items-center justify-center rounded-full bg-[#178f95] text-white px-6 py-3 font-semibold group-hover:bg-[#12757a] transition">
              Register as Pet Owner
            </span>
          </button>

          <button
            onClick={() => navigate("/signup/doctor")}
            className="group bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-left hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-16 w-16 rounded-2xl bg-[#fff1ea] text-[#178f95] flex items-center justify-center mb-6 group-hover:bg-[#178f95] group-hover:text-white transition">
              <Stethoscope size={32} />
            </div>

            <h2 className="text-2xl font-bold text-[#17233f] mb-3">
              Doctor
            </h2>

            <p className="text-gray-600 mb-7 leading-relaxed">
              Create your doctor profile, submit your verification document,
              manage availability, and handle appointments.
            </p>

            <span className="inline-flex items-center justify-center rounded-full bg-[#178f95] text-white px-6 py-3 font-semibold group-hover:bg-[#12757a] transition">
              Register as Doctor
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContinueAsPage;
````

## File: Frontend/src/features/Auth/pages/doctor-signup.tsx
````typescript
import DoctorForm from "../components/doctor-form";
import styles from "../../../styles/doctor-signup.module.css";

export default function DoctorSignup() {
  return (
    <div className={styles.container}>

      <div className={styles.left}>
        <DoctorForm />
      </div>

      {/* <div className={styles.right}>
        <img src="/doctor-pet.png" className={styles.image} alt="doctor" />
      </div> */}
    </div>
  );
}
````

## File: Frontend/src/features/Auth/pages/otp-verify.tsx
````typescript
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button/Button";
import BackButton from "../../../shared/components/Button/Button";
import { verifyUserOtp, resendUserOtp } from "../api/verifyotp.api";
import {
  verifyOtpSchema,
  type VerifyOtpFormData,
} from "../schemas/verify-otp.schema";

export default function VerifyOtpForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(360);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: VerifyOtpFormData) => {
    try {
      setLoading(true);

      const response = await verifyUserOtp(data);
      console.log(response);

      navigate("/reset-password");
    } catch (error) {
      console.log("==========>>", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      setTimer(360);
      setValue("otp", "");

      const response = await resendUserOtp();
      console.log(response);
    } catch (error) {
      console.log("==========>>", error);
    } finally {
      setLoading(false);
    }
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-900">Verify OTP</h1>
        <p className="mt-2 text-gray-500">Enter the 6-digit code</p>
      </div>

      <p className="mb-6 text-center text-sm font-medium text-red-500">
        {timer > 0 ? (
          <>
            OTP expires in: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </>
        ) : (
          "OTP Expired"
        )}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <input
            type="text"
            maxLength={6}
            placeholder="000000"
            {...register("otp", {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              },
            })}
            className="
              h-14 w-full max-w-[250px] rounded-xl
              border border-gray-300
              text-center text-2xl
              font-semibold tracking-[0.75em] outline-none
              focus:border-blue-900
            "
          />

          {errors.otp && (
            <p className="text-center text-sm text-red-500">
              {errors.otp.message}
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={loading}
            className="
              cursor-pointer text-sm
              font-medium text-blue-900
              hover:underline disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            Resend OTP
          </button>
        </div>

        <Button type="submit" loading={loading}>
          Verify OTP
        </Button>

        <BackButton href="/forgot-password" text="Back" />
      </form>
    </div>
  );
}
````

## File: Frontend/src/features/Contact/components/ContactCTA.tsx
````typescript
import { Link } from "react-router-dom";
import Button from "../../../shared/components/Button";

const ContactCTA = () => {
  return (
    <section className="bg-white px-5 pb-16 lg:px-16">
      <div className="mx-auto max-w-7xl rounded-[36px] bg-gradient-to-br from-[#bdf0ee] via-[#f5fbff] to-[#fff3ec] p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.10)] md:p-12">
        <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
          Need immediate pet-care support?
        </h2>

        <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
          Explore doctors, book appointments and get trusted assistance for
          your pets.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <Link to="/doctors">
            <Button>Find Doctors</Button>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border border-[#009f9d] px-5 py-3 text-sm font-bold text-[#009f9d] transition hover:bg-[#eefafa]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
````

## File: Frontend/src/features/Contact/components/ContactForm.tsx
````typescript
import Button from "../../../shared/components/Button";
import Input from "@/shared/components/Input";

const ContactForm = () => {
  return (
    <section className="bg-[#f5fbff] px-5 py-16 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
        <div className="rounded-3xl bg-white p-8 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#07182c]">
              Send Us a Message
            </h2>

            <p className="mt-2 text-slate-500">
              Fill the form and our support team will contact you shortly.
            </p>
          </div>

          <form className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Full Name" placeholder="Enter your name" />

              <Input
                label="Email Address"
                placeholder="Enter your email"
                type="email"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Phone Number"
                placeholder="03xx xxxxxxx"
              />

              <Input label="Subject" placeholder="Enter subject" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Message
              </label>

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#178f95] focus:ring-2 focus:ring-[#178f95]/20"
              />
            </div>

            <Button>Send Message</Button>
          </form>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-[#bdf0ee] via-[#f5fbff] to-[#fff3ec] p-8 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
          <h2 className="text-3xl font-extrabold text-[#07182c]">
            Why Contact PetsVeta?
          </h2>

          <div className="mt-8 space-y-5">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-[#07182c]">
                Doctor Assistance
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Get support regarding appointments, schedules and consultations.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-[#07182c]">
                Marketplace Help
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Need help with pet products or orders? Our team is here.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-[#07182c]">
                AI Assistance
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ask questions about AI symptom assistance and smart pet-care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
````

## File: Frontend/src/features/Contact/components/ContactHero.tsx
````typescript
import { FaEnvelopeOpenText } from "react-icons/fa";

const ContactHero = () => {
  return (
    <section className="bg-gradient-to-br from-[#f5fbff] via-white to-[#d9f7f6] px-5 py-16 lg:px-16">
      <div className="mx-auto max-w-7xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#009f9d] shadow-sm">
          <FaEnvelopeOpenText />
          Contact PetsVeta
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight text-[#07182c] md:text-5xl">
          We’re here to help you and your pets.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
          Have questions about appointments, pet care, marketplace products or
          AI assistance? Contact our team anytime.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
````

## File: Frontend/src/features/Contact/contact.route.tsx
````typescript
import ContactPage from "./pages/ContactPage";

export const contactRoutes = [
    {
        path: "/contact",
        element: <ContactPage />,
    },
];
````

## File: Frontend/src/features/Doctor/components/DoctorDashboard.tsx
````typescript
import { useState } from "react";
import { type DashboardData } from "../doctor.types";
import { useAuth } from "../../Auth/hooks/authhook";

const defaultDashboard: DashboardData = {
  doctor: {
    name: "Doctor",
    image: "",
  },
  stats: {
    todayAppointments: 0,
    pendingAppointments: 0,
    totalPatients: 0,
    completedToday: 0,
  },
  appointments: [],
};

const DoctorDashboard = () => {
  const [dashboard] = useState<DashboardData>(defaultDashboard);
  const loading = false;
  const { user } = useAuth();

  const statsCards = [
    {
      title: "Today's Appointments",
      value: dashboard.stats.todayAppointments,
      color: "text-teal-700",
      badgeColor: "bg-teal-50 text-teal-700",
    },
    {
      title: "Pending Appointments",
      value: dashboard.stats.pendingAppointments,
      color: "text-orange-500",
      badgeColor: "bg-orange-50 text-orange-600",
    },
    {
      title: "Total Patients",
      value: dashboard.stats.totalPatients,
      color: "text-blue-600",
      badgeColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "Completed Today",
      value: dashboard.stats.completedToday,
      color: "text-green-600",
      badgeColor: "bg-green-50 text-green-700",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Welcome back, {user?.data.username || "Doctor"}!
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Here's your dashboard overview
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
        {statsCards.map((item) => (
          <div
            key={item.title}
            className="flex min-h-40 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5 lg:p-6"
          >
            <p className="text-sm font-semibold text-slate-500">
              {item.title}
            </p>

            <h3 className={`mt-4 text-3xl font-black sm:text-4xl ${item.color}`}>
              {item.value}
            </h3>

            <span
              className={`mt-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${item.badgeColor}`}
            >
              {loading ? "Updating..." : "Updated"}
            </span>
          </div>
        ))}
      </section>
    </main>
  );
};

export default DoctorDashboard;
````

## File: Frontend/src/features/Doctor/components/DoctorHeader.tsx
````typescript
import { Plus } from "lucide-react";
import Button from "../../../shared/components/Button/Button";

type DoctorHeaderProps = {
  onOpenModal: () => void;
};

const DoctorHeader = ({ onOpenModal }: DoctorHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#078b91]">
          Doctor Panel
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#101b3d]">
          My Availability
        </h1>

        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
          Set your appointment date and time slots so pet owners can book
          according to your schedule.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          className="flex h-12 w-auto items-center justify-center gap-2 px-5"
          onClick={onOpenModal}
        >
          <Plus size={18} />
          Add Time Slot
        </Button>
      </div>
    </div>
  );
};

export default DoctorHeader;
````

## File: Frontend/src/features/Doctor/components/PatientCard.tsx
````typescript
import { CalendarClock, Mail, PawPrint, Phone, Wallet } from "lucide-react";
import type { DoctorAppointment } from "../api/doctorAppointments.api";

type PatientCardProps = {
  appointment: DoctorAppointment;
};

const formatDateTime = (value: string) => {
  return new Date(value).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const PatientCard = ({ appointment }: PatientCardProps) => {
  const patient = appointment.petIssueReport.user;
  const pet = appointment.petIssueReport.pet;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#078b91]/40 hover:shadow-md">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          {/* <img
            src={
              patient.profileImageUrl ||
            
            }
            alt={patient.fullName}
            className="h-16 w-16 rounded-2xl object-cover"
          /> */}

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-black text-[#101b3d]">
                {patient.fullName}
              </h2>

              <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-black text-amber-700">
                {appointment.status}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Mail size={14} />
                {patient.email}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Phone size={14} />
                {patient.phone || "No phone"}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[#F0FAF7] px-4 py-3 text-sm font-black text-[#078b91]">
          <CalendarClock size={17} className="mr-2 inline" />
          {formatDateTime(appointment.checkupTime)}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1.4fr_150px]">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="flex items-center gap-2 text-xs font-black uppercase text-slate-400">
            <PawPrint size={15} />
            Pet
          </p>

          <h3 className="mt-2 font-black text-[#101b3d]">{pet.name}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            {pet.category} · {pet.breed}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase text-slate-400">
            Issue
          </p>

          <p className="mt-2 line-clamp-3 text-sm font-semibold leading-6 text-slate-600">
            {appointment.petIssueReport.issue}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="flex items-center gap-2 text-xs font-black uppercase text-slate-400">
            <Wallet size={15} />
            Fees
          </p>

          <h3 className="mt-2 font-black text-[#101b3d]">
            Rs. {appointment.fees}
          </h3>
        </div>
      </div>
    </article>
  );
};

export default PatientCard;
````

## File: Frontend/src/features/Doctor/components/ServiceTable.tsx
````typescript
import { useState, useEffect } from "react";
import { Edit2, Trash2, ShieldAlert, Activity } from "lucide-react";
import { getDoctorServices } from "../api/doctorServices";
import { type ItemType } from "./DoctorSkill";
import DeleteModal from "./DeleteModal";
type Data = {
    id: string,
    userId: string,
    price: string,
    skill: string
}

const DoctorServicesTable = ({ onEdit, onDelete }: {
    onEdit: (item: ItemType) => void | Promise<void>,
    onDelete: (itemId: string) => Promise<void>,

}) => {
    const [services, setServices] = useState<Data[] | undefined>(undefined)
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState('');
    const [isDeleteModal, setDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState<{ id: string; skill: string; price: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const openDeleteModal = (item: Data) => {
        setDeleteItem(item);
        setDeleteModal(true);
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
        setDeleteItem(null);
    }

    const handleConfirmDelete = async (itemId: string) => {
        setIsDeleting(true);
        try {
            await onDelete(itemId);
            closeDeleteModal();
            // Refresh services list after delete
            const response = await getDoctorServices();
            if (response?.success && Array.isArray(response.data)) {
                setServices(response.data);
            }
        } catch (err) {
            console.error("Delete Error:", err);
        } finally {
            setIsDeleting(false);
        }
    }


    useEffect(() => {
        const loadServices = async () => {
            setLoading(true);
            try {
                const response = await getDoctorServices();
                console.log("Initial database payload:", response?.data);

                if (response?.success && Array.isArray(response.data)) {
                    setServices(response.data);
                    setFetchError('');
                } else {
                    setFetchError(response?.message || "Failed to parse service records.");
                }
            } catch (err) {
                setFetchError("Internal network connection error.");
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    if (loading) {
        return (
            <div className="w-full p-8 text-center text-sm text-slate-500 bg-white border border-slate-100 rounded-xl shadow-sm">
                <div className="animate-pulse flex flex-col items-center gap-2">
                    <div className="h-4 w-4 bg-emerald-500 rounded-full animate-ping" />
                    <span>Loading your medical catalog updates...</span>
                </div>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="w-full p-5 text-center text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 justify-center">
                <ShieldAlert className="w-4 h-4" />
                <span>Error: {fetchError}</span>
            </div>
        );
    }

    return (
        <div className="w-full bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">

            {/* Header Meta Info */}
            <div className="bg-emerald-50/50 px-6 py-4 border-b border-emerald-100/60 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <h3 className="text-emerald-900 font-semibold text-base">
                    Offered Services & Custom Pricing
                </h3>
                <span className="ml-auto bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {services?.length} Total
                </span>
            </div>

            {/* Table Core Layout */}
            <div className="overflow-x-auto">
                {services?.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">
                        No active clinical services found. Choose a skill above to start.
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-medium">
                                <th className="p-4 pl-6">Service</th>
                                <th className="p-4">Price (PKR)</th>
                                <th className="p-4 pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                            {services?.map((item) => (
                                <tr key={item.id} className="hover:bg-emerald-50/20 transition-colors">
                                    {/* Service Name Column */}
                                    <td className="p-4 pl-6 font-medium text-slate-800" >
                                        {item.skill}
                                    </td>

                                    {/* Price Tag Column */}
                                    <td className="p-4 text-emerald-700 font-semibold">
                                        Rs. {Number(item.price).toLocaleString()}
                                    </td>

                                    {/* Edit and Delete Buttons Column */}
                                    <td className="p-4 pr-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-all"
                                                title="Edit Service Price"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(item)}
                                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                                                title="Delete Service Option"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Delete Modal */}
            {deleteItem && (
                <DeleteModal
                    isOpen={isDeleteModal}
                    serviceName={deleteItem.skill}
                    price={deleteItem.price}
                    itemId={deleteItem.id}
                    onCancel={closeDeleteModal}
                    onConfirmDelete={handleConfirmDelete}
                    isLoading={isDeleting}
                />
            )}
        </div>
    );
};

export default DoctorServicesTable;
````

## File: Frontend/src/features/Doctor/Layout/doctor.layout.tsx
````typescript
import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import { DoctorSidebar } from "../components/DoctorSideBar"; // Adjust path to your Sidebar

export const DoctorLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <DoctorSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="lg:pl-72">
                <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm lg:hidden">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
                        aria-label="Open sidebar"
                    >
                        <Menu size={22} />
                    </button>
                    <span className="text-sm font-bold text-slate-800">Doctor Panel</span>
                    <span className="h-10 w-10" aria-hidden="true" />
                </header>

                <div className="mx-auto w-full max-w-7xl p-4 sm:p-5 md:p-6 lg:p-8">

                    <Outlet />
                </div>
            </div>
        </div>
    );
};
````

## File: Frontend/src/features/Doctor/pages/DoctorAvailabilityPage.tsx
````typescript
import DoctorAvailability from "../components/DoctorAvailability";

const DoctorAvailabilityPage = () => {
  return <DoctorAvailability />;
};

export default DoctorAvailabilityPage;
````

## File: Frontend/src/features/Doctor/pages/SkillPricing.tsx
````typescript
import SkillForm from "../components/DoctorSkill";

const DoctorSkill = () => {
  return (
    <div className="min-h-screen bg-[#F4F7F9]">
      <div className="p-5 pt-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Manage Your Skills
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-slate-500">
            Add, update, and manage your professional skills with their pricing.
            Keep your service offerings up to date and competitive.
          </p>
        </div>

        <SkillForm />
      </div>
    </div>
  );
};

export default DoctorSkill;
````

## File: Frontend/src/features/Doctorcart/apis/doctorProfile.api.ts
````typescript
import { api, handleAxiosError } from "@/features/api interface/axios.interface";
import type { DoctorProfileFormData } from "../schemas/doctorProfile.schema";

export type DoctorProfileData = {
  id: string;
  userId: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  profileImageUrl: string;
  specialization: string;
  education: string;
  address: string;
  experience: number;
  fees: number;
  isAvailable: boolean;
  isVerified: "PENDING" | "APPROVED" | "REJECTED";
};

type BackendDoctorProfileData = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  profileImageUrl: string;
  doctors: {
    id: string;
    specialization: string;
    education: string;
    address: string;
    experience: number;
    fees: number;
    isAvailable: boolean;
    isVerified: "PENDING" | "APPROVED" | "REJECTED";
  } | null;
};

type BackendDoctorProfileResponse = {
  success: boolean;
  message: string;
  data: BackendDoctorProfileData;
};

export type DoctorProfileApiResponse = {
  success: boolean;
  message: string;
  data: DoctorProfileData;
};

const mapDoctorProfile = (
  response: BackendDoctorProfileResponse
): DoctorProfileApiResponse => {
  const doctor = response.data.doctors;

  if (!doctor) {
    throw new Error("Doctor data not found");
  }

  return {
    success: response.success,
    message: response.message,
    data: {
      id: doctor.id,
      userId: response.data.id,
      fullName: response.data.fullName || "",
      username: response.data.username || "",
      email: response.data.email || "",
      phone: response.data.phone || "",
      profileImageUrl: response.data.profileImageUrl || "",
      specialization: doctor.specialization || "",
      education: doctor.education || "",
      address: doctor.address || "",
      experience: doctor.experience || 0,
      fees: doctor.fees || 0,
      isAvailable: doctor.isAvailable ?? true,
      isVerified: doctor.isVerified,
    },
  };
};

export const getDoctorProfileApi = async () => {
  try {
    const response = await api.get<BackendDoctorProfileResponse>(
      "doctor/profile"
    );

    return mapDoctorProfile(response.data);
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const updateDoctorProfileApi = async (
  payload: DoctorProfileFormData
) => {
  try {
    const response = await api.patch<BackendDoctorProfileResponse>(
      "doctor/profile",
      payload
    );

    return mapDoctorProfile(response.data);
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
````

## File: Frontend/src/features/Doctorcart/component/DoctorsList.tsx
````typescript
import { type Doctor } from "../apis/getDoctors.api";
import DoctorCard from "./DoctorCard";

interface DoctorsListProps {
    doctors: Doctor[];
    loading: boolean;
    onBookAppointment: (doctorId: string, checkupTime?: string) => void;
}

const DoctorsList = ({
    doctors,
    loading,
    onBookAppointment,
}: DoctorsListProps) => {
    if (loading) {
        return (
            <div className="rounded-3xl bg-white p-10 text-center font-black text-[#078b91]">
                Loading doctors...
            </div>
        );
    }

    if (doctors.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <h2 className="text-xl font-black">No doctors found</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Try changing your search.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {doctors.map((doctor) => (
                <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBookAppointment={onBookAppointment}
                />
            ))}
        </div>
    );
};

export default DoctorsList;
````

## File: Frontend/src/features/Doctorcart/doctorAppointment.route.tsx
````typescript
import FindDoctorPage from "./pages/FindDoctorPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import EditDoctorProfilePage from "./pages/EditDoctorProfilePage";

export const doctorAppointmentRoutes = [
  {
    path: "/doctors",
    element: <FindDoctorPage />,
  },
  {
    path: "/doctor-profile",
    element: <DoctorProfilePage />,
  },
  {
    path: "/doctor-profile/edit",
    element: <EditDoctorProfilePage />,
  },
  {
    path: "/doctors/:doctorId",
    element: <DoctorProfilePage />,
  },
];
````

## File: Frontend/src/features/Doctorcart/hooks/useGetDoctors.ts
````typescript
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { getApprovedDoctors, type DoctorApiResponse } from '../apis/getDoctors.api'

interface GetDoctorsParams {
    page: number,
    limit: number,
    search: string
}

export const useApprovedDoctors = (
    { page, limit, search }: GetDoctorsParams,
    options?: Omit<UseQueryOptions<DoctorApiResponse, Error>, 'queryKey' | 'queryFn'>

) => {
    return useQuery({
        queryKey: ['approved-doctors', page, limit, search],
        queryFn: () => getApprovedDoctors(page, limit, search),
        ...options,
    })
}
````

## File: Frontend/src/features/Landing Page/components/About.tsx
````typescript
import { FaUsers, FaUserMd, FaShoppingBag, FaStar } from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers />,
    value: "10k+",
    label: "Happy Pet Parents",
  },
  {
    icon: <FaUserMd />,
    value: "500+",
    label: "Verified Vets",
  },
  {
    icon: <FaShoppingBag />,
    value: "2k+",
    label: "Pet Products",
  },
  {
    icon: <FaStar />,
    value: "4.9",
    label: "Average Rating",
  },
];

const Stats = () => {
  return (
    <section className="relative z-20 px-6 lg:px-16 -mt-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 rounded-[28px] bg-white px-6 py-7 shadow-2xl md:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#d9f7f6] text-xl text-[#008f8d]">
              {item.icon}
            </div>

            <h3 className="text-2xl font-extrabold text-[#07182c] md:text-3xl">
              {item.value}
            </h3>

            <p className="mt-1 text-sm font-semibold text-slate-500">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
````

## File: Frontend/src/features/Landing Page/components/Banner.tsx
````typescript
import { Link } from "react-router-dom";

import {
  FaShieldAlt,
  FaLock,
  FaHeadset,
  FaUsers,
  FaCalendarAlt,
  FaShoppingBag,
  FaPaw,
} from "react-icons/fa";

import img from "@/assets/shared/images/dog2.jpeg";
import Button from "../../../shared/components/Button/Button";

export const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f4fbff] via-white to-[#e8fbfa] px-6 py-16 lg:px-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
      <div className="w-full lg:w-1/2 z-10">
        <div className="inline-flex items-center gap-2 bg-white text-[#07182c] font-semibold px-5 py-3 rounded-full shadow-lg mb-7">
          <FaPaw className="text-[#009f9d]" />
          <span>Trusted by 10,000+ pet parents</span>
        </div>

        <h1 className="text-[40px] md:text-[56px] lg:text-[64px] leading-tight font-extrabold text-[#07182c] mb-6">
          Better care for <br />
          your pets, <span className="text-[#00a7a5]">every day.</span>
        </h1>

        <p className="text-base md:text-lg text-slate-700 leading-7 max-w-xl mb-8">
          PetsVeta is your all-in-one platform for expert care, trusted vets,
          quality products and a loving community.
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          <Link to="/doctors">
            <Button
              variant="primary"
              size="md"
              className="inline-flex items-center gap-3 !bg-[#009f9d] !border-[#009f9d] !text-white hover:!bg-[#008f8d] hover:!text-white rounded-2xl shadow-xl"
            >
              <FaCalendarAlt />
              Book a Vet Appointment
            </Button>
          </Link>

          <Link to="/marketplace">
            <Button
              variant="outline"
              size="md"
              className="inline-flex items-center gap-3 !bg-white !text-[#07182c] !border-white hover:!bg-white hover:!text-[#009f9d] rounded-2xl shadow-lg"
            >
              <FaShoppingBag />
              Explore Marketplace
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="flex items-center gap-3 text-sm font-bold text-[#07182c]">
            <span className="w-10 h-10 rounded-full bg-[#d9f7f6] text-[#008f8d] flex items-center justify-center shrink-0">
              <FaShieldAlt />
            </span>
            Verified Vets
          </div>

          <div className="flex items-center gap-3 text-sm font-bold text-[#07182c]">
            <span className="w-10 h-10 rounded-full bg-[#d9f7f6] text-[#008f8d] flex items-center justify-center shrink-0">
              <FaLock />
            </span>
            Secure Bookings
          </div>

          <div className="flex items-center gap-3 text-sm font-bold text-[#07182c]">
            <span className="w-10 h-10 rounded-full bg-[#d9f7f6] text-[#008f8d] flex items-center justify-center shrink-0">
              <FaHeadset />
            </span>
            24/7 Support
          </div>

          <div className="flex items-center gap-3 text-sm font-bold text-[#07182c]">
            <span className="w-10 h-10 rounded-full bg-[#d9f7f6] text-[#008f8d] flex items-center justify-center shrink-0">
              <FaUsers />
            </span>
            Trusted by Pet Parents
          </div>
        </div>
      </div>

      <div className="relative w-full lg:w-1/2 min-h-[360px] lg:min-h-[520px] flex items-end justify-center">
        <div className="absolute w-[330px] h-[330px] md:w-[480px] md:h-[480px] rounded-full bg-gradient-to-br from-[#4fd4d1] to-[#009f9d] bottom-4" />

        <img
          src={img}
          alt="PetsVeta pets"
          className="relative z-10 w-full max-w-[620px] object-contain"
        />
      </div>
    </section>
  );
};
````

## File: Frontend/src/features/Landing Page/components/Services.tsx
````typescript
import {
  FaPaw,
  FaShoppingBasket,
  FaStethoscope,
  FaRobot,
  FaCheck,
  FaShieldAlt,
  FaAward,
  FaLock,
  FaHeadset,
  FaArrowRight,
} from "react-icons/fa";

import Button from "../../../shared/components/Button/Button";
import img from "@/assets/shared/images/dog2.jpeg"
import { NavLink } from "react-router-dom";

const services = [
  {
    title: "Pet Marketplace",
    desc: "Shop a wide range of trusted pet products delivered to your doorstep.",
    icon: <FaShoppingBasket />,
    color: "text-[#159f9b]",
    checkBg: "bg-[#159f9b]",
    iconBg: "bg-[#d8f4ef]",
    bg: "from-[#eefbf7] to-[#f8fffd]",
    btn: "!bg-[#119f98] !border-[#119f98]",
    image: img,
    items: [
      "Premium pet food",
      "Toys & accessories",
      "Medications & supplements",
      "Grooming essentials",
    ],
    button: "Explore Marketplace",
    url:"/marketplace"
  },
  {
    title: "Vet Consultation",
    desc: "Connect with verified veterinarians and book appointments with ease.",
    icon: <FaStethoscope />,
    color: "text-[#168dcc]",
    checkBg: "bg-[#168dcc]",
    iconBg: "bg-[#d9f0fb]",
    bg: "from-[#eef8ff] to-[#f7fcff]",
    btn: "!bg-[#168dcc] !border-[#168dcc]",
    image: img,
    items: [
      "Book online appointments",
      "Verified & experienced vets",
      "Video & in-clinic consultation",
      "Health records & prescriptions",
    ],
    button: "Book a Consultation",
    url:"/doctors"
  },
  {
    title: "AI Assistant",
    desc: "Get 24/7 AI support for your pet's health, nutrition and well-being.",
    icon: <FaRobot />,
    color: "text-[#6e36b8]",
    checkBg: "bg-[#6e36b8]",
    iconBg: "bg-[#eadcf8]",
    bg: "from-[#faf4ff] to-[#fff9ff]",
    btn: "!bg-[#6e36b8] !border-[#6e36b8]",
    image: img,
    items: [
      "Instant answers to your questions",
      "Health & symptom checker",
      "Nutrition & diet guidance",
      "Care tips & reminders",
    ],
    button: "Ask AI Assistant",
    url:"/ai-assistant"
  },
];

const bottomFeatures = [
  {
    icon: <FaShieldAlt />,
    title: "Trusted & Secure",
    desc: "100% genuine products and reliable care",
  },
  {
    icon: <FaAward />,
    title: "Verified Experts",
    desc: "Experienced vets & pet care professionals",
  },
  {
    icon: <FaLock />,
    title: "Safe & Private",
    desc: "Your pet's data is protected with top security",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "We're always here for you and your pets",
  },
];

const Services = () => {
  return (
    <section className="bg-white px-6 py-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-2 flex items-center justify-center gap-2 text-sm font-extrabold uppercase tracking-wider text-[#009f9d]">
            Our Services <FaPaw />
          </p>

          <h2 className="text-[28px] font-extrabold leading-tight text-[#07182c] md:text-[36px]">
            Everything your pet needs, in{" "}
            <span className="text-[#009f9d]">one place</span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600">
            From shopping the best products to expert care and AI support,
            <br className="hidden md:block" />
            we make pet parenting easier, smarter and worry-free.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className={`rounded-[24px] bg-gradient-to-br ${service.bg} p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)]`}
            >
              <div className="mb-6 flex items-start gap-4">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${service.iconBg} ${service.color} text-3xl`}
                >
                  {service.icon}
                </div>

                <div>
                  <h3 className="mb-2 text-[20px] font-extrabold text-[#07182c]">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    {service.desc}
                  </p>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                {service.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-[#07182c]"
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${service.checkBg} text-white`}
                    >
                      <FaCheck className="text-[10px]" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              <div className="mb-6 flex h-[230px] items-end justify-center overflow-hidden rounded-3xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-contain object-bottom"
                />
              </div>

              <NavLink
                to={service.url}
                className={`inline-flex items-center gap-3 p-3 !rounded-xl !text-white hover:!text-white ${service.btn}`}
              >
                {service.button}hh
                <FaArrowRight />
              </NavLink>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 rounded-[22px] bg-white px-7 py-5 shadow-[0_10px_35px_rgba(15,23,42,0.08)] md:grid-cols-2 lg:grid-cols-4">
          {bottomFeatures.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e0f7f5] text-2xl text-[#009f9d]">
                {feature.icon}
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#07182c]">
                  {feature.title}
                </h4>
                <p className="text-sm leading-5 text-slate-600">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
````

## File: Frontend/src/features/Landing Page/components/Testimonials.tsx
````typescript
import { FaPaw, FaQuoteRight, FaStar } from "react-icons/fa";
import img from "@/assets/shared/images/dog2.jpeg"

const testimonials = [
    {
        name: "Aisha Malik",
        image: img,
        text: "Booked a vet consultation for my cat. The experience was amazing!",
    },
    {
        name: "Bilal Ahmed",
        image: img,
        text: "Great products and fast delivery. Highly recommended PetsVeta!",
    },
    {
        name: "Sana Farooq",
        image: img,
        text: "AI Assistant helped me a lot with my dog's health queries.",
    },
];

const Testimonials = () => {
    return (
        <section className="bg-[#f5fbff] px-6 py-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <h2 className="mb-8 flex items-center justify-center gap-2 text-center text-[22px] font-extrabold text-[#07182c]">
                    What Our <span className="text-[#009f9d]">Pet Parents</span> Say
                    <FaPaw className="text-[#009f9d]" />
                </h2>

                <div className="grid gap-7 md:grid-cols-3">
                    {testimonials.map((item) => (
                        <div
                            key={item.name}
                            className="relative rounded-[18px] bg-white px-7 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                        >
                            <FaQuoteRight className="absolute right-6 top-5 text-2xl text-[#b8efeb]" />

                            <div className="mb-5 flex items-center gap-4">
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-14 w-14 rounded-full object-cover"
                                    />
                                    <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[#20c997] ring-2 ring-white" />
                                </div>

                                <div>
                                    <h3 className="text-sm font-extrabold text-[#07182c]">
                                        {item.name}
                                    </h3>

                                    <div className="mt-1 flex gap-1 text-[12px] text-[#ffb020]">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <FaStar key={index} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="text-[15px] font-medium leading-7 text-[#07182c]">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-7 flex justify-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#009f9d]" />
                    <span className="h-3 w-3 rounded-full bg-slate-300" />
                    <span className="h-3 w-3 rounded-full bg-slate-300" />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
````

## File: Frontend/src/features/Landing Page/pages/LandingPage.tsx
````typescript
import { Banner } from "../components/Banner"
import About from "../components/About"
import Popular from "../components/Popular"
import Services from "../components/Services"
import CTA from "../components/CTA"
import Testimonials from "../components/Testimonials"
import ChooseUs from "../components/ChooseUs"
import AIAssistant from "../components/AIAssistance"
import TopRatedDoctors from "../components/TopDoctor"

const LandingPage = () => {
    return (
        <>
            <Banner />
            <About />
            <Services />
            <Popular />
            <TopRatedDoctors />
            <AIAssistant />
            <ChooseUs />
            <Testimonials />
            <CTA />
        </>
    )
}

export default LandingPage;
````

## File: Frontend/src/features/Landing Page/routes.tsx
````typescript
import LandingPage from "./pages/LandingPage";
import LandingLayout from "../../layout/landing.layout";

import { contactRoutes } from "../Contact/contact.route";
import { aboutRoutes } from "../About/about.route";
import servicesRoutes from "../Services/service.route";
import { marketplaceRoutes } from "../Marketplace/marketplace.route";
import { aiAssistantRoutes } from "../AiAssistance/aiAssistant.route";

const LandingPageRoutes = [
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },

      ...aboutRoutes,
      ...contactRoutes,
      ...servicesRoutes,
      ...marketplaceRoutes,
      ...aiAssistantRoutes,
    ],
  },
];

export default LandingPageRoutes;
````

## File: Frontend/src/features/Marketplace/components/MarketplaceCategories.tsx
````typescript
import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaSearch, FaCheck } from "react-icons/fa";
import backgroundImag from '@/assets/shared/images/MarketPlace Background.jpg';

const comprehensiveAnimalsList = [
    { id: "dog", name: "Dog", icon: "🐶", group: "Common Pets" },
    { id: "cat", name: "Cat", icon: "🐱", group: "Common Pets" },
    { id: "parrot", name: "Parrot", icon: "🦜", group: "Exotic & Birds" },
    { id: "deer", name: "Deer", icon: "🦌", group: "Exotic & Birds" },
    { id: "cow", name: "Cow", icon: "🐮", group: "Livestock" },
    { id: "goat", name: "Goat", icon: "🐐", group: "Livestock" },
    { id: "horse", name: "Horse", icon: "🐴", group: "Livestock" },
    { id: "rabbit", name: "Rabbit", icon: "🐰", group: "Common Pets" },
    { id: "monkey", name: "Monkey", icon: "🐒", group: "Exotic & Birds" },
];

const MarketplaceCategories = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAnimal, setSelectedAnimal] = useState(comprehensiveAnimalsList[0]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredAnimals = comprehensiveAnimalsList.filter((animal) =>
        animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.group.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section
            className="relative overflow-hidden px-5 py-20 lg:px-16"
            style={{
                /* Increased the opacity of the black overlay (0.6) 
                   to make the background significantly darker.
                */
                backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImag})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#07182c' // Fallback solid color
            }}
        >
            {/* Added a subtle dark overlay to ensure white text would be readable if needed, 
                or keeping it clear as you requested */}
            <div className="mx-auto max-w-3xl text-center relative z-10">
                <div className="mb-8">
                    <h2 className="text-4xl font-extrabold text-[#07182c] md:text-5xl tracking-tight">
                        Choose your <span className="text-[#009f9d]">Companion</span>
                    </h2>
                    <p className="mt-4 text-[#07182c]/80 text-base max-w-lg mx-auto leading-relaxed font-medium">
                        Explore our curated registry to find the perfect products for your unique animal friend.
                    </p>
                </div>

                <div className="relative inline-block w-full max-w-md text-left" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex w-full items-center justify-between rounded-3xl border border-[#009f9d]/20 bg-white/90 backdrop-blur-md px-6 py-5 text-base font-bold text-[#07182c] shadow-[0_8px_30px_rgba(0,159,157,0.1)] transition-all hover:bg-white hover:border-[#009f9d]/40"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-3xl">{selectedAnimal.icon}</span>
                            <div className="text-left">
                                <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#009f9d]">Current Selection</span>
                                <span className="text-lg">{selectedAnimal.name}</span>
                            </div>
                        </div>
                        <FaChevronDown className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#009f9d]" : ""}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute left-0 mt-3 z-50 w-full rounded-3xl bg-white p-4 shadow-[0_20px_50px_rgba(7,24,44,0.15)] border border-slate-100 max-h-[380px] flex flex-col">
                            <div className="relative mb-3 shrink-0">
                                <FaSearch className="absolute left-4 top-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search your animal..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-2xl bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-semibold text-[#07182c] outline-none border-2 border-transparent focus:border-[#009f9d] focus:bg-white transition-all"
                                    autoFocus
                                />
                            </div>

                            <div className="overflow-y-auto pr-1 flex-1 scrollbar-thin">
                                {filteredAnimals.map((animal) => {
                                    const isSelected = selectedAnimal.id === animal.id;
                                    return (
                                        <button
                                            key={animal.id}
                                            onClick={() => { setSelectedAnimal(animal); setIsOpen(false); }}
                                            className={`flex w-full items-center justify-between rounded-2xl px-4 py-4 text-sm font-bold transition-all mb-1
                                                ${isSelected ? "bg-[#009f9d]/5 text-[#009f9d]" : "text-[#07182c] hover:bg-slate-50"}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-2xl">{animal.icon}</span>
                                                <span className="text-base">{animal.name}</span>
                                            </div>
                                            {isSelected && <FaCheck />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MarketplaceCategories;
````

## File: Frontend/src/features/Marketplace/components/ProductCard.tsx
````typescript
import {
    FaHeart,
    FaShoppingCart,
    FaStar,
} from "react-icons/fa";

type ProductCardProps = {
    name: string;
    category: string;
    price: number;
    oldPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    badge?: string;
};

const ProductCard = ({
    name,
    category,
    price,
    oldPrice,
    rating,
    reviews,
    image,
    badge,
}: ProductCardProps) => {
    return (
        <div className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(15,23,42,0.1)]">
            {/* Reduced height from h-[230px] to h-[180px] */}
            <div className="relative h-[180px] overflow-hidden bg-[#f5fbff]">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />


                {/* Slightly smaller action button */}
                <button
                    type="button"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs text-[#07182c] shadow-sm transition hover:text-[#009f9d]"
                >
                    <FaHeart />
                </button>
            </div>

            {/* Reduced padding from p-5 to p-4 */}
            <div className="p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#009f9d]">
                    {category}
                </p>

                {/* Removed min-h, reduced text size to text-base, clamped to 2 lines max */}
                <h3 className="mt-1 line-clamp-2 text-base font-extrabold leading-tight text-[#07182c]">
                    {name}
                </h3>

                {/* Tightened margins */}
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <FaStar className="text-[#ffb020]" />
                    <span>{rating}</span>
                    <span>({reviews})</span>
                </div>

                {/* Reduced font size from text-2xl to text-xl */}
                <div className="mt-3 flex items-center gap-2">
                    <h4 className="text-xl font-extrabold text-[#07182c]">
                        ${price}
                    </h4>

                    {oldPrice && (
                        <span className="text-xs font-bold text-slate-400 line-through">
                            ${oldPrice}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
````

## File: Frontend/src/features/Marketplace/components/ProductsGrid.tsx
````typescript
import { FaSortAmountDown } from "react-icons/fa";

import ProductCard from "./ProductCard";
import { products } from "../data/marketplace.data";

const ProductsGrid = () => {
    return (
        <section
            className="px-5 py-16 lg:px-16"
           
        >
            <div className="mx-auto max-w-7xl">
                <div>
                    <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white/90 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-extrabold text-[#07182c]">
                                Featured Products
                            </h2>

                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                Showing {products.length} pet products
                            </p>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm border border-slate-100">
                            <FaSortAmountDown className="text-[#009f9d]" />

                            <select className="bg-transparent text-sm font-bold text-[#07182c] outline-none">
                                <option>Sort by Popular</option>
                                <option>Lowest Price</option>
                                <option>Highest Rated</option>
                                <option>Newest First</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                category={product.category}
                                price={product.price}
                                oldPrice={product.oldPrice}
                                rating={product.rating}
                                reviews={product.reviews}
                                image={product.image}
                                badge={product.badge}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsGrid;
````

## File: Frontend/src/features/Marketplace/data/marketplace.data.ts
````typescript
export const categories = [
    "All Categories",
    "Pet Food",
    "Toys & Accessories",
    "Health & Medicine",
    "Grooming",
    "Supplements",
    "Beds & Furniture",
    "Collars & Leashes",
    "Training & Behavior",
];

export const products = Array.from({ length: 100 }, (_, index) => {
    const categories = [
        "Pet Food",
        "Toys & Accessories",
        "Supplements",
        "Beds & Furniture",
        "Collars & Leashes",
        "Grooming",
        "Health & Medicine",
        "Training",
        "Travel",
        "Cat Supplies",
    ];

    const productNames = [
        "Premium Dog Food",
        "Interactive Pet Toy",
        "Vitamin Supplement",
        "Luxury Pet Bed",
        "Adjustable Collar",
        "Pet Shampoo",
        "Dental Care Kit",
        "Training Clicker",
        "Travel Carrier",
        "Cat Scratching Post",
    ];

    return {
        id: index + 1,
        name: `${productNames[index % productNames.length]} ${index + 1}`,
        category: categories[index % categories.length],
        price: +(Math.random() * 50 + 5).toFixed(2),
        oldPrice: +(Math.random() * 60 + 10).toFixed(2),
        rating: +(Math.random() * 1 + 4).toFixed(1), // 4.0 - 5.0
        reviews: Math.floor(Math.random() * 500) + 50,
        image: `https://picsum.photos/seed/pet${index + 1}/600/600`,
        badge:
            index % 5 === 0
                ? "Best Seller"
                : index % 3 === 0
                    ? "20% OFF"
                    : "",
    };
});

export const benefits = [
    {
        title: "100% Genuine Products",
        subtitle: "Trusted pet brands",
    },

    {
        title: "Easy Returns",
        subtitle: "Within 7 days",
    },

    {
        title: "Fast Delivery",
        subtitle: "Quick & reliable",
    },

    {
        title: "Secure Payments",
        subtitle: "100% protected",
    },
];
````

## File: Frontend/src/features/Marketplace/pages/MarketplacePage.tsx
````typescript
import MarketplaceHero from "../components/MarketplaceHero";
import MarketplaceBenefits from "../components/MarketplaceBenefits";
import MarketplaceCategories from "../components/MarketplaceCategories";
import ProductsGrid from "../components/ProductsGrid";
import MarketplaceBanner from "../components/MarketplaceBanner";
import MarketplaceCTA from "../components/MarketplaceCTA";

const MarketplacePage = () => {
    return (
        <>
            <MarketplaceCategories />
            <ProductsGrid />

        </>
    );
};

export default MarketplacePage;
````

## File: Frontend/src/features/Payment/page/PaymentCancelPage.tsx
````typescript

````

## File: Frontend/src/features/Payment/page/PaymentSuccessPage.tsx
````typescript

````

## File: Frontend/src/features/Payment/payment.routes.tsx
````typescript
// import AppointmentPaymentPage from "./page/AppointmentPaymentPage";
// import PaymentSuccessPage from "./page/PaymentSuccessPage";
// import PaymentCancelPage from "./page/PaymentCancelPage";

// export const paymentRoutes = [
//   {
//     path: "/appointment-payment",
//     element: <AppointmentPaymentPage />,
//   },
//   {
//     path: "/payment/success",
//     element: <PaymentSuccessPage />,
//   },
//   {
//     path: "/payment/cancel",
//     element: <PaymentCancelPage />,
//   },
// ];
````

## File: Frontend/src/features/Pet Owner/pet details/schemas/petIssueReport.schema.ts
````typescript
import { z } from "zod";

export const petIssueReportSchema = z.object({
  petId: z.string().min(1, "Please select your pet"),
  issue: z
    .string()
    .min(10, "Issue details must be at least 10 characters")
    .max(500, "Issue details must be less than 500 characters"),
  appointmentType: z.enum(["NORMAL_CHECKUP"], {
    message: "Please select appointment type",
  }),
  checkupTime: z.string().min(1, "Please select an appointment slot"),
});

export type PetIssueReportFormData = z.infer<typeof petIssueReportSchema>;
````

## File: Frontend/src/features/Services/index.tsx
````typescript
export { default as servicesRoutes } from "./service.route";
````

## File: Frontend/src/index.css
````css
@import "tailwindcss";


html {
    overflow-y: scroll;
    /* Forces a single scrollbar track */
    height: auto;
}

body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
}

html.lenis,
html.lenis body {
    height: auto;
}

.lenis.lenis-smooth {
    scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
}

.lenis.lenis-stopped {
    overflow: hidden;
}

.lenis.lenis-scrolling iframe {
    pointer-events: none;
}
````

## File: Frontend/src/main.tsx
````typescript
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'


createRoot(document.getElementById('root')!).render(

  <App />

)
````

## File: Frontend/src/ProtectedRoutes/DoctorProtectedRoutes.tsx
````typescript
import { Navigate } from "react-router-dom";
import Notfound from "@/shared/components/Notfound/Notfound";
import { useAuth } from "@/features/Auth/hooks/authhook";

export const DoctorProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const role = 'doctor';
    const { isAuthenticatedUser, user, isLoading } = useAuth();
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (!isAuthenticatedUser) {
        return <Navigate to={'/login'}></Navigate>
    }
    if (!user?.data.role.toLowerCase().includes(role)) {
        return <Notfound />
    }
    return children;
}
````

## File: Frontend/src/shared/components/Footer/Footer.tsx
````typescript
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

import Logo from "../../../shared/components/Logo/Logo";
import Button from "../../../shared/components/Button";

const Footer = () => {
    return (
        <footer className="bg-[#f5fbff] px-6 pt-12 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 border-b border-slate-200 pb-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr_1.5fr]">
                    <div className="border-slate-200 lg:border-r lg:pr-10">
                        <Logo />

                        <p className="mt-6 max-w-[240px] text-sm leading-7 text-slate-600">
                            We are here to make pet care simple, accessible and trusted for
                            every pet parent.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <a className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white">
                                <FaFacebookF />
                            </a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4405f] text-white">
                                <FaInstagram />
                            </a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1da1f2] text-white">
                                <FaTwitter />
                            </a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff0000] text-white">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-6 text-lg font-extrabold text-[#07182c]">
                            Quick Links
                        </h3>
                        <ul className="space-y-4 text-sm font-semibold text-slate-700">
                            <li>Home</li>
                            <li>Marketplace</li>
                            <li>Services</li>
                            <li>Doctors</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-lg font-extrabold text-[#07182c]">
                            Company
                        </h3>
                        <ul className="space-y-4 text-sm font-semibold text-slate-700">
                            <li>About Us</li>
                            <li>Contact Us</li>
                            <li>FAQs</li>
                            <li>Blog</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-lg font-extrabold text-[#07182c]">
                            Support
                        </h3>
                        <ul className="space-y-4 text-sm font-semibold text-slate-700">
                            <li>Help Center</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Refund Policy</li>
                        </ul>
                    </div>

                    <div className="border-slate-200 lg:border-r lg:pr-10">
                        <h3 className="mb-6 text-lg font-extrabold text-[#07182c]">
                            Contact Us
                        </h3>

                        <ul className="space-y-5 text-sm font-semibold text-slate-700">
                            <li className="flex items-center gap-4">
                                <FaPhoneAlt className="text-[#009f9d]" />
                                +92 300 1234567
                            </li>
                            <li className="flex items-center gap-4">
                                <FaEnvelope className="text-[#009f9d]" />
                                support@petsveta.com
                            </li>
                            <li className="flex items-center gap-4">
                                <FaMapMarkerAlt className="text-[#009f9d]" />
                                Islamabad, Pakistan
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-lg font-extrabold text-[#07182c]">
                            Newsletter
                        </h3>

                        <p className="mb-5 text-sm leading-7 text-slate-600">
                            Subscribe to get the latest updates and pet care tips.
                        </p>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="mb-4 w-full rounded-2xl border-none bg-white px-5 py-4 text-sm shadow-lg outline-none placeholder:text-slate-400"
                        />

                        <Button
                            variant="primary"
                            size="md"
                            className="!rounded-2xl !bg-[#009f9d] !border-[#009f9d] !text-white hover:!bg-[#008f8d] hover:!text-white"
                        >
                            Subscribe
                        </Button>
                    </div>
                </div>

                <p className="py-6 text-center text-sm font-semibold text-slate-500">
                    © 2025 PetsVeta. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
````

## File: Frontend/src/shared/components/Input/Input.tsx
````typescript
import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
  rightText?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
};

const Input = ({
  label,
  error,
  icon,
  rightText,
  showPassword,
  onTogglePassword,
  className = "",
  type = "text",
  ...props
}: InputProps) => {
  const inputType =
    type === "password" && showPassword !== undefined
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        <input
          type={inputType}
          className={`w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#178f95] focus:ring-2 focus:ring-[#178f95]/20 ${
            icon ? "pl-10" : ""
          } ${rightText || onTogglePassword ? "pr-16" : ""} ${className}`}
          {...props}
        />

        {rightText && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            {rightText}
          </span>
        )}

        {onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#178f95]"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
````

## File: Frontend/src/shared/components/Notfound/Notfound.tsx
````typescript
const Notfound = () => {
  return (
    <div>
      <h2>Notfound</h2>
    </div>
  );
};

export default Notfound;
````

## File: Frontend/src/shared/components/SearchBar/SearchBar.tsx
````typescript
import { FaSearch } from "react-icons/fa";
import type { ChangeEventHandler } from "react";

type SearchBarProps = {
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

const SearchBar = ({
  placeholder,
  value,
  onChange,
  className = "",
}: SearchBarProps) => {
  return (
    <div className={`relative w-full max-w-full ${className}`}>
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-cyan-500"
      />
    </div>
  );
};

export default SearchBar;
````

## File: Frontend/src/styles/doctor-signup.module.css
````css
.container {
  min-height: 100vh;
  display: flex;
  background: #f8f9fa;
}
/* LEFT SIDE */
.left {
  flex: 1;
  display: flex;
  align-items: center; /* ✅ vertical center */
  justify-content: center;
  padding: 40px;
}

/* FORM BOX */
.formBox {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

/* RIGHT SIDE */
.right {
  flex: 1;
  display: flex; /* ✅ important fix */
  align-items: center; /* ✅ center match with form */
  justify-content: center;
  overflow: hidden;
}

/* IMAGE FIX */
.image {
  width: 100%;
  height: 100vh; /* full screen match */
  object-fit: cover;
  display: block; /* ✅ removes weird gap */
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
}
````

## File: Frontend/src/styles/login.module.css
````css
.container {
  min-height: 100vh;
  display: flex;
  background: #f8f9fa;
}

/* LEFT IMAGE SIDE */
.left {
  flex: 1;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  display: block;
}

/* RIGHT FORM SIDE */
.right {
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 32px;
}

/* FORM CARD */
.formBox {
  width: 100%;
  max-width: 390px;

  background: rgba(255, 255, 255, 0.9);

  padding: 26px;

  border-radius: 20px;

  backdrop-filter: blur(10px);

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
}

/* MOBILE */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .left {
    display: none;
  }

  .right {
    padding: 20px;
  }

  .formBox {
    max-width: 100%;
    padding: 24px;
  }
}

.left {
  position: relative;
}

.left::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
}
````

## File: Backend/app/controllers/payment.controller.js
````javascript
const catchAsync = require('../utils/CatchAsync');

const { stripe } = require('../config/stripe');
const prisma = require('../config/prisma');
const { PaymentStatus } = require('@prisma/client')

const stripeWebhook = async (req, res) => {
    let event;

    try {
        const sig = req.headers["stripe-signature"];

        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log("Webhook signature error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }


    switch (event.type) {


        case "checkout.session.completed": {
            const session = event.data.object;

            const appointmentId = session.metadata.appointmentId;

            await prisma.appointment.update({
                where: { id: appointmentId },
                data: {
                    paymentStatus: PaymentStatus.PAID,

                },
            });

            console.log("Payment successful:", appointmentId);
            break;
        }


        case "payment_intent.payment_failed": {
            console.log("Payment failed");
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
};


module.exports = {
    stripeWebhook
}
````

## File: Backend/app/routes/auth.routes.js
````javascript
const express = require('express');
const Router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../config/multer.config');
const { authLimiter } = require('../middleware/rateLimiter');
const { validateRequest } = require('../middleware/zod.middleware')
const { doctorSchema, petOwnerSchema, loginSchema, resetPasswordSchema, forgotPasswordSchema } = require('../schema/zod.schema')

Router
    .route('/me')
    .get(authMiddleware.protect, authController.verifyUser)

Router
    .route('/google/url')
    .get(authLimiter, authController.getGoogleUrlController)

Router
    .route('/google/callback')
    .get(authLimiter, authController.handleGoogleCallbackController)

Router
    .route('/register/doctor')
    .post(upload.single('document'), authController.createDoctorAccount)

Router
    .route('/register/pet-owner')
    .post(authLimiter, validateRequest(petOwnerSchema), authController.createPetOwnerAccount)

Router
    .route('/register/admin')
    .post(authLimiter, authController.createAdminAccount)

Router
    .route('/login/admin')
    .post(authLimiter, validateRequest(loginSchema), authController.adminLogin)

Router
    .route('/login/user')
    .post(authLimiter, validateRequest(loginSchema), authController.loginUserAccount)

Router
    .route('/logout/user')
    .post(authMiddleware.protect, authController.logoutUser)

Router
    .route('/refresh/token')
    .get(authLimiter, authMiddleware.protectRefresh, authController.refreshTokenController)

Router
    .route('/verify/email')
    .post(authLimiter, authController.verifyUserEmail)

Router
    .route('/resend/otp')
    .get(authLimiter, authMiddleware.protectOtp, authController.resendUserOtp)

Router
    .route('/otp-verification')
    .post(authLimiter, authMiddleware.protectOtp, authController.verifyOtp)

Router
    .route('/password-resets')
    .post(authLimiter, authMiddleware.protectOtp, authController.resetUserPassword)







module.exports = Router;
````

## File: Backend/app/routes/payment.routes.js
````javascript
const express = require('express');
const Router = express.Router();
const paymentController = require('../controllers/payment.controller');


Router.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    paymentController.stripeWebhook
);

module.exports = Router;
````

## File: Backend/app/routes/petOwner.routes.js
````javascript
const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const authenticateRole = require('../middleware/authorizeRole.middleware');
const petOwnerController = require('../controllers/petOwner.controller');
const { petOwnerLimiter } = require('../middleware/rateLimiter')

const Router = express.Router();



Router
    .route('/submit/pet-data')
    .post(petOwnerLimiter, authMiddleware.protect, authenticateRole.authenticateUserRole('PetOwner'), petOwnerController.registerPet)

Router
    .route('/submit/pet-issue')
    .post(petOwnerLimiter, authMiddleware.protect, authenticateRole.authenticateUserRole('PetOwner'), petOwnerController.registerPetIssue)

Router
    .route('/petOwner-data')
    .get(petOwnerLimiter, authMiddleware.protect, authenticateRole.authenticateUserRole('PetOwner'), petOwnerController.getPetOwnerById)

Router
    .route('/pets-data')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('PetOwner'), petOwnerController.getPetsData)
module.exports = Router;
````

## File: Backend/app/services/payment.service.js
````javascript

````

## File: Frontend/src/features/Admin/apis/adminlogin.api.ts
````typescript
import axios from "axios";


export type Data = {
    id: string,
    name: string,
    email: string,
    username: string,
    role: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}

type ApiPostData = {
    email: string,
    password: string
}

export const loginAdminAccount = async (data: ApiPostData): Promise<ApiResponse> => {
    console.log("Api response go==>", data)
    const response = await axios.post("http://localhost:8000/api/v1/auth/login/admin",
        data,
        {
            withCredentials: true
        }
    )
    console.log("Api response come==>", response.data)
    return response.data;
}


export const logoutAdmin = async (): Promise<ApiResponse> => {

    const response = await axios.post("http://localhost:8000/api/v1/auth/logout/user",
        {},
        {
            withCredentials: true
        }
    )
    console.log("Api response come==>", response.data)
    return response.data;
}
````

## File: Frontend/src/features/Admin/apis/doctorquery.api.ts
````typescript
import axios from "axios";
import { api } from "@/features/api interface/axios.interface";

export type UserData = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
};

export type DoctorData = {
    id: string;
    education: string;
    specialization: string;
    degreeLicenseUrl: string;
    experience: number;
    isVerified: 'PENDING' | 'APPROVED' | 'REJECTED';
    user: UserData;
};

export type ApiPayload = {
    doctors: DoctorData[];
    totalCount: number;
};

export type DoctorStats = {
    pending: number;
    approved: number;
    total: number;
};

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
};

export const PendingDoctors = async (page: number, limit: number): Promise<ApiResponse<ApiPayload>> => {
    try {
        const response = await api.get(`/admin/pending/doctors?limit=${limit}&page=${page}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
};

export const ApprovedDoctors = async (page: number, limit: number): Promise<ApiResponse<ApiPayload>> => {
    try {
        const response = await api.get(`/admin/approved/doctors?limit=${limit}&page=${page}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
};

export const AllDoctors = async (page: number, limit: number): Promise<ApiResponse<ApiPayload>> => {
    try {
        const response = await api.get(`/admin/all/doctors?limit=${limit}&page=${page}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
};

export const approveDoctorRequest = async (doctorId: string): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post('http://localhost:8000/api/v1/admin/approve-pending/doctor', { doctorId });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
};

export const rejectDoctorRequest = async (doctorId: string): Promise<ApiResponse<any>> => {
    try {
        const response = await api.post("http://localhost:8000/api/v1/admin/reject/doctor", { doctorId });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
};

export const fetchDoctorStats = async (): Promise<ApiResponse<DoctorStats>> => {
    try {
        const response = await api.get("http://localhost:8000/api/v1/admin/doctor-stats");
        return response.data;
    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
};


const handleAxiosError = (error: any) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            console.log("Status Code", error.response?.status);
            console.log("Response Data", error.response?.data);
        } else if (error.request) {
            console.log("No Request Response Received from server", error.request);
        } else {
            console.error("Axios setup error:", error.message);
        }
    } else {
        console.error("Non-Axios Error:", error);
    }
};
````

## File: Frontend/src/features/Admin/components/cards/StatsCard.tsx
````typescript
import { Hourglass } from 'lucide-react'
const toneClasses = {
  orange: "bg-[#fff0da] text-[#f59e0b]",
  green: "bg-[#d9f8e5] text-[#16a34a]",
  red: "bg-[#ffe1e6] text-[#ef4444]",
  blue: "bg-[#dceeff] text-[#2f8be6]",
};


const StatCard = ({
  title,
  value,
  tone,
  icon: Icon,
}: {
  title: string;
  value: string;
  tone: keyof typeof toneClasses;
  icon: typeof Hourglass;
}) => {
  return (
    <div className="border-b border-slate-200 bg-white p-6 last:border-b-0 md:odd:border-r xl:border-b-0 xl:border-r xl:last:border-r-0">
      <div className="flex items-center gap-5">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${toneClasses[tone]}`}
        >
          <Icon size={34} strokeWidth={2.8} />
        </div>
        <div>
          <p className="font-semibold text-[#12213a]">{title}</p>
          <h2 className="mt-1 text-3xl font-black leading-none text-[#0f1b2f]">
            {value}
          </h2>
          <p className="mt-2 text-sm text-[#405169]">Doctors</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard
````

## File: Frontend/src/features/Admin/components/doctors/AdminSidebar.tsx
````typescript
// import Logo from "../../../shared/components/Logo/Logo";
// import { NavLink, useNavigate } from "react-router-dom";
// import { sidebarItems } from "../data/sidebar.data";
// import { LogOut } from 'lucide-react'
// import { logoutAdmin } from '../apis/adminlogin.api'

// const Sidebar = () => {

//   const navigate = useNavigate();
//   const logOutUser = async () => {
//     const response = await logoutAdmin();
//     console.log(response);
//     if (response.success) {
//       navigate('/admin-login')
//     }
//   }
//   return (
//     <div
//       className="
//               hidden lg:flex

//               min-h-screen
//             bg-white
//               border-r border-gray-200
//               p-6
//               flex-col justify-between
//               fixed left-0 top-0
//               "
//     >
//       <div>
//         <Logo />

//         <div className="mt-10 space-y-3">
//           {sidebarItems.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.id}
//                 to={item.address}
//                 className={({ isActive }: { isActive: boolean }) => `
//                              flex items-center gap-3
//                              px-4 py-3
//                               rounded-xl
//                             cursor-pointer
//                               transition-all duration-300

//                              ${isActive
//                     ? "bg-[#06777D] text-white shadow-lg"
//                     : "hover:bg-cyan-100 text-gray-700"}
//                               `}
//               >
//                 <Icon />
//                 {item.title}
//               </NavLink>

//             );
//           })}
//         </div>
//       </div>

//       <div className="flex gap-1.5 items-center justify-start ">
//         <button className="text-red-500 font-semibold cursor-pointer"
//           onClick={logOutUser}
//         >Logout </button>
//         <LogOut className="size-4 text-red-500 hover:scale-75 cursor-pointer" />
//       </div>
//     </div >
//   );
// };

// export default Sidebar;
// [9:02 PM]import Logo from "../../../shared/components/Logo/Logo";
// import { NavLink, useNavigate } from "react-router-dom";
// import { sidebarItems } from "../data/sidebar.data";
// import { LogOut } from 'lucide-react'
// import { logoutAdmin } from '../apis/adminlogin.api'

// const Sidebar = () => {

//   const navigate = useNavigate();
//   const logOutUser = async () => {
//     const response = await logoutAdmin();
//     console.log(response);
//     if (response.success) {
//       navigate('/admin-login')
//     }
//   }
//   return (
//     <div
//       className="
//               hidden lg:flex

//               min-h-screen
//             bg-white
//               border-r border-gray-200
//               p-6
//               flex-col justify-between
//               fixed left-0 top-0
//               "
//     >
//       <div>
//         <Logo />

//         <div className="mt-10 space-y-3">
//           {sidebarItems.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.id}
//                 to={item.address}
//                 className={({ isActive }: { isActive: boolean }) => `
//                              flex items-center gap-3
//                              px-4 py-3
//                               rounded-xl
//                             cursor-pointer
//                               transition-all duration-300

//                              ${isActive
//                     ? "bg-[#06777D] text-white shadow-lg"
//                     : "hover:bg-cyan-100 text-gray-700"}
//                               `}
//               >
//                 <Icon />
//                 {item.title}
//               </NavLink>

//             );
//           })}
//         </div>
//       </div>

//       <div className="flex gap-1.5 items-center justify-start ">
//         <button className="text-red-500 font-semibold cursor-pointer"
//           onClick={logOutUser}
//         >Logout </button>
//         <LogOut className="size-4 text-red-500 hover:scale-75 cursor-pointer" />
//       </div>
//     </div >
//   );
// };

// export default Sidebar;
````

## File: Frontend/src/features/Admin/layout/MobileSidebar.tsx
````typescript
import Sidebar from "./Sidebar";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileSidebar = ({ open, setOpen }: Props) => {
  return <Sidebar sidebarOpen={open} setSidebarOpen={setOpen} />;
};

export default MobileSidebar;
````

## File: Frontend/src/features/Admin/pages/AdminDoctorPage.tsx
````typescript
import DoctorRequests from "../components/doctors/DoctorRequests";

const AdminDoctorPage = () => {


  return <DoctorRequests />;
};

export default AdminDoctorPage;
````

## File: Frontend/src/features/Appointment/pages/BookAppointmentPage.tsx
````typescript
import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import PetForm from "../../Pet Owner/pet details/components/PetForm";
import PetIssueReportForm from "../../Pet Owner/pet details/components/PetIssueReportForm";
import Button from "../../../shared/components/Button/Button";
import { useAuth } from "@/features/Auth/hooks/authhook";

type CreatedPet = {
  id: string;
  name: string;
};

const BookAppointmentPage = () => {
  const { id: doctorId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { user } = useAuth()
  const navigate = useNavigate();
  const selectedCheckupTime = searchParams.get("checkupTime") || "";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [createdPet, setCreatedPet] = useState<CreatedPet | null>(null);

  const handlePetSubmitSuccess = (newPet: CreatedPet) => {
    console.log("Successfully added pet for appointment:", newPet);
    setCreatedPet(newPet);
    setStep(2);
  };

  const handleIssueSubmitSuccess = (issueReport: unknown) => {
    console.log("Successfully submitted issue report:", issueReport);
    setStep(3);
  };

  const handleCancel = () => {
    navigate(-1);
  };
  
  if (step === 3) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] px-4 py-12 flex flex-col items-center justify-center font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_15px_40px_rgba(15,23,42,0.06)] border border-slate-100 overflow-hidden p-8 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-500 animate-bounce">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-3">
            Appointment Booked!
          </h2>
          <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
            Your pet&apos;s issue report has been successfully submitted and the appointment has been booked. You will receive updates shortly.
          </p>
          <Button
            onClick={() => navigate("/doctors")}
            className="bg-[#0B8F5A] hover:bg-[#097b4d] text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-emerald-900/10 transition-transform duration-200 active:scale-[0.98]"
          >
            Return to Doctors List
          </Button>
        </div>
      </main>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Sticky Step Progress Header bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-850 font-bold transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        {/* Step Indicators */}
        <div className="flex items-center gap-6">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${step >= 1
                ? "bg-[#6D3DD9] text-white"
                : "bg-slate-100 text-slate-400"
                }`}
            >
              1
            </div>
            <span className={`text-sm font-extrabold hidden sm:inline ${step === 1 ? "text-[#6D3DD9]" : "text-slate-400"}`}>
              Register Pet
            </span>
          </div>

          {/* Line separator */}
          <div className="w-8 h-[2px] bg-slate-200" />

          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${step >= 2
                ? "bg-[#0B8F5A] text-white"
                : "bg-slate-100 text-slate-400"
                }`}
            >
              2
            </div>
            <span className={`text-sm font-extrabold hidden sm:inline ${step === 2 ? "text-[#0B8F5A]" : "text-slate-400"}`}>
              Pet Issue Details
            </span>
          </div>
        </div>

        <div className="w-10 sm:w-16" /> {/* Spacer to center the progress indicator */}
      </div>

      {/* Render current step component */}
      <div className="flex-1">
        {step === 1 ? (
          <PetForm
            onSubmitSuccess={handlePetSubmitSuccess}
            onCancel={handleCancel}
          />
        ) : (
          <PetIssueReportForm
            preselectedPetId={createdPet?.id}
            doctorId={doctorId || ""}
            preselectedCheckupTime={selectedCheckupTime}
            onSubmitSuccess={handleIssueSubmitSuccess}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default BookAppointmentPage;
````

## File: Frontend/src/features/Appointment/pages/DoctorProfilePage.tsx
````typescript
import { Link, useParams } from "react-router-dom";
import {
    FaArrowLeft,
    FaCheckCircle,
    FaGraduationCap,
    FaUserMd,

} from "react-icons/fa";
import { User } from 'lucide-react'

import { getDoctorProfileData, type BookableSlot } from "../apis/doctorProfile.api";
import { useEffect, useState } from "react";

type DoctorType = {
    id: string;
    name: string;
    image: string;
    status: string;
    specialty: string;
    experience: number;
    rating: number;
    reviews: number;
    location: string;
    fees: number;
    tags: string[];
    about: string;
    education: string;
    qualification: string;
    certification: string;
    nextSlot: string;
    specialization: string;
    availableSlots: BookableSlot[];
    todaySlots: BookableSlot[];
    nextAvailable: BookableSlot | null;
} | null;


const DoctorProfilePage = () => {
    console.log("Hittig Compoenents");
    const { id } = useParams();
    console.log("Id is ", id);

    const [doctor, setDoctor] = useState<DoctorType>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const doctorProfileData = async () => {
            setLoading(true);
            if (id) {
                const data = await getDoctorProfileData(id);
                console.log("Doctor Profile Data", data);
                console.log("Doctor is ", data);
                setDoctor(data);
            }
            setLoading(false);
        };
        doctorProfileData();
    }, [id])

    if (!doctor) {
        return (
            <section className="min-h-screen bg-[#f5fbff] px-5 py-12 lg:px-16">
                <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 text-center shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                    <h1 className="text-3xl font-extrabold text-[#07182c]">
                        {loading ? "Loading..." : "Doctor Not Found"}
                    </h1>

                    <p className="mt-2 text-slate-500">
                        The doctor profile you are looking for does not exist.
                    </p>

                    <Link
                        to="/doctors"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#009f9d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#007f7d]"
                    >
                        <FaArrowLeft />
                        Back to Doctors
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#f5fbff] px-5 py-12 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <Link
                    to="/doctors"
                    className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#009f9d] shadow-sm transition hover:bg-[#eefafa]"
                >
                    <FaArrowLeft />
                    Back to Doctors
                </Link>

                <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                    <div className="space-y-6">
                        <div className="rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                            <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                                <div className="relative h-60 overflow-hidden rounded-3xl bg-[#eefafa] flex justify-center items-center">
                                    {
                                        doctor.image.startsWith('/') ?
                                            <img
                                                src={doctor.image}
                                                alt={doctor.name}
                                                className="h-full w-full object-cover"
                                            /> :
                                            <User size={112} />
                                    }

                                   
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h1 className="text-3xl font-extrabold text-[#07182c]">
                                            {doctor.name}
                                        </h1>

                                        <FaCheckCircle className="text-xl text-[#009f9d]" />
                                    </div>

                                    <p className="mt-2 text-lg font-bold text-slate-500">
                                        {doctor.specialization}
                                    </p>

                                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                        <div className="rounded-2xl bg-[#f5fbff] p-4">
                                            <p className="text-sm font-semibold text-slate-500">
                                                Experience
                                            </p>
                                            <h3 className="mt-1 text-xl font-extrabold text-[#07182c]">
                                                {doctor.experience} Years
                                            </h3>
                                        </div>





                                        <div className="rounded-2xl bg-[#f5fbff] p-4">
                                            <p className="text-sm font-semibold text-slate-500">
                                                Consultation Fee
                                            </p>
                                            <h3 className="mt-1 text-xl font-extrabold text-[#07182c]">
                                                Rs. {doctor.fees}
                                            </h3>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                            <h2 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-[#07182c]">
                                <FaGraduationCap className="text-[#009f9d]" />
                                Education & Qualification
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-bold text-slate-500">
                                        Education
                                    </p>
                                    <p className="mt-1 font-semibold text-[#07182c]">
                                        {doctor.education}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-slate-500">
                                        Qualification
                                    </p>
                                    <p className="mt-1 font-semibold text-[#07182c]">
                                        {doctor.specialization}
                                    </p>
                                </div>


                            </div>
                        </div>

                    </div>

                    <aside className="h-fit rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eefafa] text-2xl text-[#009f9d]">
                            <FaUserMd />
                        </div>

                        <h2 className="text-2xl font-extrabold text-[#07182c]">
                            Select Slot to Book Appointment
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Select this doctor and continue to appointment form.
                        </p>

                        <div className="mt-5">
                            <h3 className="text-sm font-extrabold text-[#07182c]">
                                Available Slots
                            </h3>

                            {doctor.availableSlots?.length > 0 ? (
                                <div className="mt-3 grid grid-cols-2 gap-2">
                                    {doctor.availableSlots.slice(0, 8).map((slot) => (
                                        <Link
                                            key={`${slot.scheduleId}-${slot.startDateTime}`}
                                            to={`/book-appointment/${id}?checkupTime=${encodeURIComponent(slot.startDateTime)}`}
                                            className="rounded-xl border border-slate-200 px-3 py-2 text-center text-xs font-extrabold text-[#07182c] transition hover:border-[#009f9d] hover:bg-[#eefafa]"
                                        >
                                            <span className="block text-[11px] text-slate-500">
                                                {slot.day}
                                            </span>
                                            {slot.startTime} - {slot.endTime}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-500">
                                    No appointment slots available.
                                </p>
                            )}
                        </div>

                       
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default DoctorProfilePage;
````

## File: Frontend/src/features/Auth/api/loginuser.api.ts
````typescript
import axios from "axios"
import type { LoginFormData } from "../schemas/login.schema";
import { api } from "@/features/api interface/axios.interface";

type Data = {
    id: string,
    email: string,
    role: string,
    username: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}

export const userLogin = async<T>(data: LoginFormData): Promise<T> => {
    try {
        const response = await api.post("auth/login/user", data)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status == 429) {
                    throw new Error("Please wait for a minute")
                }
                console.log("Status Code", error.response?.status);
                console.log("Response Data", error.response?.data)
            }
            else if (error.request) {
                console.log("No Request Response Recieved from server", error.request)
            }
            else {
                console.error("Axios setup error:", error.message);
            }

        }
        else {
            console.error("Non-Axios Error:", error);
        }
        throw error

    }
}


export const verifyUser = async (): Promise<ApiResponse> => {

    try {
        const response = await api.get("auth/me",
            {
                withCredentials: true
            }
        )
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log("Status Code", error.response?.status);
                console.log("Response Data", error.response?.data)
            }
            else if (error.request) {
                console.log("No Request Response Recieved from server", error.request)
            }
            else {
                console.error("Axios setup error:", error.message);
            }

        }
        else {
            console.error("Non-Axios Error:", error);
        }
        throw error

    }
}
````

## File: Frontend/src/features/Auth/api/petOwner.api.ts
````typescript
import type { PetOwnerFormData } from "../schemas/petowner.schema";
import { api, handleAxiosError } from "@/features/api interface/axios.interface";

type Data = {
    id: string,
    email: string,
    username: string,
    role: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}

export const createPetOwnerAccount = async (data: PetOwnerFormData): Promise<ApiResponse> => {
    try {
        const response = await api.post("auth/register/pet-owner", data);

        return response.data;
    } catch (error) {
        handleAxiosError(error)
        throw error

    }
}

export const getGoogleAuthUrlApi = async () => {
    try {
        const response = await api.get("http://localhost:8000/api/v1/auth/google/url");
        return response.data
    }
    catch (error) {
        handleAxiosError(error)
    }
}
````

## File: Frontend/src/features/Auth/api/resetpassword.api.ts
````typescript
import type { ResetPasswordFormData } from "../schemas/reset-password.schema";
import { api, handleAxiosError } from "@/features/api interface/axios.interface";

type Data = {
    email: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}

export const resetPasswordRequest = async (data: ResetPasswordFormData): Promise<ApiResponse> => {
    try {
        const response = await api.post("auth/password-resets", data)

        return response.data;

    } catch (error) {
        handleAxiosError(error)
        throw error

    }
}
````

## File: Frontend/src/features/Auth/api/verifyemail.api.ts
````typescript
import type { ForgotPasswordFormData } from "../schemas/forgot-password.schema";
import { api, handleAxiosError } from "@/features/api interface/axios.interface";

type Data = {
    email: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}

export const veriyUserEmail = async (data: ForgotPasswordFormData): Promise<ApiResponse> => {
    try {
        const response = await api.post("auth/verify/email", data)

        return response.data;

    } catch (error) {
        handleAxiosError(error)
        throw error

    }
}
````

## File: Frontend/src/features/Auth/api/verifyotp.api.ts
````typescript
import type { VerifyOtpFormData } from "../schemas/verify-otp.schema";
import { api, handleAxiosError } from "@/features/api interface/axios.interface";

type Data = {
    id: string,
    username: string,
    email: string,
    role: string
}

type resendOtpData = {
    email: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data | resendOtpData
}

export const verifyUserOtp = async (data: VerifyOtpFormData): Promise<ApiResponse> => {
    try {
        console.log("OTP code inside the function is ", data)
        const response = await api.post("auth/otp-verification",
            data,

        );


        return response.data;
    } catch (error) {
        handleAxiosError(error)
        throw error;

    }
}

export const resendUserOtp = async (): Promise<ApiResponse> => {
    try {
        const response = await api.get("auth/resend/otp");


        return response.data;
    } catch (error) {
        handleAxiosError(error)
        throw error;

    }
}
````

## File: Frontend/src/features/Auth/components/reset-password-form.tsx
````typescript
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import { useResetPassword } from "../hooks/useResetPassword";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../schemas/reset-password.schema";

const passwordFields = [
  {
    name: "password",
    label: "New Password",
    type: "password",
    placeholder: "******",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "******",
  },
] as const;

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate: resetPassword, isPending } = useResetPassword({
    onSuccess: () => {
      reset();
      navigate("/");
    },
    onError: (error) => {
      console.log("Error in reset password", error);
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword(data);
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-900">Reset Password</h1>

        <p className="mt-2 text-gray-500">Create your new password</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {passwordFields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            error={errors[field.name]?.message}
            {...register(field.name)}
          />
        ))}

        <Button type="submit" loading={isPending}>
          Reset Password
        </Button>
      </form>

      <div className="mt-5 text-center">
        <Button href="/verify-otp" text="Back" />
      </div>
    </div>
  );
}
````

## File: Frontend/src/features/Auth/components/verify-otp-form.tsx
````typescript
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button/Button";
import BackButton from "../../../shared/components/Button";
import { useOtp } from "../hooks/useOtp";
import { useResendOtp } from "../hooks/useResendOtp";
import {
  verifyOtpSchema,
  type VerifyOtpFormData,
} from "../schemas/verify-otp.schema";

export default function VerifyOtpForm() {
  const navigate = useNavigate();

  const [timer, setTimer] = useState(360);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { mutate: verifyOtp, isPending: isVerifying } = useOtp({
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.log("==========>>", error);
    },
  });

  const { mutate: resendOtp, isPending: isResending } = useResendOtp({
    onSuccess: () => {
      setTimer(360);
      setValue("otp", "");
    },
    onError: (error) => {
      console.log("==========>>", error);
    },
  });

  const onSubmit = (data: VerifyOtpFormData) => {
    verifyOtp(data);
  };

  const handleResendOtp = () => {
    resendOtp();
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-900">
          Verify OTP
        </h1>
        <p className="mt-2 text-gray-500">
          Enter the 6-digit code
        </p>
      </div>

      <p className="mb-6 text-center text-sm font-medium text-red-500">
        {timer > 0 ? (
          <>
            OTP expires in: {minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </>
        ) : (
          "OTP Expired"
        )}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <input
            type="text"
            maxLength={6}
            placeholder="000000"
            {...register("otp", {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              },
            })}
            className="
              h-14 w-full max-w-62.5 rounded-xl
              border border-gray-300
              text-center text-2xl
              font-semibold tracking-[0.75em] outline-none
              focus:border-blue-900
            "
          />

          {errors.otp && (
            <p className="text-center text-sm text-red-500">
              {errors.otp.message}
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending}
            className="
              cursor-pointer text-sm
              font-medium text-blue-900
              hover:underline
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            Resend OTP
          </button>
        </div>

        <Button type="submit" loading={isVerifying}>
          Verify OTP
        </Button>

        <BackButton
          href="/forgot-password"
          text="Back"
        />
      </form>
    </div>
  );
}
````

## File: Frontend/src/features/Doctor/api/doctorAvailabilityServices.ts
````typescript
import axios from "axios";
import { api } from "../../api interface/axios.interface";

export type WeekDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type DoctorSchedule = {
  id: string;
  doctorId: string;
  day: WeekDay;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

export type DoctorSchedulePayload = {
  date: string;      
  startTime: string;  
  endTime: string;    
};
type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const handleAxiosError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.log("Status Code", error.response?.status);
      console.log("Response Data", error.response?.data);
    } else if (error.request) {
      console.log("No Request Response Received from server", error.request);
    } else {
      console.error("Axios setup error:", error.message);
    }
  } else {
    console.error("Non-Axios Error:", error);
  }
};

export const getDoctorAvailability = async (): Promise<ApiResponse<DoctorSchedule[]> | undefined> => {
  try {
    const response = await api.get<ApiResponse<DoctorSchedule[]>>("doctor/schedule/me");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    return undefined;
  }
};



export const createDoctorAvailabilitySlot = async (
  payload: DoctorSchedulePayload,
): Promise<ApiResponse<DoctorSchedule> | undefined> => {
  try {
    const response = await api.post<ApiResponse<DoctorSchedule>>(
      "doctor/schedule",
      payload,
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    return undefined;
  }
};
````

## File: Frontend/src/features/Doctor/api/doctorServices.ts
````typescript
import { api } from '../../api interface/axios.interface'
import { handleAxiosError } from '../../api interface/axios.interface'

export type Data = {
    email: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}



export const submitDoctorSkills = async (doctorSkills: { skill: string, price: string }) => {
    try {
        const response = await api.post("http://localhost:8000/api/v1/doctor/add/service", doctorSkills);
        return response.data;

    } catch (error) {
        handleAxiosError(error);
        throw error;
    }

}


export const getDoctorServices = async () => {
    try {
        const response = await api.get("http://localhost:8000/api/v1/doctor/get/services");
        return response.data;

    } catch (error) {
        handleAxiosError(error);
        throw error;
    }

}


export const editDoctorService = async (data: { serviceId: string, skill: string, price: string }) => {
    try {
        const response = await api.patch("http://localhost:8000/api/v1/doctor/edit/service", data);
        return response.data;

    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
}


export const deleteDoctorService = async (serviceId: string) => {
    try {
        const response = await api.delete("http://localhost:8000/api/v1/doctor/delete/service", { data: { serviceId } });
        return response.data;

    } catch (error) {
        handleAxiosError(error);
        throw error;
    }
}
````

## File: Frontend/src/features/Doctor/components/DoctorAvailability/DoctorAvailability.tsx
````typescript
import { useEffect, useState, type ChangeEvent } from "react";
import ScheduleModal from "./ScheduleModal";
import ScheduleTable from "./ScheduleTable";
import { createDoctorAvailabilitySlot, getDoctorAvailability } from "../../api/doctorAvailabilityServices";

interface ScheduleFormData {
  date: string;
  startTime: string;
  endTime: string;
}


interface BackendScheduleItem {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

const DoctorAvailability = () => {
  
  const [schedule, setSchedule] = useState<ScheduleFormData>({
    date: "",
    startTime: "",
    endTime: ""
  });


  const [schedulesList, setSchedulesList] = useState<BackendScheduleItem[]>([]);
  const [error, setError] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Reusable helper to pull data directly into state
  const loadDoctorSchedule = async () => {
    try {
      const response = await getDoctorAvailability();
      // Handle standard wrappers (like response.data) if your API instance utilizes them
      const data = response?.data || response;
      if (Array.isArray(data)) {
        setSchedulesList(data);
      }
    } catch (err) {
      console.error("Failed to load doctor availability slots:", err);
      setError("Could not retrieve your active schedule list.");
    }
  };

  // Initial fetch on component mounting
  useEffect(() => {
    loadDoctorSchedule();
  }, []);

  const handleSchedule = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSchedule((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const scheduleApiFunc = () => {
    if (!schedule.date || !schedule.startTime || !schedule.endTime) {
      setError("Schedule timing data is missing.");
      return;
    }

    if (schedule.startTime >= schedule.endTime) {
      setError("Starting time must be earlier than the ending time.");
      return;
    }

    const selectedDate = new Date(`${schedule.date}T${schedule.startTime}`);
    const currentTime = new Date();
    const [startHours, startMinutes] = schedule.startTime.split(':').map(Number);
    const [endHours, endingMinutes] = schedule.endTime.split(":").map(Number);

    const totalStartTime = (startHours * 60) + startMinutes;
    const totalEndTime = (endHours * 60) + endingMinutes;
    const durationMinutes = totalEndTime - totalStartTime;

    if (durationMinutes % 60 !== 0) {
      setError("Please select full-hour increments only.");
      return;
    }

    if (selectedDate <= currentTime) {
      setError("Please select a future date and time.");
      return;
    }

    setError("");
    setOpenModal(true);
  };

  const handleDoctorSchedule = async () => {
    try {
      setError("");
      console.log("Finalized Schedule ready for Database API: ", schedule);


      await createDoctorAvailabilitySlot(schedule);

    
      setSchedule({
        date: "",
        startTime: "",
        endTime: ""
      });

      setOpenModal(false);

     
      await loadDoctorSchedule();
    } catch (err) {
      console.error("Error creating schedule slot:", err);
      setError("Failed to sync new slot generation with database records.");
      setOpenModal(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl p-6">
      <section>
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900">
          Set Your Schedule
        </h1>
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="text-sm font-bold text-slate-700">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={schedule.date}
                onChange={handleSchedule}
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="startTime" className="text-sm font-bold text-slate-700">
                Start Time
              </label>
              <input
                name="startTime"
                type="time"
                id="startTime"
                value={schedule.startTime}
                onChange={handleSchedule}
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="endTime" className="text-sm font-bold text-slate-700">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                id="endTime"
                value={schedule.endTime}
                onChange={handleSchedule}
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-50"
              />
            </div>
          </div>

          {error && (
            <div className="mb-5 mt-5 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-600">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-black text-white">
                !
              </span>
              <p>{error}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end border-t border-slate-100 pt-6">
            <button
              onClick={scheduleApiFunc}
              type="button"
              className="rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
            >
              Add Time Slot
            </button>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-extrabold text-slate-900">
          Generated Schedule List
        </h2>
        {/* Sends backend-compliant type layout safely downstream */}
        <ScheduleTable schedules={schedulesList} />
      </section>

      <ScheduleModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        schedule={schedule}
        setSchedule={setSchedule}
        error={error}
        setError={setError}
        onConfirm={handleDoctorSchedule}
      />
    </main>
  );
};

export default DoctorAvailability;
````

## File: Frontend/src/features/Doctor/components/DoctorSideBar.tsx
````typescript
import { CalendarDays, DollarSignIcon, Home, LogOut, Users, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "@/shared/components/Logo/Logo";

type DoctorSidebarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
};

export const DoctorSidebar = ({ sidebarOpen, setSidebarOpen }: DoctorSidebarProps) => {
    const sidebarLinks = [
        { id: 1, label: "Dashboard", icon: Home, address: "doctor-dashboard" },
        { id: 2, label: "Appointments", icon: CalendarDays, address: "appointments" },
        { id: 3, label: "Patients", icon: Users, address: "pateints" },
        { id: 4, label: "Availability", icon: CalendarDays, address: "doctor-availability" },
        { id: 5, label: "Pricing", icon: DollarSignIcon, address: "doctor-pricing" },
        { id: 6, label: "Profile", icon: Users, address: "doctor-dashboard-profile" },
    ];

    return (
        <>
            {sidebarOpen && (
                <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
                    aria-label="Close sidebar"
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <Logo />
                    </div>

                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={22} />
                    </button>
                </div>

                <nav className="space-y-2 px-4 py-5">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                            <NavLink
                                to={link.address}
                                key={link.id}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) => `outline-none flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${isActive
                                    ? "bg-teal-700 text-white shadow-md shadow-teal-700/20"
                                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                            >
                                <Icon size={19} />
                                {link.label}
                            </NavLink>
                        );
                    })}

                    <div className="pt-8">
                        <button
                            type="button"
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
                        >
                            <LogOut size={19} />
                            Logout
                        </button>
                    </div>
                </nav>
            </aside>
        </>
    );
};
````

## File: Frontend/src/features/Doctorcart/apis/getDoctors.api.ts
````typescript
export type DoctorApiResponse = {
  success: boolean;
  message: string;
  data: {
    data: Doctor[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

export type Doctor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  education: string;
  experience: number;
  profileImage?: string;
  status: "active" | "inactive";
  availableDays: string[];
  todaySlots: {
    scheduleId: string;
    date: string;
    day: string;
    startTime: string;
    endTime: string;
    startDateTime: string;
    endDateTime: string;
  }[];
  nextAvailable: {
    scheduleId: string;
    date: string;
    day: string;
    startTime: string;
    endTime: string;
    startDateTime: string;
    endDateTime: string;
  } | null;
};

export const getApprovedDoctors = async (
  page: number,
  limit: number,
  search: string
): Promise<DoctorApiResponse> => {
  const response = await fetch(
    `http://localhost:8000/api/v1/user/approved-doctors?page=${page}&limit=${limit}&search=${search}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }
  console.log("DOctor Fetching Error is ", response);

  return response.json();
};
````

## File: Frontend/src/features/Doctorcart/component/EditDoctorProfileForm.tsx
````typescript
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Button from "../../../shared/components/Button/Button";
import Input from "../../../shared/components/Input/Input";

import {
  doctorProfileSchema,
  type DoctorProfileFormData,
  type DoctorProfileFormInput,
} from "../schemas/doctorProfile.schema";

import { updateDoctorProfileApi } from "../apis/doctorProfile.api";
import { useDoctorProfileById } from "../hooks/useDoctorProfile";

const EditDoctorProfileForm = () => {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  const { data: profileData, isLoading, error } = useDoctorProfileById();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DoctorProfileFormInput, unknown, DoctorProfileFormData>({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues: {
      fullName: "",
      username: "",
      phone: "",
      profileImageUrl: "",
      specialization: "",
      education: "",
      address: "",
      experience: "",
      fees: "",
      isAvailable: true,
    },
  });

  const isAvailable = watch("isAvailable");

  useEffect(() => {
    if (profileData?.success) {
      const d = profileData.data;
      reset({
        fullName: d.fullName || "",
        username: d.username || "",
        phone: d.phone || "",
        profileImageUrl: d.profileImageUrl || "",
        specialization: d.specialization || "",
        education: d.education || "",
        address: d.address || "",
        experience: String(d.experience ?? ""),
        fees: String(d.fees ?? ""),
        isAvailable: d.isAvailable ?? true,
      });
    }

    if (error) {
      console.log("Fetch doctor profile error:", error);
      setApiError("Failed to load doctor profile.");
    }
  }, [profileData, error, reset]);

  const onSubmit = async (data: DoctorProfileFormData) => {
    try {
      setApiError("");
      setApiMessage("");

      const response = await updateDoctorProfileApi(data);

      if (response.success) {
        setApiMessage(response.message || "Profile updated successfully.");

        setTimeout(() => {
          navigate("/doctor-profile");
        }, 700);
      }
    } catch (error) {
      console.log("Update doctor profile error:", error);
      setApiError("Failed to update profile. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-8">
        <section className="mx-auto max-w-5xl">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-bold text-slate-500">
              Loading doctor profile...
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#078b91]">
              Doctor Panel
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#101b3d]">
              Edit Doctor Profile
            </h1>

            <p className="mt-2 text-sm font-medium text-slate-500">
              Update your professional details, clinic information, and public
              profile.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-11 w-auto px-6"
            onClick={() => navigate("/doctor-profile")}
          >
            Cancel
          </Button>
        </div>

        {apiError && (
          <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-bold text-red-600">
            {apiError}
          </div>
        )}

        {apiMessage && (
          <div className="mb-5 rounded-2xl border border-green-100 bg-green-50 px-5 py-3 text-sm font-bold text-green-700">
            {apiMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-black text-[#101b3d]">
                Basic Information
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                These details are connected with your account profile.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Full Name"
                placeholder="Dr. Ayesha Khan"
                error={errors.fullName?.message}
                {...register("fullName")}
              />

              <Input
                label="Username"
                placeholder="dr_ayesha"
                error={errors.username?.message}
                {...register("username")}
              />

              <Input
                label="Phone"
                placeholder="+92 300 1234567"
                error={errors.phone?.message}
                {...register("phone")}
              />

              <Input
                label="Profile Image URL"
                placeholder="https://example.com/profile.jpg"
                error={errors.profileImageUrl?.message}
                {...register("profileImageUrl")}
              />
            </div>
          </section>

          {/* Professional Information */}
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-black text-[#101b3d]">
                Professional Information
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                These details will be visible to pet owners.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Specialization"
                placeholder="Veterinary Surgeon"
                error={errors.specialization?.message}
                {...register("specialization")}
              />

              <Input
                label="Education"
                placeholder="DVM"
                error={errors.education?.message}
                {...register("education")}
              />

              <Input
                label="Experience"
                type="number"
                placeholder="5"
                error={errors.experience?.message}
                {...register("experience")}
              />

              <Input
                label="Consultation Fees"
                type="number"
                placeholder="2500"
                error={errors.fees?.message}
                {...register("fees")}
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-black text-[#20263D]">
                Clinic Address
              </label>

              <textarea
                rows={3}
                placeholder="PetCare Clinic, Gulberg III, Lahore"
                className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm font-medium outline-none transition-all duration-300 placeholder:text-slate-400 ${
                  errors.address
                    ? "border-red-500 focus:border-red-500"
                    : "border-slate-200 focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60"
                }`}
                {...register("address")}
              />

              {errors.address && (
                <p className="mt-1.5 text-xs font-semibold text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-[#F8FAFA] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-black text-[#101b3d]">
                    Availability Status
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Turn this on if you are available for appointments.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setValue("isAvailable", !isAvailable)}
                  className={`relative h-8 w-14 rounded-full transition ${
                    isAvailable ? "bg-[#078b91]" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
                      isAvailable ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="h-11 w-auto px-7"
              onClick={() => navigate("/doctor-profile")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-auto px-7"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditDoctorProfileForm;
````

## File: Frontend/src/features/Payment/components/PaymentSummaryCard.tsx
````typescript

````

## File: Frontend/src/features/Payment/page/AppointmentPaymentPage.tsx
````typescript

````

## File: Frontend/src/features/Pet Owner/pet details/apis/pet.api.ts
````typescript
import { api, handleAxiosError } from "@/features/api interface/axios.interface";
import type { PetFormData } from "../schemas/pet.schema";
import type { PetIssueReportFormData } from "../schemas/petIssueReport.schema";

export interface PetResponse {
  id: string;
  name: string;
  age: number;
  breed: string;
  category: string;
}

export const submitPetData = async (data: PetFormData & { petOwnerId: string }): Promise<PetResponse | undefined> => {
  try {
    const response = await api.post("petOwner/submit/pet-data", data);
    return response.data?.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const submitPetIssue = async (
  data: PetIssueReportFormData & { petOwnerId: string; doctorId: string },
): Promise<unknown> => {
  try {
    const response = await api.post("petOwner/submit/pet-issue", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const getPetsData = async (): Promise<PetResponse[] | undefined> => {
  try {
    const response = await api.get("petOwner/pets-data");
    return response.data?.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
````

## File: Frontend/src/features/Services/components/Banner.tsx
````typescript
import Button from "../../../shared/components/Button/Button";
import bannerImg from "../../../assets/shared/images/petServiceBanner.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section
      className="relative min-h-[620px] overflow-hidden bg-[#F8FAFC] bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(8, 32, 45, 0.88) 0%, rgba(8, 32, 45, 0.62) 45%, rgba(8, 32, 45, 0.25) 100%), url(${bannerImg})`,
      }}
    >
      {/* Decorative blur circles */}
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#0F766E]/30 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-120px] h-[360px] w-[360px] rounded-full bg-[#f9c5a8]/40 blur-3xl" />

      <div className="relative z-10 mx-auto grid min-h-[620px] max-w-6xl grid-cols-1 items-center gap-10 px-6 py-14 md:px-8 lg:grid-cols-2 lg:px-10">
        {/* Left Content */}
        <div className="max-w-[640px] text-white">
          <span className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[13px] font-semibold tracking-wide text-white/90 backdrop-blur-md">
            Trusted Pet Healthcare
          </span>

          <h1 className="mb-5 text-[38px] font-extrabold leading-[1.12] tracking-[-1.2px] md:text-[48px] lg:text-[56px]">
            Meet the Best <br />
            <span className="text-[#f9c5a8]">Pet Hospital</span>
          </h1>

          <p className="mb-8 max-w-[540px] text-[16px] leading-[1.8] text-white/85 md:text-[18px]">
            Quality care, expert doctors, and friendly service for your lovely
            pets.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="!w-auto !rounded-full !bg-[#0F766E] !px-7 !py-3.5 !text-sm !font-bold !text-white !shadow-md !shadow-[#0F766E]/30 !transition-all hover:!-translate-y-1 hover:!bg-[#115E59] md:!px-7 md:!py-3.5 md:!text-[15px]">
              Get Quote Now
            </Button>

            <Button className="!w-auto !rounded-full !border !border-white/60 !bg-white/10 !px-7 !py-3.5 !text-sm !font-bold !text-white !backdrop-blur-md !transition-all hover:!-translate-y-1 hover:!bg-white hover:!text-[#0F766E] md:!px-7 md:!py-3.5 md:!text-[15px]">
              Learn More
            </Button>
          </div>
        </div>

        {/* Appointment Form */}
        <div className="mx-auto w-full max-w-[360px] rounded-[22px] border border-slate-100 bg-[#FFFFFF] p-5 shadow-xl shadow-black/20 backdrop-blur-xl md:p-6 lg:ml-auto">
          <div className="mb-5 text-center">
            <span className="mb-3 inline-block rounded-full bg-[#D4E2E0] px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-[#0F766E]">
              Appointment
            </span>

            <h2 className="text-[22px] font-extrabold tracking-[-0.5px] text-[#20263d] md:text-[24px]">
              Book Appointment
            </h2>

            <p className="mt-2 text-[13px] leading-6 text-gray-500">
              Fill the form and our team will contact you.
            </p>
          </div>

          <form className="space-y-3">
            <div>
              <label className="mb-2 block text-[13px] font-bold text-[#20263d]">
                Name *
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="h-[44px] w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 text-[13px] text-[#20263d] outline-none transition-all placeholder:text-gray-400 focus:border-[#0F766E] focus:bg-white focus:ring-4 focus:ring-[#0F766E]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-bold text-[#20263d]">
                Email address *
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="h-[44px] w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 text-[13px] text-[#20263d] outline-none transition-all placeholder:text-gray-400 focus:border-[#0F766E] focus:bg-white focus:ring-4 focus:ring-[#0F766E]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-bold text-[#20263d]">
                Department *
              </label>
              <select className="h-[44px] w-full cursor-pointer rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 text-[13px] text-gray-500 outline-none transition-all focus:border-[#0F766E] focus:bg-white focus:ring-4 focus:ring-[#0F766E]/10">
                <option>Please Select</option>
                <option>Dental treatments</option>
                <option>Bones treatments</option>
                <option>Diagnosis</option>
                <option>Cardiology</option>
                <option>Surgery</option>
                <option>Eye care</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-bold text-[#20263d]">
                Time *
              </label>
              <select className="h-[44px] w-full cursor-pointer rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 text-[13px] text-gray-500 outline-none transition-all focus:border-[#0F766E] focus:bg-white focus:ring-4 focus:ring-[#0F766E]/10">
                <option>4:00 Available</option>
                <option>5:00 Available</option>
                <option>6:00 Available</option>
                <option>7:00 Available</option>
              </select>
            </div>

            <Link
              className="p-2 bg-[#0F766E] text-white rounded-md min-w-[30px] flex items-center justify-center"
              to="/doctors"
            >
              Book Appointment
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Banner;
````

## File: Frontend/src/features/Services/service.route.tsx
````typescript
import Services from "./pages/ServicesPage";

const servicesRoutes = [
  {
    path: "services",
    element: <Services />,
  },
];

export default servicesRoutes;
````

## File: Frontend/src/layout/landing.layout.tsx
````typescript
import { Outlet } from "react-router-dom";
import Navbar from "../shared/components/Navbar/Navbar";
import Footer from "../shared/components/Footer/Footer";

const LandingLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet/>
            <Footer />
           
        </>
    );
};

export default LandingLayout;
````

## File: Frontend/src/shared/components/Logo/Logo.tsx
````typescript
const logoUrl = "https://res.cloudinary.com/dqoeyomtf/image/upload/v1779458623/logo_tctgtx.png";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="w-15 h-15 overflow-hidden">
        <img
          src={logoUrl}
          alt="PETSVETA LOGO"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 className="font-bold text-sky-800 text-xl">PetsVeta</h1>
        <p>Care, Connect, Cure</p>
      </div>
    </div>
  );
};

export default Logo;
````

## File: Frontend/src/shared/components/Navbar/navbar.data.ts
````typescript
interface NavData {
    id: number;
    title: string;
    path: string;
}

const NAVLINK: NavData[] = [
    {
        id: 1,
        title: "Home",
        path: "/"
    },
    {
        id: 2,
        title: "Marketplace",
        path: "/marketplace"
    },
    {
        id: 3,
        title: "Services",
        path: "/services"
    },
    {
        id: 4,
        title: "Doctors",
        path: "/doctors"
    },
    {
        id: 5,
        title: "AI Assistant",
        path: "/ai-assistant"
    },
    {
        id: 6,
        title: "About",
        path: "/about"
    },
    {
        id: 7,
        title: "Contact",
        path: "/contact"
    }
];

export default NAVLINK;
````

## File: Backend/app/controllers/doctorSchedule.controller.js
````javascript
const {
    createDoctorScheduleService,
    getDoctorScheduleService,
    updateDoctorScheduleService,
    deleteDoctorScheduleService,
    getDoctorSchedulesByDoctorIdService,
} = require("../services/doctorSchedule.service");
const catchAsync = require('../utils/CatchAsync')
const sendResponse = require('../utils/SendResponse')

const createDoctorSchedule = catchAsync(async (req, res) => {
    console.log("Doctor Request is ", req.body);
    const schedule = await createDoctorScheduleService(req);

    if (schedule) {
        console.log("Schedule is ", schedule);
        return sendResponse(res, 201, "Doctor schedule created successfully", schedule)
    }

    return sendResponse(res, 400, "Error in Creating Doctor Schedule", schedule)
})

const getDoctorSchedule = catchAsync(async (req, res) => {

    const schedules = await getDoctorScheduleService(req);

    return sendResponse(res, 200, "Doctor schedules fetched successfully", schedules)

})



const getDoctorSchedulesByDoctorId = catchAsync(async (req, res) => {

    const { doctorId } = req.params;

    const schedules = await getDoctorSchedulesByDoctorIdService(doctorId);
    return sendResponse(res, 200, "Doctor schedules fetched successfully", schedules)

});

module.exports = {
    createDoctorSchedule,
    getDoctorSchedule,
    getDoctorSchedulesByDoctorId,
};
````

## File: Backend/app/routes/userdoctor.route.js
````javascript
const express = require("express");
const userDoctorController = require("../controllers/userdoctor.controller");
const { globalUserLimiter } = require('../middleware/rateLimiter')

const Router = express.Router();

Router
    .route("/approved-doctors")
    .get(userDoctorController.getApprovedDoctorsForUsers);

Router
    .route('/doctor-profile')
    .get(userDoctorController.getDoctorById)

module.exports = Router;
````

## File: Backend/app/services/doctorSchedule.service.js
````javascript
const { default: prisma } = require("../config/prisma");
const requireFields = require('../utils/validateRequest')
const AppError = require('../utils/AppError')


const createDoctorScheduleService = async (req) => {
    const userId = req.user.id;
    const doctor = await prisma.doctor.findUnique({
        where: {
            userId: userId
        }
    })

    if (!doctor) {
        throw new AppError("Doctor is Not Valid", 400);
    }
    const doctorId = doctor.id;

    requireFields(["date", "startTime", "endTime"], req.body);
    const { date, startTime, endTime } = req.body;


    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${date}T${endTime}:00`);



    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        throw new AppError("Invalid date or time format provided", 400);
    }

    const durationInMs = endDateTime.getTime() - startDateTime.getTime();
    const totalHours = Math.floor(durationInMs / (1000 * 60 * 60));

    if (totalHours < 1) {
        throw new AppError("Availability block must be at least 1 hour", 400);
    }

    const slots = Array.from({ length: totalHours }).map((_, index) => {
        const slotStart = new Date(startDateTime.getTime() + index * 60 * 60 * 1000);
        const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000);
        return {
            doctorId,
            date: new Date(`${date}T00:00:00Z`),
            startTime: slotStart,
            endTime: slotEnd,
            isBooked: false,
        };
    });

    const result = await prisma.doctorSchedule.createMany({
        data: slots,
        skipDuplicates: true
    });

    return result;
};

const getDoctorScheduleService = async (req) => {
    const doctor = await prisma.doctor.findUnique({
        where: {
            userId: req.user.id
        }
    });
    const doctorId = doctor.id
    const schedules = await prisma.doctorSchedule.findMany({
        where: {
            doctorId: doctor.id,
        },
        orderBy: {
            startTime: "asc",
        },
    });
    console.log('Schedule is ', schedules);
    return schedules;
};


const getDoctorSchedulesByDoctorIdService = async (doctorId) => {
    const doctor = await prisma.doctor.findUnique({
        where: { id: doctorId },
    });

    if (!doctor) {
        throw new AppError("Doctor not found", 400);
    }

    const schedules = await prisma.doctorSchedule.findMany({
        where: {
            doctorId: doctor.id,
        },
        orderBy: {
            startTime: "asc",
        },
    });

    return schedules;
};

module.exports = {
    createDoctorScheduleService,
    getDoctorScheduleService,
    getDoctorSchedulesByDoctorIdService,
};
````

## File: Frontend/src/features/Admin/components/doctors/DoctorRequestCard.tsx
````typescript
import {
  Award,
  BriefcaseMedical,
  Check,
  Eye,
  FileText,
  Mail,
  Phone,
  Stethoscope,
  X,
} from "lucide-react";
import doctorLogo from "../../../../assets/icons/doctor.png";
import { InfoPill } from "./InfoPill";
import { ContactRow } from "./ContactRow";
import { type DoctorData } from "../../apis/doctorquery.api";

type DoctorRequestCardProps = {
  doctor: DoctorData;
  onApprove: (doctorId: string) => void;
  onReject: (doctorId: string) => void;
  doctorRequestProceed: boolean;
};

const DoctorRequestCard = ({
  doctor,
  onApprove,
  onReject,
  doctorRequestProceed,
}: DoctorRequestCardProps) => {
  const isPending = doctor.isVerified === "PENDING";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
      <div className="h-3 bg-gradient-to-r from-[#078b91] via-[#82d5cf] to-[#f9c5a8]" />

      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row">
          <img
            src={doctorLogo}
            alt={doctor.user.fullName}
            className="h-28 w-28 shrink-0 rounded-2xl bg-[#e7f4f2] object-cover object-top"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-2xl font-black text-[#0f1b2f]">
                  {doctor.user.fullName}
                </h2>

                <p className="mt-1 font-semibold text-[#078b91]">
                  {doctor.specialization}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${
                  isPending
                    ? "bg-orange-100 text-orange-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {isPending ? "Pending" : "Approved"}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <InfoPill
                icon={<BriefcaseMedical size={16} />}
                text={`${doctor.experience} Yrs Experience`}
              />
              <InfoPill icon={<Award size={16} />} text={doctor.education} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 text-sm text-[#26364f] sm:grid-cols-2">
          <ContactRow icon={<Mail size={18} />} text={doctor.user.email} />
          <ContactRow
            icon={<Phone size={18} />}
            text={doctor.user.phone || "No phone provided"}
          />
          <ContactRow
            icon={<Stethoscope size={18} />}
            text={doctor.specialization}
            className="sm:col-span-2"
          />
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-[#f8fbfb] p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#d9f3ef] text-[#078b91]">
              <FileText size={26} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="mt-1 text-sm font-medium text-[#587087]">
                Degree Certificate
              </p>
            </div>

            <a
              href={doctor.degreeLicenseUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden h-10 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-[#078b91] transition hover:border-[#078b91] hover:bg-[#eefaf8] sm:flex"
            >
              <Eye size={17} />
              View
            </a>
          </div>

          <a
            href={doctor.degreeLicenseUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white text-sm font-black text-[#078b91] transition hover:border-[#078b91] hover:bg-[#eefaf8] sm:hidden"
          >
            <Eye size={17} />
            View Certificate
          </a>
        </div>

        {isPending ? (
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              disabled={doctorRequestProceed}
              type="button"
              onClick={() => onReject(doctor.id)}
              className={`flex h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white font-black transition ${
                doctorRequestProceed
                  ? "cursor-not-allowed text-red-300"
                  : "cursor-pointer text-red-500 hover:bg-red-50"
              }`}
            >
              <X size={19} />
              {doctorRequestProceed ? "Rejecting..." : "Reject"}
            </button>

            <button
              type="button"
              disabled={doctorRequestProceed}
              onClick={() => onApprove(doctor.id)}
              className={`flex h-11 items-center justify-center gap-2 rounded-xl font-black text-white shadow-lg shadow-cyan-100 transition ${
                doctorRequestProceed
                  ? "cursor-not-allowed bg-[#0aa082]/70"
                  : "cursor-pointer bg-[#078b91] hover:bg-[#06777d]"
              }`}
            >
              <Check size={19} />
              {doctorRequestProceed ? "Approving..." : "Approve"}
            </button>
          </div>
        ) : (
          <div className="mt-5 flex h-11 items-center justify-center gap-2 rounded-xl bg-green-50 font-black text-green-700">
            <Check size={19} />
            Approved Doctor
          </div>
        )}
      </div>
    </article>
  );
};

export default DoctorRequestCard;
````

## File: Frontend/src/features/Admin/components/doctors/DoctorRequests.tsx
````typescript
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  ClipboardCheck,
  Hourglass,
  Search,
  Stethoscope,
} from "lucide-react";
import { useEffect, useState } from "react";
import DoctorFilter from "./DoctorFilter";
import { PaginationButton } from "../PaginationButton";
import DoctorRequestCard from "./DoctorRequestCard";
import {
  PendingDoctors,
  ApprovedDoctors,
  AllDoctors,
  fetchDoctorStats,
  approveDoctorRequest,
  rejectDoctorRequest,
  type DoctorStats,
  type ApiPayload
} from '../../apis/doctorquery.api';
import StatCard from "../cards/StatsCard";
import DoctorNotFound from "./DoctorNotFound";

const DoctorRequests = () => {
  const [doctorStatus, setDoctorStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [totalDoctors, setTotalDoctors] = useState<number>(0);
  const [doctorRequestProceed, setDoctorRequestProceed] = useState<boolean>(false);
  const [doctorList, setDoctorList] = useState<ApiPayload | undefined>(undefined);


  const [adminDoctorStats, setAdminDoctorStats] = useState<DoctorStats | undefined>(undefined);
  const [page, setPage] = useState<number>(1);

  const pageTitle = 'Admin Dashboard';
  const limit: number = 6;
  const totalPages = Math.ceil(totalDoctors / limit);
  const pageDescription = 'Here Admin can approve and reject the doctors based on attestation process';

  const doctorStats = async () => {
    const response = await fetchDoctorStats();
    if (response.success) {
      setAdminDoctorStats(response.data);
    }
  };

  const onApprove = async (doctorId: string): Promise<void> => {
    setDoctorRequestProceed(true);
    const response = await approveDoctorRequest(doctorId);
    if (response.success) {
      await doctorStats();
    }
    setDoctorRequestProceed(false);
  };

  const onReject = async (doctorId: string): Promise<void> => {
    setDoctorRequestProceed(true);
    const response = await rejectDoctorRequest(doctorId);
    if (response.success) {
      await doctorStats();
    }
    setDoctorRequestProceed(false);
  };


  useEffect(() => {
    let isMounted = true;

    const loadDoctorStats = async () => {
      const response = await fetchDoctorStats();
      if (isMounted && response.success) {
        setAdminDoctorStats(response.data);
      }
    };

    void loadDoctorStats();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const doctorQuery = async (status: string, currentPage: number) => {
      if (status === 'all') {
        const response = await AllDoctors(currentPage, limit);
      
        if (response.success) {
          setDoctorList(response.data);
          setTotalDoctors(response.data.totalCount);
        }
      } else if (status === 'pending') {
        const response = await PendingDoctors(currentPage, limit);
        if (response.success) {
          setDoctorList(response.data);
          setTotalDoctors(response.data.totalCount);
        }
      } else if (status === 'approved') {
        const response = await ApprovedDoctors(currentPage, limit);
        if (response.success) {
          setDoctorList(response.data);
          setTotalDoctors(response.data.totalCount);
        }
      }
    };
    doctorQuery(doctorStatus, page);
  }, [doctorStatus, page]);

  return (
    <main className="min-h-screen bg-[#f8fbfb] text-[#12213a]">
      <section className="w-full">
        <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-4 sm:px-5 md:px-6 lg:px-8">
          <section className="relative overflow-hidden rounded-lg border border-[#eef2f2] bg-linear-to-r from-[#fff7f1] via-white to-[#effaf8] px-4 pb-6 pt-6 shadow-sm sm:px-6 md:px-8 md:pb-8 md:pt-9">
            <div className="relative z-10 max-w-[720px]">
              <h1 className="text-2xl font-black tracking-normal text-[#0f1b2f] sm:text-3xl md:text-4xl">
                {pageTitle}
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#405169] sm:mt-4 sm:text-base sm:leading-7">
                {pageDescription}
              </p>
            </div>

            <div className="pointer-events-none absolute right-20 top-5 hidden h-44 w-72 text-[#078b91] opacity-80 xl:block">
              <ClipboardCheck className="absolute left-16 top-0 h-36 w-36 rounded-lg text-[#6bb5b0]" strokeWidth={1.8} />
              <Stethoscope className="absolute right-5 top-10 h-28 w-28 text-[#078b91]" strokeWidth={2.4} />
            </div>

            <div className="relative z-10 mt-8 grid gap-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.08)] sm:mt-10 md:grid-cols-2 xl:mt-14 xl:grid-cols-3">
              {/* 💡 3. Tied values directly to the live backend data properties with string parsing safety */}
              <StatCard
                title="Pending Requests"
                value={String(adminDoctorStats?.pending ?? 0)}
                tone="orange"
                icon={Hourglass}
              />
              <StatCard
                title="Approved"
                value={String(adminDoctorStats?.approved ?? 0)}
                tone="green"
                icon={CheckCircle2}
              />
              <StatCard
                title="Total Doctors"
                value={String(adminDoctorStats?.total ?? 0)}
                tone="blue"
                icon={CircleUserRound}
              />
            </div>
          </section>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-black text-[#0f1b2f]">
                  Doctor List
                </h2>
                <p className="mt-1 text-sm text-[#587087]">
                  Search by name, email, phone, specialization, or doctor ID.
                </p>
              </div>

              <label className="relative block w-full lg:max-w-md">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#718198]">
                  <Search size={20} />
                </span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search doctors..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fbfb] pl-12 pr-4 font-semibold text-[#12213a] outline-none transition placeholder:text-[#8a99aa] focus:border-[#078b91] focus:bg-white focus:ring-4 focus:ring-[#078b91]/10"
                />
              </label>
            </div>
          </div>

          <DoctorFilter doctorStatus={doctorStatus} setDoctorStatus={setDoctorStatus} />

          {doctorList?.doctors && doctorList.doctors.length > 0 ? (
            doctorList.doctors.map((doctor) => (
              < DoctorRequestCard
                key={doctor.id}
                doctor={doctor}
                doctorRequestProceed={doctorRequestProceed}
                onApprove={onApprove}
                onReject={onReject}
              />
            ))
          ) : (
            <DoctorNotFound />
          )}

          {doctorList?.doctors && doctorList.doctors.length > 0 && (
            <div className="mt-7 flex flex-col gap-4 text-sm text-[#405169] md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <PaginationButton
                  ariaLabel="Previous page"
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 1}
                >
                  <ChevronLeft size={18} />
                </PaginationButton>

                <button
                  type="button"
                  className={`h-10 w-10 rounded-lg border border-slate-200 ${page === 1 ? 'bg-[#80cbc4] text-white' : 'bg-white text-[#12213a]'} font-black`}
                  onClick={() => setPage(1)}
                >
                  1
                </button>

                {totalPages >= 2 && (
                  <button
                    onClick={() => setPage(2)}
                    type="button"
                    className={`h-10 w-10 rounded-lg border border-slate-200 ${page === 2 ? 'bg-[#80cbc4] text-white' : 'bg-white text-[#12213a]'} font-black`}
                  >
                    2
                  </button>
                )}

                {page > 2 && page <= totalPages && (
                  <span title="current page" className="text-center flex justify-center items-center h-10 w-10 rounded-lg border border-slate-200 bg-[#80cbc4] text-white font-black">
                    {page}
                  </span>
                )}

                <PaginationButton
                  ariaLabel="Next page"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight size={18} />
                </PaginationButton>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default DoctorRequests;
````

## File: Frontend/src/features/Admin/components/doctors/DoctorStatusBadge.tsx
````typescript
interface Props {
  status: string;
}

const DoctorStatusBadge = ({ status }: Props) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium

      ${
        status === "Approved"
          ? "bg-green-100 text-green-600"
          : status === "Pending"
            ? "bg-orange-100 text-orange-600"
            : "bg-red-100 text-red-600"
      }
      `}
    >
      {status}
    </span>
  );
};

export default DoctorStatusBadge;
````

## File: Frontend/src/features/Admin/data/sidebar.data.ts
````typescript
import {
  FaUserMd,
  FaCalendarAlt,
  FaUsers,
  FaCog,
} from "react-icons/fa";

export const sidebarItems = [
  {
    id: 2,
    title: "Doctors",
    address: "",
    icon: FaUserMd,
  },
  {
    id: 3,
    title: "Appointments",
    address: "appointments",
    icon: FaCalendarAlt,
  },
  {
    id: 4,
    title: "Patients",
    address: "pateint",
    icon: FaUsers,
  },
  {
    id: 5,
    title: "Settings",
    address: "settings",
    icon: FaCog,
  },
];
````

## File: Frontend/src/features/api interface/axios.interface.ts
````typescript
import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    withCredentials: true
})

export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            console.log("Status Code", error.response?.status);
            console.log("Response Data", error.response?.data);
        } else if (error.request) {
            console.log("No Request Response Received", error.request);
        }
        
        throw error;
    } else {
        console.error("Non-Axios Error:", error);
        throw error;
    }
};

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("Acces token expires ...trying to make the new access token");

                await axios.get("http://localhost:8000/api/v1/auth/refresh/token",
                    {
                        withCredentials: true
                    }
                )
                console.log("Token Refreshed...");
                return api(originalRequest);

            } catch (refreshError) {
                console.error("Refresh Token expired or Invalid");

                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)
````

## File: Frontend/src/features/Auth/api/doctor.api.ts
````typescript
import { api, handleAxiosError } from "@/features/api interface/axios.interface";

type Data = {
    id: string,
    email: string,
    role: string,
    username: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Data
}

export const createDoctorAccount = async (data: FormData): Promise<ApiResponse> => {
    try {
        const response = await api.post("auth/register/doctor", data)

        return response.data;
    }
    catch (error) {
        handleAxiosError(error)
        throw error
    }
}
````

## File: Frontend/src/features/Auth/components/forgot-password-form.tsx
````typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import BackButton from "../../../shared/components/Button";
import { useForgotPassword } from "../hooks/useForgotPassword";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../schemas/forgot-password.schema";

const forgotFields = [
  {
    name: "email",
    type: "email",
    placeholder: "Enter email ",
  },
] as const;

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate: forgotPassword, isPending } = useForgotPassword({
    onSuccess: () => {
      reset();
      navigate("/verify-otp");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword(data);
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Forgot Password</h1>

        <p className="mt-2 text-gray-500">
          Enter your registered email
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {forgotFields.map((field) => (
          <Input
            key={field.name}
            label={""}
            type={field.type}
            placeholder={field.placeholder}
            error={errors[field.name]?.message as string}
            {...register(field.name)}
          />
        ))}

        <Button type="submit" loading={isPending}>
          Next
        </Button>

        <BackButton href="/login" text="Back " />
      </form>
    </div>
  );
}
````

## File: Frontend/src/features/Auth/pages/login.tsx
````typescript
import LoginComponent from "../components/login-component";

const PawIcon = () => (
  <svg
    viewBox="0 0 64 64"
    className="h-7 w-7 fill-[#178f95]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="22" r="7" />
    <circle cx="32" cy="16" r="7" />
    <circle cx="46" cy="22" r="7" />
    <circle cx="24" cy="34" r="6" />
    <circle cx="40" cy="34" r="6" />
    <path d="M18 47c0-9 6-17 14-17s14 8 14 17c0 6-5 9-14 9s-14-3-14-9z" />
  </svg>
);

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => {
  return (
    <div className="flex h-[118px] flex-1 flex-col items-center justify-center rounded-[22px] border border-white/55 bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_18px_45px_rgba(18,40,60,0.08)] backdrop-blur-2xl">
      <div className="mb-3 text-[#178f95]">{icon}</div>

      <h3 className="text-[28px] font-extrabold leading-none text-[#178f95]">
        {value}
      </h3>

      <p className="mt-2 text-[13px] font-bold text-[#3c4b67]">{label}</p>
    </div>
  );
};

const LoginPage = () => {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#f8f2ed] text-[#101b3d]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(249,197,168,0.92)_0%,rgba(249,197,168,0.62)_28%,transparent_48%),radial-gradient(circle_at_85%_8%,rgba(236,250,249,0.95)_0%,rgba(236,250,249,0.62)_30%,transparent_52%),linear-gradient(180deg,#fff7f2_0%,#eefaf8_44%,#bfe5e1_100%)]" />

      {/* Big glass circles */}
      <div className="absolute -top-[280px] left-[260px] h-[760px] w-[760px] rounded-full border border-white/30 bg-white/10 shadow-[inset_0_0_90px_rgba(255,255,255,0.45)] backdrop-blur-[2px]" />
      <div className="absolute bottom-[-220px] right-[-160px] h-[520px] w-[520px] rounded-full border border-white/25 bg-white/10 shadow-[inset_0_0_80px_rgba(255,255,255,0.35)]" />

      {/* Floating bubbles */}
      <div className="absolute left-[4%] top-[21%] h-8 w-8 rounded-full bg-[#ffb073]/70 shadow-[inset_-8px_-8px_18px_rgba(255,255,255,0.5),0_10px_25px_rgba(249,197,168,0.5)]" />
      <div className="absolute left-[49%] top-[26%] hidden h-6 w-6 rounded-full bg-white/55 shadow-[inset_-6px_-6px_12px_rgba(255,255,255,0.8)] lg:block" />
      <div className="absolute bottom-[13%] left-[43%] hidden h-10 w-10 rounded-full bg-[#bdebe8]/75 shadow-[inset_-9px_-9px_15px_rgba(255,255,255,0.9),0_12px_28px_rgba(23,143,149,0.18)] lg:block" />

      {/* Main layout */}
      <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
        <section className="grid w-[125vw] max-w-[1850px] origin-center scale-[0.7] grid-cols-1 items-center gap-14 px-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Glass Panel */}
          <div className="hidden justify-center lg:flex">
            <div className="relative flex h-[735px] w-full max-w-[800px] flex-col justify-center rounded-[38px] border border-white/55 bg-white/20 px-24 py-16 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_28px_70px_rgba(36,66,90,0.12)] backdrop-blur-[26px]">
              <div className="absolute inset-0 rounded-[38px] bg-gradient-to-br from-white/25 via-white/10 to-transparent" />

              {/* Floating paw top-left */}
              <div className="absolute -left-14 -top-14 z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/55 shadow-[0_14px_40px_rgba(31,50,70,0.08)] backdrop-blur-2xl">
                <PawIcon />
              </div>

              {/* Floating paw top-right */}
              <div className="absolute right-9 top-[-28px] z-10 opacity-60">
                <PawIcon />
              </div>

              <div className="relative z-10">
                <h1 className="max-w-[610px] text-[64px] font-extrabold leading-[1.13] tracking-[-0.055em] text-[#101b3d]">
                  Welcome <br />
                  Back <br />
                  to{" "}
                  <span className="bg-gradient-to-r from-[#178f95] to-[#0c7b84] bg-clip-text text-transparent">
                    PetsVeta
                  </span>
                </h1>

                <p className="mt-8 max-w-[550px] text-[21px] font-medium leading-[1.65] text-[#2f405f]">
                  Book vet appointments, explore pet services, and shop trusted
                  pet products from one beautiful platform.
                </p>

                {/* Trusted card */}
                <div className="mt-10 flex max-w-[610px] items-center gap-7 rounded-[28px] border border-white/60 bg-white/24 p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_20px_50px_rgba(20,50,70,0.1)] backdrop-blur-3xl">
                  <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-3xl bg-[#fff3e8] shadow-[0_14px_28px_rgba(40,50,70,0.12)]">
                    <img
                      src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?auto=format&fit=crop&w=300&q=80"
                      alt="Dog"
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute bottom-[-2px] right-[-2px] flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-lg">
                      💗
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-extrabold text-[#101b3d]">
                      Trusted Pet Care
                    </h3>

                    <p className="mt-4 text-[17px] font-medium leading-7 text-[#4f5f78]">
                      Doctors, sellers, and pet parents connected.
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-10 flex max-w-[610px] gap-5">
                  <StatCard
                    value="120+"
                    label="Doctors"
                    icon={
                      <svg
                        className="h-9 w-9"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM3 22a9 9 0 0118 0H3z" />
                      </svg>
                    }
                  />

                  <StatCard
                    value="5k+"
                    label="Bookings"
                    icon={
                      <svg
                        className="h-9 w-9"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M16 3v4M8 3v4M3 10h18" />
                      </svg>
                    }
                  />

                  <StatCard
                    value="24/7"
                    label="Support"
                    icon={
                      <svg
                        className="h-9 w-9"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 13a8 8 0 0116 0" />
                        <path d="M4 13v4a2 2 0 002 2h1v-6H6a2 2 0 00-2 2zM20 13v4a2 2 0 01-2 2h-1v-6h1a2 2 0 012 2z" />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Login Card */}
          <div className="flex justify-center">
            <div className="flex h-[700px] w-full max-w-[660px] items-center rounded-[34px] border border-white/70 bg-white/72 px-20 py-12 shadow-[0_30px_80px_rgba(30,60,80,0.16)] backdrop-blur-2xl">
              <LoginComponent />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
````

## File: Frontend/src/features/Auth/pages/pet-owner-signup.tsx
````typescript
import PetOwnerForm from "../components/pets-owner";

const PawIcon = () => (
  <svg
    viewBox="0 0 64 64"
    className="h-7 w-7 fill-[#178f95]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="22" r="7" />
    <circle cx="32" cy="16" r="7" />
    <circle cx="46" cy="22" r="7" />
    <circle cx="24" cy="34" r="6" />
    <circle cx="40" cy="34" r="6" />
    <path d="M18 47c0-9 6-17 14-17s14 8 14 17c0 6-5 9-14 9s-14-3-14-9z" />
  </svg>
);

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => {
  return (
    <div className="flex h-[118px] flex-1 flex-col items-center justify-center rounded-[22px] border border-white/55 bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_18px_45px_rgba(18,40,60,0.08)] backdrop-blur-2xl">
      <div className="mb-3 text-[#178f95]">{icon}</div>

      <h3 className="text-[28px] font-extrabold leading-none text-[#178f95]">
        {value}
      </h3>

      <p className="mt-2 text-[13px] font-bold text-[#3c4b67]">{label}</p>
    </div>
  );
};

const PetOwnerSignupPage = () => {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#f8f2ed] text-[#101b3d]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(249,197,168,0.92)_0%,rgba(249,197,168,0.62)_28%,transparent_48%),radial-gradient(circle_at_85%_8%,rgba(236,250,249,0.95)_0%,rgba(236,250,249,0.62)_30%,transparent_52%),linear-gradient(180deg,#fff7f2_0%,#eefaf8_44%,#bfe5e1_100%)]" />

      {/* Big glass circles */}
      <div className="absolute -top-[280px] left-[260px] h-[760px] w-[760px] rounded-full border border-white/30 bg-white/10 shadow-[inset_0_0_90px_rgba(255,255,255,0.45)] backdrop-blur-[2px]" />

      <div className="absolute bottom-[-220px] right-[-160px] h-[520px] w-[520px] rounded-full border border-white/25 bg-white/10 shadow-[inset_0_0_80px_rgba(255,255,255,0.35)]" />

      {/* Floating bubbles */}
      <div className="absolute left-[4%] top-[21%] h-8 w-8 rounded-full bg-[#ffb073]/70 shadow-[inset_-8px_-8px_18px_rgba(255,255,255,0.5),0_10px_25px_rgba(249,197,168,0.5)]" />

      <div className="absolute left-[49%] top-[26%] hidden h-6 w-6 rounded-full bg-white/55 shadow-[inset_-6px_-6px_12px_rgba(255,255,255,0.8)] lg:block" />

      <div className="absolute bottom-[13%] left-[43%] hidden h-10 w-10 rounded-full bg-[#bdebe8]/75 shadow-[inset_-9px_-9px_15px_rgba(255,255,255,0.9),0_12px_28px_rgba(23,143,149,0.18)] lg:block" />

      {/* Main layout */}
      <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
        <section className="grid w-[128vw] max-w-[1850px] origin-center scale-[0.72] grid-cols-1 items-center gap-14 px-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Glass Panel */}
          <div className="hidden justify-center lg:flex">
            <div className="relative flex h-[720px] w-full max-w-[800px] flex-col justify-center rounded-[38px] border border-white/55 bg-white/20 px-20 py-14 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_28px_70px_rgba(36,66,90,0.12)] backdrop-blur-[26px]">
              <div className="absolute inset-0 rounded-[38px] bg-gradient-to-br from-white/25 via-white/10 to-transparent" />

              {/* Floating paw top-left */}
              <div className="absolute -left-14 -top-14 z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/55 shadow-[0_14px_40px_rgba(31,50,70,0.08)] backdrop-blur-2xl">
                <PawIcon />
              </div>

              {/* Floating paw top-right */}
              <div className="absolute right-9 top-[-28px] z-10 opacity-60">
                <PawIcon />
              </div>

              <div className="relative z-10">
                <h1 className="max-w-[610px] text-[64px] font-extrabold leading-[1.13] tracking-[-0.055em] text-[#101b3d]">
                  Join{" "}
                  <span className="bg-gradient-to-r from-[#178f95] to-[#0c7b84] bg-clip-text text-transparent">
                    PetsVeta
                  </span>
                </h1>

                <p className="mt-8 max-w-[600px] text-[22px] font-medium leading-[1.6] text-[#2f405f]">
                  Create your account to book vet appointments, explore pet
                  services, and shop trusted pet products.
                </p>

                {/* Trusted Card */}
                <div className="mt-10 flex max-w-[610px] items-center gap-7 rounded-[28px] border border-white/60 bg-white/24 p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_20px_50px_rgba(20,50,70,0.1)] backdrop-blur-3xl">
                  <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-3xl bg-[#fff3e8] shadow-[0_14px_28px_rgba(40,50,70,0.12)]">
                    <img
                      src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?auto=format&fit=crop&w=300&q=80"
                      alt="Dog"
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute bottom-[-2px] right-[-2px] flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-lg">
                      💗
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-extrabold text-[#101b3d]">
                      Complete Pet Care
                    </h3>

                    <p className="mt-4 text-[17px] font-medium leading-7 text-[#4f5f78]">
                      Everything for your pet in one place.
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-10 flex max-w-[610px] gap-5">
                  <StatCard
                    value="120+"
                    label="Doctors"
                    icon={
                      <svg
                        className="h-9 w-9"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM3 22a9 9 0 0118 0H3z" />
                      </svg>
                    }
                  />

                  <StatCard
                    value="5k+"
                    label="Members"
                    icon={
                      <svg
                        className="h-9 w-9"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17 20h5v-2a4 4 0 00-5-4" />
                        <path d="M9 20H4v-2a4 4 0 015-4" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    }
                  />

                  <StatCard
                    value="24/7"
                    label="Support"
                    icon={
                      <svg
                        className="h-9 w-9"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 13a8 8 0 0116 0" />
                        <path d="M4 13v4a2 2 0 002 2h1v-6H6a2 2 0 00-2 2zM20 13v4a2 2 0 01-2 2h-1v-6h1a2 2 0 012 2z" />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Signup Card */}
          <div className="flex justify-center">
            <div className="flex h-[760px] w-full max-w-[700px] items-center rounded-[36px] border border-white/70 bg-white/72 px-16 py-10 shadow-[0_30px_80px_rgba(30,60,80,0.16)] backdrop-blur-2xl">
              <PetOwnerForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PetOwnerSignupPage;
````

## File: Frontend/src/features/Auth/schemas/doctor.schema.tsx
````typescript
import { z } from "zod";

// Helper to check for a valid file size (e.g., max 5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

export const doctorSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),

  // z.coerce automatically converts the string from the HTML input into a number
  experience: z.coerce
    .number({ error: "Experience must be a number" })
    .min(0, "Experience cannot be negative"),

  medicalLicenseNumber: z.string().min(3, "License number is required"),
  education: z.string().min(2, "Education/Qualifications are required"),
  address: z.string().min(5, "Please enter a complete address"),
  specialization: z.string().min(1, "Please select a specialization"),
  fees: z.string().min(1, "Enter The Checkup Fees"),



  document: z
    .any()
    // 1. Check if a file was selected by checking the length of the FileList
    .refine((files) => files && files.length > 0, "Document is required.")

    // 2. Look at the FIRST file in the list and check its size
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 5MB."
    )

    // 3. Look at the FIRST file and check its type (Browser uses 'type', not 'mimetype')
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .pdf formats are supported."
    ),

  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
})
  // The .refine() block at the end compares the two password fields
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This tells RHF to attach the error to the confirmPassword field
  });

// Exporting the inferred TypeScript type so you can use it in your component
export type DoctorFormData = z.infer<typeof doctorSchema>;
export type DoctorFormInput = z.input<typeof doctorSchema>;
````

## File: Frontend/src/features/Doctor/components/DoctorSkill.tsx
````typescript
import { useState, useRef, useEffect } from "react";
import { Plus, ChevronDown } from "lucide-react";
import DoctorServicesTable from "./ServiceTable";
import { submitDoctorSkills, editDoctorService, deleteDoctorService } from "../api/doctorServices";

const VETERINARY_SKILLS = [
    "General Practice",
    "Surgery & Orthopedics",
    "Dentistry",
    "Dermatology",
    "Cardiology",
    "Ophthalmology",
    "Nephrology",
    "Oncology",
    "Internal Medicine",
    "Exotic Animal Care",
    "Avian Medicine",
    "Equine Medicine",
    "Small Animal Behavior",
    "Reproduction & Breeding",
    "Ultrasound Diagnostics",
    "Anesthesia",
    "Vaccination & Prevention",
    "Emergency Medicine",
    "Orthopedic Surgery",
    "Laparoscopic Surgery",
    "Rehabilitation Therapy",
    "Nutrition Consulting",
    "Microchipping & Identification",
];

export type ItemType = {
    id: string,
    skill: string,
    price: string
}

const SkillForm = () => {
    const [skill, setSkill] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editingItemId, setEditingItemId] = useState<string>('');



    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDoctorSkill = async () => {
        if (!skill || !price) {
            setError("Please complete both inputs");
            return;
        }
        if (Number(price) < 0 || Number(price) >= 100000) {
            setError("Invalid Price Tag");
            return;
        }
        setError('');

        const doctorSkill = { skill, price };
        const response = await submitDoctorSkills(doctorSkill);
        console.log("Response is ", response);
        if (response.success) {
            setSkill('');
            setPrice('');
        }
    };

    const handleEditClick = async () => {
        if (!skill || !price) {
            setError("Please complete both inputs");
            return;
        }
        if (Number(price) < 0 || Number(price) >= 100000) {
            setError("Invalid Price Tag");
            return;
        }
        setError('');

        const data = {
            serviceId: editingItemId,
            skill: skill,
            price: price
        }

        const response = await editDoctorService(data);
        if (response.success) {
            setSkill('');
            setPrice('');
            setIsEdit(false);
            setEditingItemId('');
        }
    }

    const editService = (item: ItemType) => {
        setIsEdit(true);
        setEditingItemId(item.id);
        setPrice(item.price);
        setSkill(item.skill);
    }

    const deleteService = async (itemId: string) => {
        const response = await deleteDoctorService(itemId);
        console.log("Delete Response is ", response);
    }



    return (
        <div>
            <section className="border border-emerald-100 bg-emerald-50/30 p-6 rounded-xl max-w-xl mx-auto shadow-sm">
                <h3 className="text-emerald-900 font-semibold text-lg mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-emerald-600" />
                    Add Professional Medical Skills & Pricing
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">

                    <div ref={containerRef} className="w-full relative">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full flex justify-between items-center border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none p-2.5 rounded-lg text-sm transition-all bg-white text-slate-700 text-left"
                        >
                            <span className={skill ? "text-slate-700" : "text-slate-400"}>
                                {skill || "Select a medical skill..."}
                            </span>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>

                        {/* ALWAYS OPENS DOWNWARD: Driven by top-full layout anchor */}
                        {isOpen && (
                            <ul className="absolute z-50 left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-lg text-sm text-slate-700">
                                {VETERINARY_SKILLS.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            setSkill(item);
                                            setIsOpen(false);
                                        }}
                                        className="p-2.5 hover:bg-emerald-50 hover:text-emerald-900 cursor-pointer transition-colors"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>


                    <div className="w-full sm:w-48 relative">
                        <input
                            value={price}
                            type="number"
                            min={0}
                            max={100000}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none p-2.5 rounded-lg text-sm transition-all bg-white text-slate-700 placeholder:text-slate-400"
                            placeholder="Price (PKR)"
                        />
                    </div>
                </div>

                {error && <div className="text-sm text-red-500 mb-3">Error: {error}</div>}

                <div className="flex justify-end">
                    <button
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm shadow-emerald-600/10 active:scale-[0.98]"
                        onClick={isEdit ? handleEditClick : handleDoctorSkill}
                    >
                        {isEdit || <Plus className="w-4 h-4" />}
                        {isEdit ? "Edit" : " Add Service"}
                    </button>
                </div>
            </section>
            <section className=" mt-6">
                <DoctorServicesTable onEdit={editService} onDelete={deleteService} />
            </section>
        </div>

    );
};

export default SkillForm;
````

## File: Frontend/src/features/Doctorcart/component/DoctorCard.tsx
````typescript
import { CalendarDays, GraduationCap, ShieldCheck, User } from "lucide-react";
import { type Doctor } from "../apis/getDoctors.api";
import { NavLink } from "react-router-dom";

interface DoctorCardProps {
    doctor: Doctor;
    onBookAppointment: (doctorId: string, checkupTime?: string) => void;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
    return (
        <div
            key={doctor.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
            <div className="grid gap-6 2xl:grid-cols-[1.1fr_0.75fr_1fr_210px]">
                <div className="flex gap-5">
                    <div>
                        {
                            doctor?.profileImage?.startsWith('/') ? (
                                <img
                                    src={doctor.profileImage}
                                    alt="Doctor"
                                    className="h-28 w-28 rounded-3xl object-cover"
                                />
                            ) : (
                                <User
                                    size={112}
                                    className="rounded-3xl border p-4 text-gray-400"
                                />
                            )
                        }


                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-black">{doctor.name}</h2>
                            <ShieldCheck size={20} className="text-[#078b91]" />
                        </div>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            {doctor.specialization}
                        </p>

                        <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                            <CalendarDays size={17} />
                            {doctor.experience} years
                        </p>

                        <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                            <GraduationCap size={17} />
                            {doctor.education}
                        </p>
                    </div>
                </div>

                <div className="border-slate-200 2xl:border-l 2xl:pl-6">


                    <h3 className="mt-5 text-sm font-black">Next Available</h3>

                    <p className="mt-2 text-sm text-slate-600">
                        {doctor.nextAvailable
                            ? `${doctor.nextAvailable.day}, ${doctor.nextAvailable.startTime} - ${doctor.nextAvailable.endTime}`
                            : "No upcoming slot"}
                    </p>
                </div>



                <div className="flex flex-col justify-center gap-3 w-full">
                    <NavLink
                        to={`/doctor-profile/${doctor.id}`}
                        className="flex h-11 w-full items-center justify-center rounded-xl bg-[#078b91] text-sm font-black text-white transition hover:bg-[#101b3d]"
                    >
                        Book Appointment
                    </NavLink>
                </div>
            </div>
        </div>
    );
};


export default DoctorCard;
````

## File: Frontend/src/features/Payment/api/payment.api.ts
````typescript

````

## File: Frontend/src/shared/components/Button/Button.tsx
````typescript
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isSubmitting?: boolean;
  loading?: boolean;
  loadingText?: string;
  href?: string;
  text?: string;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  disabled,
  isSubmitting = false,
  loading = false,
  loadingText = "Loading...",
  href,
  text,
  ...props
}: ButtonProps) => {
  const baseStyle =
    "inline-flex items-center justify-center rounded-lg font-medium transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-sky-800 text-white hover:bg-gray-100 hover:text-sky-800 border border-sky-800",
    secondary: "bg-[#F9C5A8] text-sky-900 hover:bg-[#f5b58f]",
    outline:
      "border border-[#178f95] text-[#178f95] hover:bg-[#178f95] hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const width = fullWidth ? "w-full" : "";
  const isLoading = isSubmitting || loading;
  const content = isLoading ? loadingText : children || text;

  const classes = `${baseStyle} ${variants[variant]} ${sizes[size]} ${width} ${className}`;

  if (href) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
````

## File: Backend/app/controllers/doctor.controller.js
````javascript
const sendResponse = require('../utils/SendResponse');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/CatchAsync');
const requireFields = require('../utils/validateRequest')
const authServices = require('../services/auth.services');
const doctorServices = require('../services/doctor.services');


const fetchDoctorServices = catchAsync(async (req, res) => {
    const email = req.user.email;
    const validUser = await authServices.verifyEmail(email);

    if (!validUser) {
        throw new AppError("User is Invalid", 400)
    }

    const servicesData = await doctorServices.getDoctorServices(validUser.id);
    return sendResponse(res, 200, "Successfully Fetch Services", servicesData);
})


const createDoctorServicePricing = catchAsync(async (req, res) => {

    const email = req.user.email;
    requireFields(["skill", "price"], req.body);

    const skills = {
        skill: req.body.skill,
        price: req.body.price
    }

    const validUser = await authServices.verifyEmail(email);
    if (!validUser) {
        throw new AppError("User is Invalid", 400)
    }
    if (validUser.userRole.role !== 'Doctor') {
        throw new AppError("Role is Invalid", 401);
    }

    console.log("Valid User Role is ", validUser.userRole.userId);
    const savedSkills = await doctorServices.addDoctorService(skills, validUser.userRole.userId);
    if (savedSkills === true) {
        return sendResponse(res, 400, "Skill ALready Exist",)
    }

    return sendResponse(res, 201, "Success", skills);
})

const deleteDoctorService = catchAsync(async (req, res) => {
    const email = req.user.email;
    const { serviceId } = req.body;
    console.log("Service Id is ", serviceId);
    const validUser = await authServices.verifyEmail(email);
    if (!serviceId) {
        throw new AppError("Service Id not found", 400)
    }
    if (!validUser) {
        throw new AppError("User is Invalid", 400)
    }
    if (validUser.userRole.role !== 'Doctor') {
        throw new AppError("Role is Invalid", 401);
    }

    const deletedService = await doctorServices.deleteDoctorService(serviceId);
    console.log("Service Delete is ", deletedService);

    return sendResponse(res, 201, "Success", { deletedService: deletedService })

})

const updateDoctorService = catchAsync(async (req, res) => {
    console.log("Request in edit controlelr ", req.body);
    requireFields(["serviceId", "price", "skill"], req.body);

    const { serviceId, skill, price } = req.body;
    const updateService = await doctorServices.updateDoctorServices(serviceId, skill, price);
    console.log("Updated Service", updateService);

    return sendResponse(res, 201, "Updated Service", updateService);

})

const fetchDoctorAppointments = catchAsync(async (req, res) => {
    const appointments = await doctorServices.getDoctorAppointments(req.user.id);

    return sendResponse(res, 200, "Doctor appointments fetched successfully", appointments);
})

const getDoctorProfile = catchAsync(async (req, res) => {
    const userId = req.user.id;

    const doctorProfile = await doctorServices.getDoctorProfile(userId);

    if (!doctorProfile) {
        throw new AppError("Doctor profile not found", 404);
    }

    if (!doctorProfile.doctors) {
        throw new AppError("Doctor data not found", 404);
    }

    return sendResponse(
        res,
        200,
        "Doctor profile fetched successfully",
        doctorProfile
    );
});


const updateDoctorProfile = catchAsync(async (req, res) => {
    const userId = req.user.id;

    const {
        fullName,
        username,
        phone,
        profileImageUrl,
        specialization,
        education,
        experience,
        fees,
        address,
        isAvailable,
    } = req.body;

    requireFields(
        [
            "fullName",
            "username",
            "phone",
            "profileImageUrl",
            "specialization",
            "education",
            "experience",
            "fees",
            "address",
            "isAvailable",
        ],
        req.body
    );

    const updatedDoctorProfile = await doctorServices.updateDoctorProfile(
        userId,
        {
            fullName,
            username,
            phone,
            profileImageUrl,
            specialization,
            education,
            experience,
            fees,
            address,
            isAvailable,
        }
    );

    return sendResponse(
        res,
        200,
        "Doctor profile updated successfully",
        updatedDoctorProfile
    );
});

module.exports = {
    createDoctorServicePricing,
    fetchDoctorServices,
    deleteDoctorService,
    updateDoctorService,
    fetchDoctorAppointments,
    getDoctorProfile,
    updateDoctorProfile,
};
````

## File: Backend/app/controllers/petOwner.controller.js
````javascript
const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const requireFields = require('../utils/validateRequest');
const petOwnerServices = require('../services/petOwner.services');
const sendResponse = require('../utils/SendResponse');
const authServices = require('../services/auth.services');
const { stripe } = require('../config/stripe');
const prisma = require('../config/prisma');

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
    requireFields(["petOwnerId", "petId", "issue", "doctorId", "checkupTime"], req.body);
    const { petOwnerId, petId, issue, doctorId, checkupTime } = req.body;

    const petIssue = {
        petOwnerId: petOwnerId,
        petId: petId,
        issue: issue,
        doctorId: doctorId,
        checkupTime: checkupTime
    }

    const savePetIssue = await petOwnerServices.registerPetIssue(petIssue);
    if (!savePetIssue || !savePetIssue.appointment || !savePetIssue.appointment.fees) {
        return sendResponse(res, 400, "Failed to Submit Issue...");
    }
    const appointment = savePetIssue.appointment;

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: appointment.fees * 100,
                    product_data: {
                        name: "Pet Doctor Consultation",
                    },

                },
                quantity: 1,
            }
        ],
        success_url: `${process.env.FRONTEND_URL}/payment-success?session_id=CHECKOUT_SESSION_ID`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
        metadata: {
            appointmentId: appointment.id
        }
    });

    await petOwnerServices.updateAppointmentStripeId(appointment.id, session.id)


    if (!savePetIssue) {
        return sendResponse(res, 400, "Failed to Submit Issue Try Again", savePetIssue);
    }
    return sendResponse(res, 201, "Successfully Submitted ", {
        checkoutUrl: session.url
    });

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
````

## File: Backend/app/services/petOwner.services.js
````javascript
const { default: prisma, } = require('../config/prisma');
const AppError = require('../utils/AppError');


const saveUserPet = async (pet) => {
    const newPet = await prisma.pet.create({
        data: {
            petOwnerId: pet.petOwnerId,
            name: pet.name,
            age: pet.age,
            breed: pet.breed,
            category: pet.category
        }
    });
    return newPet;
}

const registerPetIssue = async (petIssue) => {
    if (!petIssue) {
        return false;
    }

    const checkupTime = new Date(petIssue.checkupTime);

    if (Number.isNaN(checkupTime.getTime())) {
        throw new Error("Invalid appointment time");
    }

    const doctor = await prisma.doctor.findUnique({
        where: {
            id: petIssue.doctorId,
        },
        select: {
            id: true,
            fees: true,
        },
    });

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    const existingAppointment = await prisma.appointment.findFirst({
        where: {
            doctorId: petIssue.doctorId,
            checkupTime,
        },
    });
    console.log("Appointment is ", existingAppointment);
    if (existingAppointment) {
        console.log("Check Existin Appointemtn Condition Running")
        throw new Error("This appointment slot is already booked");
        return;
    }
    console.log("Outside Appointment COndition here");

    const newPetIssue = await prisma.$transaction(async (tx) => {
        const createdPetIssue = await tx.petIssueReport.create({
            data: {
                petOwnerId: petIssue.petOwnerId,
                petId: petIssue.petId,
                issue: petIssue.issue,
            }
        });

        const appointment = await tx.appointment.create({
            data: {
                doctorId: petIssue.doctorId,
                petIssueReportId: createdPetIssue.id,
                fees: doctor.fees,
                checkupTime,


            },
        });

        return {
            petIssue: createdPetIssue,
            appointment,
        };
    });

    return newPetIssue;
}

const registerPetAppointment = async () => {

}

const getUserPets = async (userId) => {
    if (!userId) {
        return false;
    }
    const pets = await prisma.pet.findMany({
        where: {
            petOwnerId: userId
        },
        select: {
            id: true,
            name: true,
            age: true,
            breed: true,
            category: true
        }

    });

    return pets;
}

const updateAppointmentStripeId = async (appointmentId, sessionId) => {
    if (!appointmentId || !sessionId) {
        throw new AppError("Appointment or Session Id is Invalid", 400);
    }

    const result = await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
            stripeSessionId: sessionId,
        },
    });

    return result;
};
module.exports = {
    saveUserPet,
    registerPetIssue, getUserPets,
    updateAppointmentStripeId
}
````

## File: Backend/app/services/userdoctor.services.js
````javascript
const { PrismaClient, VerificationStatus } = require("@prisma/client");
const prisma = new PrismaClient();

const getUpcomingSlotsFilter = (currentDate) => ({
  isBooked: false,
  endTime: { gte: currentDate },
});


const formatSingleSlot = (slot) => ({
  scheduleId: slot.id,
  date: slot.date,
  day: slot.date.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase(),
  startTime: slot.startTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
  endTime: slot.endTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
  startDateTime: slot.startTime.toISOString(),
  endDateTime: slot.endTime.toISOString(),
});

const compileScheduleInfo = (doctorSchedules, currentDate) => {
  const todayString = currentDate.toDateString();
  const slots = doctorSchedules.map(formatSingleSlot);

  return {
    availableSlots: slots,
    todaySlots: slots.filter((s) => new Date(s.startDateTime).toDateString() === todayString),
    availableDays: [...new Set(slots.map((s) => s.day))],
    status: doctorSchedules.some((s) => currentDate >= s.startTime && currentDate < s.endTime) ? "active" : "inactive",
    nextAvailable: slots[0] || null,
  };
};




const getApprovedDoctorsForUsers = async ({ page = 1, limit = 5, search = "" }) => {
  const skip = (page - 1) * limit;
  const currentDate = new Date();
  const slotsFilter = getUpcomingSlotsFilter(currentDate);

  const whereCondition = {
    isVerified: VerificationStatus.APPROVED,
    doctorSchedules: { some: slotsFilter },
    ...(search && {
      OR: [
        { user: { fullName: { contains: search, mode: "insensitive" } } },
        { specialization: { contains: search, mode: "insensitive" } },
        { education: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [total, doctors] = await Promise.all([
    prisma.doctor.count({ where: whereCondition }),
    prisma.doctor.findMany({
      where: whereCondition,
      skip,
      take: limit,
      select: {
        id: true,
        specialization: true,
        education: true,
        experience: true,
        user: {
          select: { fullName: true, email: true, phone: true, profileImageUrl: true },
        },
        doctorSchedules: {
          where: slotsFilter,
          orderBy: { startTime: "asc" },
        },
      },
    }),
  ]);

  const formattedDoctors = doctors.map((doctor) => ({
    id: doctor.id,
    name: doctor.user.fullName,
    email: doctor.user.email,
    phone: doctor.user.phone,
    specialization: doctor.specialization,
    education: doctor.education,
    experience: doctor.experience,
    profileImage: doctor.user.profileImageUrl,
    ...compileScheduleInfo(doctor.doctorSchedules, currentDate), // 👈 Beautifully lightweight mapping
  }));

  return {
    data: formattedDoctors,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};


const getSpecificDoctor = async (doctorId) => {
  const currentDate = new Date();

  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: {
      id: true,
      education: true,
      fees: true,
      specialization: true,
      experience: true,
      isAvailable: true,
      isVerified: true,
      user: {
        select: { fullName: true, profileImageUrl: true },
      },
      doctorSchedules: {
        where: getUpcomingSlotsFilter(currentDate),
        orderBy: { startTime: "asc" },
      },
    },
  });

  if (!doctor) return null;

  return {
    id: doctor.id,
    name: doctor.user?.fullName || "Unknown Doctor",
    image: doctor.user?.profileImageUrl || null,
    specialization: doctor.specialization,
    experience: doctor.experience,
    education: doctor.education,
    fees: doctor.fees,
    isVerified: doctor.isVerified,
    ...compileScheduleInfo(doctor.doctorSchedules, currentDate),
  };
};


const getBookableSlotsByDoctorId = async (doctorId) => {
  const doctor = await getSpecificDoctor(doctorId);
  return doctor ? doctor.availableSlots : null;
};

module.exports = {
  getApprovedDoctorsForUsers,
  getSpecificDoctor,
  getBookableSlotsByDoctorId,
};
````

## File: Backend/prisma/seed.js
````javascript
// prisma/seed.js
const { PrismaClient, VerificationStatus } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {

    console.log("🌱 Starting database seeding...");

    // 1. Performance win: Hash once, use 500 times
    const dummyHashedPassword = await bcrypt.hash("password123", 12);

    // 2. The static placeholder certificate URL
    const sampleCertificateUrl = "https://res.cloudinary.com/ddpv9b03h/image/upload/v1779704094/pets-veta/doctor-document/vhesk7ecsgfromft92ci.png";

    const specializations = ["Veterinary Surgeon", "Feline Medicine Specialist", "Avian Veterinarian", "Canine Behavior Specialist", "Exotic Animal Vet"];
    const educations = ["DVM - University of Veterinary and Animal Sciences", "Ph.D. in Veterinary Medicine", "M.S. in Clinical Veterinary Science"];

    // // 💡 CRITICAL FIX: Clear old mock data so you don't hit duplicate email errors
    // console.log("🧹 Cleaning up old mock doctor data...");
    // await prisma.user.deleteMany({
    //     where: {
    //         email: {
    //             endsWith: "@petsveta.com"
    //         }
    //     }
    // });

    console.log("⏳ Injecting 500 mock doctors into PostgreSQL...");

    for (let i = 1; i <= 20; i++) {
        const username = `doctor_user_${i}`;
        const email = `doctor${i}@petsveta.com`;

        // Pick dynamic items from your mock arrays using standard index math
        const specialization = specializations[i % specializations.length];
        const education = educations[i % educations.length];

        await prisma.user.create({
            data: {
                fullName: `Dr. Mock Abdullah ${i}`,
                email: email,
                password: dummyHashedPassword,
                username: username,
                isEmailVerified: true,
                doctors: {
                    create: {
                        education: education,
                        isVerified: VerificationStatus.APPROVED, // All doctors are approved for seeding purposes
                        specialization: specialization,
                        address: `${i * 12}, Main Boulevard, Gulberg, Lahore`,
                        experience: (i % 15) + 1, // Generates logical experience ranges from 1 to 15 years
                        fees: 1000 + (i % 5) * 500 // Alternates fees between 1000, 1500, 2000, 2500, etc.
                    }
                },
                doctorCertificate: {
                    create: {
                        publicId: `doctor_certificate_${i}`,
                        publicUrl: sampleCertificateUrl
                    }
                },
                userRole: {
                    create: { role: "Doctor" }
                }
            }
        });
    }

    console.log("✅ Seeding completed! 500 Relational Doctors created successfully.");
}

main()
    .catch((e) => {
        console.error("❌ Seeding error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
````

## File: Frontend/src/features/Admin/admin.route.tsx
````typescript
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDoctorPage from "./pages/AdminDoctorPage";
import { AdminProtectedRoutes } from "@/ProtectedRoutes/AdminProtectedRoutes";


const adminRoutes = [
  {
    path: "/admin-login",
    element: <AdminLoginPage />,
  },

  {
    path: "admin-dashboard",
    element: (
      <AdminProtectedRoutes>

        <AdminLayout />

      </AdminProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <AdminDoctorPage />
      }
    ]
  }

];

export default adminRoutes;
````

## File: Frontend/src/features/Admin/layout/AdminLayout.tsx
````typescript
import { useState } from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="lg:ml-[210px]">
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
````

## File: Frontend/src/features/Admin/layout/Sidebar.tsx
````typescript
import Logo from "../../../shared/components/Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { sidebarItems } from "../data/sidebar.data";
import { LogOut, X } from 'lucide-react'
import { logoutAdmin } from '../apis/adminlogin.api'

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const logOutUser = async () => {
    const response = await logoutAdmin();
    console.log(response);
    if (response.success) {
      navigate('/admin-login')
    }
  }
  return (
    <>
      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[210px] flex-col justify-between border-r border-gray-200 bg-white p-5 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div>
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={21} />
            </button>
          </div>

          <nav className="mt-10 space-y-3">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.address}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }: { isActive: boolean }) => `
                              flex items-center gap-3
                              px-4 py-3
                                rounded-xl
                              cursor-pointer
                                transition-all duration-300

                              ${isActive
                      ? "bg-[#06777D] text-white shadow-lg"
                      : "hover:bg-cyan-100 text-gray-700"}
                                `}
                >
                  <Icon />
                  {item.title}
                </NavLink>

              );
            })}
          </nav>
        </div>

        <div className="flex items-center justify-start gap-1.5">
          <button
            className="cursor-pointer font-semibold text-red-500"
            onClick={logOutUser}
          >
            Logout
          </button>
          <LogOut className="size-4 cursor-pointer text-red-500 hover:scale-75" />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
````

## File: Frontend/src/features/Auth/auth.route.tsx
````typescript
import LoginPage from "./pages/login";
import ContinueAsPage from "./pages/ContinueAs";
import PetOwnerSignupPage from "./pages/pet-owner-signup";
import DoctorSignupPage from "./pages/doctor-signup";
import { AuthSuccess } from "./components/AuthSuccess";
import ForgotPasswordPage from "./pages/forgot-password";
import VerifyOtpPage from "./pages/verify-otp";
import ResetPasswordPage from "./pages/reset-password";


const AuthRouter = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/continue-as",
    element: <ContinueAsPage />,
  },
  {
    path: "/signup/pet-owner",
    element: <PetOwnerSignupPage />,
  },
  {
    path: "/signup/doctor",
    element: <DoctorSignupPage />,
  },
  {
    path: "/auth-success",
    element: <AuthSuccess />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtpPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  }
];

export default AuthRouter;
````

## File: Frontend/src/features/Doctor/doctor.route.tsx
````typescript
import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import { DoctorProtectedRoute } from "@/ProtectedRoutes/DoctorProtectedRoutes";
import DoctorSkill from "./pages/SkillPricing";
import { DoctorLayout } from "./Layout/doctor.layout";
import DoctorAvailabilityPage from "./pages/DoctorAvailabilityPage";
import PatientsPage from "./pages/PatientsPage";

export const doctorDashboardRoutes = [
  {
    path: "/",
    element: (
      <DoctorProtectedRoute>
        <DoctorLayout />
      </DoctorProtectedRoute>
    ),
    children: [
      {
        path: "doctor-dashboard",
        element: <DoctorDashboardPage />,
      },
      {
        path: "doctor-dashboard-profile",
        element: <DoctorProfilePage />,
      },
      {
        path: "doctor-pricing",
        element: <DoctorSkill />,
      },
      {
        path: "doctor-availability",
        element: <DoctorAvailabilityPage />,
      },
      {
        path: "pateints",
        element: <PatientsPage />
      }
    ],
  },
];
````

## File: Frontend/src/features/Doctorcart/component/FindDoctor.tsx
````typescript
import { useState } from "react";
import { type Doctor } from "../apis/getDoctors.api";
import { useApprovedDoctors } from "../hooks/useGetDoctors";
import DoctorsList from "./DoctorsList";
import FilterSidebar from "./FilterSidebar";
import PageHeader from "./PageHeader";
import Pagination from "./Pagination";

const LIMIT = 5;

const FindDoctor = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useApprovedDoctors({ page, limit: LIMIT, search });

  const doctors = data?.data?.data ?? [];
  const totalPages = data?.data?.meta?.totalPages ?? 1;

  const handleBookAppointment = (doctorId: string, checkupTime?: string) => {
    console.log("Book appointment doctor id:", doctorId, "checkup time:", checkupTime);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[270px_1fr]">
        <FilterSidebar
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onReset={() => {
            setSearch("");
            setPage(1);
          }}
        />

        <section>
          <PageHeader />

          <DoctorsList
            doctors={doctors}
            loading={isLoading}
            onBookAppointment={handleBookAppointment}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPrevious={() => setPage((prev) => prev - 1)}
            onNext={() => setPage((prev) => prev + 1)}
          />
        </section>
      </section>
    </main>
  );
};

export default FindDoctor;
````

## File: Frontend/src/features/Pet Owner/pet details/components/PetForm.tsx
````typescript
import { Calendar, List, PawPrint, Shield, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import Input from "../../../../shared/components/Input/Input";
import Button from "../../../../shared/components/Button/Button";
import {
  petSchema,
  type PetFormInput,
  type PetFormData,
} from "../schemas/pet.schema";
import { useAuth } from "@/features/Auth/hooks/authhook";
import { submitPetData } from "../apis/pet.api";

interface PetFormProps {
  onSubmitSuccess?: (newPet: any) => void;
  onCancel?: () => void;
}

const PetForm = ({ onSubmitSuccess, onCancel }: PetFormProps) => {
  const { user } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PetFormInput, unknown, PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: "",
      age: "",
      breed: "",
      category: undefined,
    },
  });

  const onSubmit = async (data: PetFormData) => {
    setSubmitError(null);
    console.log("Pet Form Data:", data);
    const petOwnerId = user?.data?.id;
    if (!petOwnerId) {
      setSubmitError("You must be logged in to register a pet.");
      return;
    }

    try {
      const newPet = await submitPetData({
        ...data,
        age: Number(data.age),
        petOwnerId,
      });

      if (newPet) {
        reset();
        if (onSubmitSuccess) {
          onSubmitSuccess(newPet);
        }
      } else {
        setSubmitError("Failed to save pet. Please check inputs.");
      }
    } catch (err: any) {
      setSubmitError(err?.response?.data?.message || "An error occurred while saving the pet.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F3FF] px-4 py-8 text-[#1F1F2E]">
      <section className="mx-auto max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl shadow-purple-200/60">
        <div className="relative h-44 bg-gradient-to-br from-[#F4ECFF] to-[#E9DDFF] px-6 py-6">
          <h1 className="text-2xl font-black tracking-tight text-[#4c249f] sm:text-3xl">
            Register Pet
          </h1>
          <p className="mt-1 text-sm font-semibold text-[#8B64D7]">
            Please enter your pet details
          </p>

          <span className="absolute bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#6D3DD9] shadow-lg shadow-purple-100">
            <PawPrint size={32} />
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-5 py-6">
          {submitError && (
            <div className="bg-red-50 text-red-650 p-3 rounded-2xl text-xs font-semibold border border-red-100 mb-3">
              {submitError}
            </div>
          )}

          <Input
            label="Pet Name"
            type="text"
            placeholder="Enter pet name"
            error={errors.name?.message}
            icon={<User size={18} />}
            {...register("name")}
          />

          <Input
            label="Age"
            type="number"
            placeholder="Enter age"
            error={errors.age?.message}
            icon={<Calendar size={18} />}
            rightText="Years"
            {...register("age")}
          />

          <Input
            label="Breed"
            type="text"
            placeholder="Enter breed"
            error={errors.breed?.message}
            icon={<Shield size={18} />}
            {...register("breed")}
          />

          <div>
            <label className="mb-2 block text-sm font-black">
              Category <span className="text-red-500">*</span>
            </label>

            <div className="relative flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#6D3DD9] focus-within:ring-4 focus-within:ring-purple-100">
              <List size={18} className="mr-3 text-[#6D3DD9]" />

              <select
                {...register("category")}
                className="h-full w-full bg-transparent text-sm font-semibold text-slate-600 outline-none"
              >
                <option value="">Select category</option>
                <option value="DOG">Dog</option>
                <option value="CAT">Cat</option>
                <option value="REPTILE">Reptile</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {errors.category && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-purple-100 bg-[#F6F0FF] p-4">
            <h3 className="text-sm font-black text-[#4B2DB5]">
              About Pet Categories
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Choose the correct category to help us provide better care for your
              pet.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="border-[#6D3DD9]/35 text-[#6D3DD9]"
              onClick={() => {
                reset();
                if (onCancel) onCancel();
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              isSubmitting={isSubmitting}
              className="bg-[#6D3DD9] hover:bg-[#5630B2] hover:text-white"
            >
              Save Pet
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default PetForm;
````

## File: Backend/app/routes/admin.routes.js
````javascript
const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');
const authenticateRole = require('../middleware/authorizeRole.middleware')
const { adminLimiter } = require('../middleware/rateLimiter');

const Router = express.Router();

Router
    .route('/all/doctors')
    .get(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.allDoctorList)

Router
    .route('/doctor-stats')
    .get(adminLimiter, authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.fetchDoctorStats)

Router
    .route('/pending/doctors')
    .get(adminLimiter, authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.pendingDoctorList)

Router
    .route('/approved/doctors')
    .get(adminLimiter, authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.approvedDoctor)

Router
    .route('/approve-pending/doctor')
    .post(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.approveupdateDoctor)

Router
    .route('/reject/doctor')
    .post(authMiddleware.protect, authenticateRole.authenticateUserRole('Admin'), adminController.rejectDoctor)

module.exports = Router;
````

## File: Backend/package.json
````json
{
  "name": "pets-veta-backend",
  "version": "1.0.0",
  "description": "",
  "license": "ISC",
  "author": "",
  "type": "commonjs",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
  "prisma": {
    "seed": "node prisma/seed.js"
  },
  "dependencies": {
    "@prisma/client": "^6.19.3",
    "bcrypt": "^6.0.0",
    "cloudinary": "^2.10.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "express-rate-limit": "^8.5.2",
    "google-auth-library": "^10.6.2",
    "jsonwebtoken": "^9.0.3",
    "multer": "^2.1.1",
    "nodemailer": "^8.0.7",
    "pg": "^8.20.0",
    "rate-limit-redis": "^5.0.0",
    "redis": "^6.0.0",
    "stripe": "^22.2.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.14",
    "prisma": "^6.19.3"
  }
}
````

## File: Frontend/package.json
````json
{
  "name": "pets-veta-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@stripe/stripe-js": "^9.8.0",
    "@studio-freight/lenis": "^1.0.42",
    "@tailwindcss/vite": "^4.3.0",
    "@tanstack/react-query": "^5.101.0",
    "@tanstack/react-query-devtools": "^5.101.0",
    "axios": "^1.16.1",
    "lucide-react": "^1.16.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-hook-form": "^7.75.0",
    "react-icons": "^5.6.0",
    "react-router-dom": "^7.15.0",
    "sonner": "^2.0.7",
    "tailwindcss": "^4.3.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.12.3",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.59.2",
    "vite": "^8.0.12"
  }
}
````

## File: Frontend/src/app/App.tsx
````typescript
import { RouterProvider } from "react-router-dom"
import Router from "../routes/routes"
import { AuthContextProvider } from "@/features/Auth/Context/auth.context"
import { QueryProvider } from "@/features/Auth/Query/Providers/AuthQueryProvider"
import SmoothScroll from "@/Global Provider/SmoothScroller"

function App() {


  return (
    <>

      <QueryProvider>

        <AuthContextProvider>
          <SmoothScroll>

            <RouterProvider router={Router} />
          </SmoothScroll>

        </AuthContextProvider>

      </QueryProvider>

    </>
  )
}

export default App
````

## File: Frontend/src/features/Auth/components/login-component.tsx
````typescript
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getGoogleAuthUrlApi } from "../api/petOwner.api";
import { type ApiResponse } from "../api/loginuser.api";
import { useAuth } from "../hooks/authhook";

import {
  loginSchema,
  type LoginFormData,
} from "../../Auth/schemas/login.schema";



const PawIcon = () => (
  <svg
    viewBox="0 0 64 64"
    className="h-8 w-8 fill-[#178f95]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="22" r="7" />
    <circle cx="32" cy="16" r="7" />
    <circle cx="46" cy="22" r="7" />
    <circle cx="24" cy="34" r="6" />
    <circle cx="40" cy="34" r="6" />
    <path d="M18 47c0-9 6-17 14-17s14 8 14 17c0 6-5 9-14 9s-14-3-14-9z" />
  </svg>
);

export default function LoginComponent() {

  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [forbiddenError, setForbiddenError] = useState("");
  const [apiMesg, setApiMesg] = useState("");

  const { isAuthenticatedUser, user } = useAuth()
  const navigate = useNavigate();

  const { mutate: login, isPending: isloggingIn } = useLogin({
    onSuccess: (response: ApiResponse) => {

      if (response.success) {


        setApiMesg(response.message);
        console.log("Role is ", response.data.role);

        reset();

      }

    },
    onError: (error) => {
      setForbiddenError("Login Failed.Please check you email and password");
      console.log("Login Error", error)
    }
  })

  useEffect(() => {
    console.log("Wokring")
    if (isAuthenticatedUser && user?.data) {
      if (user.data.role === "Admin") {
        navigate("/admin-dashboard", { replace: true });
      }
      else if (user.data.role === "Doctor") {
        navigate("/doctor-dashboard", { replace: true });
      }
      else {
        navigate("/", { replace: true });
      }
    }
  }, [isAuthenticatedUser, user, navigate]);



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setForbiddenError('');
    setApiMesg('');
    login(data)

  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      setForbiddenError("");

      const result = await getGoogleAuthUrlApi();

      if (result.success && result.data?.url) {
        window.location.href = result.data.url;
      }
    } catch (error) {
      setForbiddenError("Google login failed. Please try again.");

      if (error instanceof Error) {
        console.log("Google Auth Error:", error.message);
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#dff3f2] shadow-[0_12px_28px_rgba(23,143,149,0.18)]">
        <PawIcon />
      </div>

      <div className="mb-6 text-center">
        <h1 className="text-[26px] font-extrabold leading-tight tracking-[-0.04em] text-[#101b3d] md:text-[30px]">
          Welcome Back
        </h1>

        <p className="mt-2 text-[13px] font-medium text-[#6d7891]">
          Login to your PetsVeta account
        </p>
      </div>

      {forbiddenError && (
        <p className="mb-3 rounded-xl bg-red-50 px-4 py-2 text-center text-[13px] font-bold text-red-600">
          {forbiddenError}
        </p>
      )}

      {apiMesg && (
        <p className="mb-3 rounded-xl bg-green-50 px-4 py-2 text-center text-[13px] font-bold text-green-600">
          {apiMesg}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-2 block text-[13px] font-bold text-[#17233f]">
            Email Address
          </label>

          <div className="flex h-[48px] items-center rounded-2xl border border-[#d8dde8] bg-white/70 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 focus-within:border-[#178f95] focus-within:shadow-[0_0_0_4px_rgba(23,143,149,0.12)]">
            <svg
              className="mr-4 h-5 w-5 text-[#7b8497]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>

            <input
              type="email"
              placeholder="example@gmail.com"
              className="h-full w-full bg-transparent text-[14px] font-medium text-[#17233f] outline-none placeholder:text-[#8993a6]"
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="mt-1.5 text-[12px] font-semibold text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-[13px] font-bold text-[#17233f]">
            Password
          </label>

          <div className="flex h-[48px] items-center rounded-2xl border border-[#d8dde8] bg-white/70 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 focus-within:border-[#178f95] focus-within:shadow-[0_0_0_4px_rgba(23,143,149,0.12)]">
            <svg
              className="mr-4 h-5 w-5 text-[#7b8497]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c.828 0 1.5.672 1.5 1.5S12.828 14 12 14s-1.5-.672-1.5-1.5S11.172 11 12 11z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 11V8a5 5 0 00-10 0v3M6 11h12v9H6z"
              />
            </svg>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="h-full w-full bg-transparent text-[14px] font-medium text-[#17233f] outline-none placeholder:text-[#8993a6]"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-3 text-[#7b8497] transition hover:text-[#178f95]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-3.42"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.88 4.24A9.77 9.77 0 0112 4c6 0 9.75 8 9.75 8a17.9 17.9 0 01-2.19 3.2M6.61 6.61C3.73 8.48 2.25 12 2.25 12s3.75 8 9.75 8a9.9 9.9 0 004.18-.92"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1.5 text-[12px] font-semibold text-red-600">
              {errors.password.message}
            </p>
          )}

          <div className="mt-2 text-right">
            <a
              href="/forgot-password"
              className="text-[13px] font-extrabold text-[#178f95] transition hover:text-[#0f7075]"
            >
              Forgot Password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isloggingIn}
          className="mt-1 flex h-[50px] w-full items-center justify-center gap-3 rounded-2xl bg-[#15265d] text-[15px] font-extrabold text-white shadow-[0_16px_30px_rgba(21,38,93,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#101f4d] active:translate-y-0"
        >
          {isloggingIn ? "Logginin In" : "Log In"}
          <span className="text-lg leading-none">→</span>
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="flex h-[50px] w-full items-center justify-center gap-3 rounded-2xl border border-[#d8dde8] bg-white text-[14px] font-extrabold text-[#17233f] shadow-[0_4px_12px_rgba(23,143,149,0.08)] transition-all duration-300 hover:border-[#178f95] hover:bg-[#f8fbfb] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="h-5 w-5"
            alt="Google"
          />
          {isGoogleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        <p className="pt-1 text-center text-[13px] font-medium text-[#7b8497]">
          Don&apos;t have an account?{" "}
          <a
            href="/doctor-signup"
            className="font-extrabold text-[#178f95] transition hover:text-[#0f7075]"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
````

## File: Backend/app/controllers/admin.controller.js
````javascript
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
````

## File: Backend/app/controllers/auth.controller.js
````javascript
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
    console.log("Doctor Account....", req.body);
    if (!req.file) {

        throw new AppError("File is missing", 400);
    }

    requireFields(["fullName", "username", "fees", "email", "password", "phone", "education", "specialization", "address", "experience"], req.body)
    const { fullName, username, email, password, fees, phone,
        education, specialization, address, experience } = req.body;
    console.log("I run....")
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
        username: newDoctor.username,
        role: newDoctor.userRole.role

    }

    const otpToken = jwtSign(payload, Token_Types.OTP);

    res.cookie('otpToken', otpToken, cookiesOptions);

    return sendResponse(res, 201, "Success", newDoctor);

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
        id: newPetOwner.id,
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
    console.log("Data is ", req.body);

    const isValidUser = await authServices.verifyEmail(email);
    console.log("Valid User is", isValidUser);
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
````

## File: Backend/app/controllers/userdoctor.controller.js
````javascript
const doctorService = require("../services/userdoctor.services");
const catchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const sendResponse = require("../utils/SendResponse");

const getApprovedDoctorsForUsers = catchAsync(async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const search = req.query.search || "";

  if (page < 1 || limit < 1) {
    throw new AppError("Page and limit must be positive numbers", 400);
  }

  const result = await doctorService.getApprovedDoctorsForUsers({
    page,
    limit,
    search,
  });

  sendResponse(res, 200, "Approved doctors fetched successfully", result);
});

const getDoctorById = catchAsync(async (req, res) => {
  const { doctorId } = req.query;

  if (!doctorId) {
    throw new AppError("Doctor ID is required", 400);
  }

  const doctor = await doctorService.getSpecificDoctor(doctorId);

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  console.log("Doctor Data ==> ", JSON.stringify(doctor, null, 2));



  return sendResponse(res, 200, "Doctor fetched successfully", doctor);
})

module.exports = {
  getApprovedDoctorsForUsers,
  getDoctorById
};
````

## File: Backend/app/services/admin.services.js
````javascript
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
            doctorCertificate: {
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
            doctorCertificate: {
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
            doctorCertificate: {
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
````

## File: Backend/app/services/auth.services.js
````javascript
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
            doctorCertificate: {
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
            doctorCertificate: true
        }
    });
};


const createPetOwner = async (petOwnerData) => {
    if (!petOwnerData) {
        throw new AppError("Data is Invalid ", 400)
    }

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

const getUserById = async (id) => {
    if (!id) {
        return false;
    }
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return user;

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
    getUserById,
    verifyUsername,
    createAccountByGoogleService
};
````

## File: Backend/app/services/doctor.services.js
````javascript
const { default: prisma } = require('../config/prisma')
const { PaymentStatus } = require('@prisma/client')


const addDoctorService = async (skills, userId) => {
    console.log("Skills are ", skills, userId);
    let isExisting = false;

    const doSkillExist = await prisma.doctorSkill.findFirst({
        where: {
            userId: userId,
            skill: {
                equals: skills.skill,
                mode: 'insensitive'
            }
        }
    });
    if (doSkillExist) {
        isExisting = true;
        return isExisting;
    }

    const newSkills = await prisma.doctorSkill.create({
        data: {
            skill: skills.skill,
            price: skills.price,
            userId: userId
        },
    })
    return newSkills;
}


const deleteDoctorService = async (serviceId) => {
    const deletedSkill = await prisma.doctorSkill.delete({
        where: {
            id: serviceId
        }
    })
    return deletedSkill;
}


const getDoctorServices = async (userId) => {

    const services = await prisma.doctorSkill?.findMany({
        where: {
            userId: userId
        }
    })
    if (!services) {
        return false;
    }
    return services;
}


const updateDoctorServices = async (serviceId, skill, price) => {
    const updatedService = await prisma.doctorSkill.update({
        where: {
            id: serviceId
        },
        data: {
            price: price,
            skill: skill
        }
    })

    return updatedService;
}


const getDoctorAppointments = async (userId) => {

    const doctor = await prisma.doctor.findUnique({
        where: {
            userId,
        },
        select: {
            id: true,
        },
    });

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    return prisma.appointment.findMany({
        where: {
            doctorId: doctor.id,
            paymentStatus: PaymentStatus.SUCCEEDED
        },
        orderBy: {
            checkupTime: "asc",
        },
        select: {
            id: true,
            fees: true,
            checkupTime: true,
            status: true,
            petIssueReport: {
                select: {
                    id: true,
                    issue: true,
                    user: {
                        select: {
                            fullName: true,
                            email: true,
                            phone: true,
                            profileImageUrl: true,
                        },
                    },
                    pet: {
                        select: {
                            id: true,
                            name: true,
                            age: true,
                            breed: true,
                            category: true,
                        },
                    },
                },
            },
        },
    });
}


const getDoctorProfile = async (userId) => {
    const doctorProfile = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            phone: true,
            profileImageUrl: true,
            isActive: true,
            doctors: {
                select: {
                    id: true,
                    specialization: true,
                    education: true,
                    experience: true,
                    fees: true,
                    address: true,
                    isAvailable: true,
                    isVerified: true,
                },
            },
        },
    });

    return doctorProfile;
};


const updateDoctorProfile = async (userId, profileData) => {
    const {
        fullName,
        username,
        phone,
        profileImageUrl,
        specialization,
        education,
        experience,
        fees,
        address,
        isAvailable,
    } = profileData;

    const updatedProfile = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            fullName,
            username,
            phone,
            profileImageUrl,

            doctors: {
                update: {
                    specialization,
                    education,
                    experience: Number(experience),
                    fees: Number(fees),
                    address,
                    isAvailable,
                },
            },
        },
        select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            phone: true,
            profileImageUrl: true,
            isActive: true,
            doctors: {
                select: {
                    id: true,
                    specialization: true,
                    education: true,
                    experience: true,
                    fees: true,
                    address: true,
                    isAvailable: true,
                    isVerified: true,
                },
            },
        },
    });

    return updatedProfile;
};

module.exports = {
    addDoctorService,
    deleteDoctorService,
    getDoctorServices,
    updateDoctorServices,
    getDoctorAppointments,
    getDoctorProfile,
    updateDoctorProfile,
};
````

## File: Frontend/src/features/Auth/components/doctor-form.tsx
````typescript
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type ApiResponse } from "../api/doctor.api";


import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import { useDoctorAccountHook } from "../hooks/useDoctorAccount";

import {
  doctorSchema,
  type DoctorFormData,
  type DoctorFormInput,
} from "../schemas/doctor.schema";

const doctorFields = [
  { name: "fullName", label: "Full Name", type: "text", placeholder: "Enter Name" },
  { name: "username", label: "User Name", type: "text", placeholder: "Enter UserName" },
  { name: "email", label: "Email Address", type: "email", placeholder: "example@gmail.com" },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+923001234567" },
  { name: "experience", label: "Years of Experience", type: "number", placeholder: "5" },
  { name: "fees", label: "Fees", type: "number", placeholder: "Enter Checkup Fees" },
  { name: "medicalLicenseNumber", label: "Medical License Number", type: "text", placeholder: "LIC-123456" },
  { name: "education", label: "Education/Qualifications", type: "text", placeholder: "e.g., DVM, BVSc" },
  { name: "address", label: "Clinic Address", type: "text", placeholder: "Clinic Address" },
  { name: "document", label: "Upload Document", type: "file", placeholder: "" },
  { name: "password", label: "Password", type: "password", placeholder: "******" },
  { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "******" },
] as const;

const specializations = ["General Veterinary", "Pet Surgeon", "Animal Dentist"];


export default function DoctorForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DoctorFormInput, unknown, DoctorFormData>({
    resolver: zodResolver(doctorSchema),
    mode: "onChange",
  });

  const { mutate: createAccount } = useDoctorAccountHook({
    onSuccess: (response: ApiResponse) => {
      if (response.success) {
        setResponseMessage(response.message || "Account Created Successfully")
        reset();
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
      console.log("Error is Doctor", error)
    }
  })

  const onSubmit = async (data: DoctorFormData) => {
    setErrorMessage("");
    setResponseMessage("");

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "document") {
        const value = data[key as keyof DoctorFormData];

        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      }
    });

    if (data.document && data.document.length > 0) {
      formData.append("document", data.document[0]);
    }

    console.log("Submitting FormData...", data);
    createAccount(formData)

  };

  const onError: SubmitErrorHandler<DoctorFormInput> = (formErrors) => {
    console.error("Zod Validation Failed! Check these fields:", formErrors);
  };

  return (
    <div className="rounded-3xl bg-white/80 p-6 shadow-sm backdrop-blur-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#078b91]">
          Doctor Registration
        </h1>
        <p className="mt-2 text-gray-500">
          Create your professional doctor account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
        {responseMessage && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-center font-medium text-green-800">
              {responseMessage}
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-center font-medium text-red-800">
              {errorMessage}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {doctorFields.map((field) => {
            const isPasswordField =
              field.name === "password" || field.name === "confirmPassword";

            return (
              <Input
                key={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder || ""}
                error={
                  errors[field.name as keyof DoctorFormInput]?.message as string
                }
                showPassword={isPasswordField ? showPassword : undefined}
                onTogglePassword={
                  isPasswordField
                    ? () => setShowPassword((prev) => !prev)
                    : undefined
                }
                {...register(field.name)}
              />
            );
          })}

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Specialization
            </label>

            <select
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-600"
              {...register("specialization")}
            >
              <option value="">Select specialization</option>
              {specializations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {errors.specialization && (
              <p className="text-sm text-red-500">
                {errors.specialization.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Button type="submit" isSubmitting={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-blue-900 hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
````

## File: Backend/app/app.js
````javascript
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("./config/redis.config");

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const authRouter = require("./routes/auth.routes");
const adminRouter = require("./routes/admin.routes");
const doctorRouter = require("./routes/doctor.routes");
const userRoutes = require("./routes/userdoctor.route");
const petOwnerRoutes = require("./routes/petOwner.routes");

// Stripe payment imports
const paymentRouter = require("./routes/payment.routes");
const paymentController = require("./controllers/payment.controller");

const globalErrorHandler = require("./middleware/globalErrorHandler");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// TODO: STRIPE PAYMENT API

app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  paymentController.stripeWebhook
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/petOwner", petOwnerRoutes);

// Payment routes
app.use("/api/v1/payment", paymentRouter);

app.use(globalErrorHandler);

module.exports = app;
````

## File: Frontend/src/features/Admin/components/AdminLogin.tsx
````typescript
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginAdminAccount, type ApiResponse } from '../apis/adminlogin.api'

import {
  adminLoginSchema,
  type AdminLoginFormValues,
} from "../schema/admin.login.schema";

import Button from "../../../shared/components/Button/Button";
import Input from "../../../shared/components/Input/Input";
import { useAuth } from "@/features/Auth/hooks/authhook";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setIsAuthenticateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const handleadminmlogin = async (data: { email: string; password: string; }) => {
    try {
      const response: ApiResponse = await loginAdminAccount(data);
      if (response.success) {
        setUser(response);
        setIsAuthenticateUser(true);
        navigate('/admin-dashboard')
        // return;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      return;
    }


  };

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-4 py-8 text-[#20263D] sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-2xl shadow-slate-200/70 lg:grid-cols-2">
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#20263D] via-[#26304d] to-[#078b91] p-10 text-white lg:block">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#F9C5A8]/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#D4E2E0]/25 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <ShieldCheck size={34} />
                </div>

                <h1 className="mt-8 max-w-md text-5xl font-black leading-tight">
                  PetsVeta Admin Panel
                </h1>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
                  Manage doctors, sellers, appointments, products, approvals,
                  and platform activity from one secure dashboard.
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <p className="text-sm font-semibold text-white/80">
                  Admin Access
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  Review doctor signup requests
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/70">
                  Approve or reject doctors after checking their details,
                  license, experience, and profile information.
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-10 sm:px-10 md:px-14 lg:px-16">
            <div className="mx-auto max-w-md">
              <div className="mb-8 text-center lg:text-left">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4E2E0]/70 text-[#078b91] lg:mx-0">
                  <ShieldCheck size={34} />
                </div>

                <h2 className="mt-6 text-3xl font-black text-[#20263D] md:text-4xl">
                  Admin Login
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Login to manage PetsVeta platform operations.
                </p>
              </div>

              <form onSubmit={handleSubmit(handleadminmlogin)} className="space-y-5">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="admin@petsveta.com"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword((prev) => !prev)}
                  error={errors.password?.message}
                  {...register("password")}
                />

                <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center gap-2 text-slate-500">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 accent-[#078b91]"
                    />
                    Remember me
                  </label>


                </div>

                <Button
                  type="submit"
                  isSubmitting={isSubmitting}
                  className="bg-[#20263D] font-black shadow-lg shadow-slate-300 hover:bg-[#111827] hover:text-white hover:border-transparent"
                >
                  {isSubmitting ? "Logging In" : " Login as Admin"}
                </Button>
              </form >

              <div className="mt-8 rounded-2xl bg-[#D4E2E0]/35 p-4">
                <p className="text-sm font-semibold leading-6 text-slate-600">
                  This page is only for platform administrators. Doctors and
                  sellers should use their own login portals.
                </p>
              </div>
            </div >
          </div >
        </div >
      </section >
    </main >
  );
};

export default AdminLoginPage;
````

## File: Frontend/src/features/Auth/components/pets-owner.tsx
````typescript
import { getGoogleAuthUrlApi, type ApiResponse } from "../api/petOwner.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AxiosError } from "axios";


import {
  petOwnerSchema,
  type PetOwnerFormData,
} from "../schemas/petowner.schema";


import { usePetOwnerHook } from "../hooks/usePetOwnerAccount";

const PawIcon = () => (
  <svg
    viewBox="0 0 64 64"
    className="h-8 w-8 fill-[#178f95]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="22" r="7" />
    <circle cx="32" cy="16" r="7" />
    <circle cx="46" cy="22" r="7" />
    <circle cx="24" cy="34" r="6" />
    <circle cx="40" cy="34" r="6" />
    <path d="M18 47c0-9 6-17 14-17s14 8 14 17c0 6-5 9-14 9s-14-3-14-9z" />
  </svg>
);

// interface RegistrationResponse {
//   success: boolean;
//   message: string;
// }

export default function PetOwnerForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");



  const { mutate: createAccount } = usePetOwnerHook({

    onSuccess: (response: ApiResponse) => {
      console.log("Role is ", response);
      if (response.success) {
        reset();
      }
    },
    onError: (error) => {
      setIsError("Failed in Creating Account");
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status && status >= 400 && status < 500) {
        setIsError(message || "Invalid request");
      } else {
        setIsError("Something went wrong. Please try again.");
      }


    }

  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PetOwnerFormData>({
    resolver: zodResolver(petOwnerSchema),
  });

  const onSubmit = async (data: PetOwnerFormData) => {

    setIsError('');
    createAccount(data);

  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      setIsError("");

      const result = await getGoogleAuthUrlApi();

      if (result.success && result.data?.url) {
        window.location.href = result.data.url;
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status && status >= 400 && status < 500) {
          setIsError(message || "Invalid request");
        } else {
          setIsError("Something went wrong. Please try again.");
        }

        console.log("Signup Error:", error);
      } else {
        setIsError("Something went wrong. Please try again.");
        console.log("Signup Error:", error);
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#dff3f2] shadow-[0_12px_28px_rgba(23,143,149,0.18)]">
        <PawIcon />
      </div>

      {/* Heading */}
      <div className="mb-5 text-center">
        <h1 className="text-[26px] font-extrabold leading-tight tracking-[-0.04em] text-[#101b3d] md:text-[30px]">
          Create Account
        </h1>

        <p className="mt-1.5 text-[13px] font-medium text-[#6d7891]">
          Join PetsVeta and care for your pets
        </p>
      </div>

      {isError && (
        <p className="mb-3 rounded-xl bg-red-50 px-4 py-2 text-center text-[13px] font-bold text-red-600">
          {isError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        {/* Full Name + Username */}
        <div className="grid gap-3.5 md:grid-cols-2">
          <FormField
            label="Full Name"
            placeholder="Enter full name"
            error={errors.fullName?.message}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12a5 5 0 100-10 5 5 0 000 10zM3 22a9 9 0 0118 0H3z"
              />
            }
            inputProps={register("fullName")}
          />

          <FormField
            label="Username"
            placeholder="Choose username"
            error={errors.username?.message}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            }
            inputProps={register("username")}
          />
        </div>

        {/* Email */}
        <FormField
          label="Email Address"
          type="email"
          placeholder="example@gmail.com"
          error={errors.email?.message}
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          }
          inputProps={register("email")}
        />

        {/* Password */}
        <PasswordField
          label="Password"
          placeholder="Enter your password"
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
          error={errors.password?.message}
          inputProps={register("password")}
        />

        {/* Confirm Password */}
        <PasswordField
          label="Confirm Password"
          placeholder="Confirm your password"
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
          error={errors.confirmPassword?.message}
          inputProps={register("confirmPassword")}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 flex h-[48px] w-full items-center justify-center gap-3 rounded-2xl bg-[#15265d] text-[15px] font-extrabold text-white shadow-[0_16px_30px_rgba(21,38,93,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#101f4d] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
          {!isSubmitting && <span className="text-lg leading-none">→</span>}
        </button>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="flex h-[48px] w-full items-center justify-center gap-3 rounded-2xl border border-[#d8dde8] bg-white text-[14px] font-extrabold text-[#17233f] shadow-[0_4px_12px_rgba(23,143,149,0.08)] transition-all duration-300 hover:border-[#178f95] hover:bg-[#f8fbfb] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="h-5 w-5"
            alt="Google"
          />
          {isGoogleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        <p className="pt-1 text-center text-[13px] font-medium text-[#7b8497]">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-extrabold text-[#178f95] transition hover:text-[#0f7075]"
          >
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
  icon: React.ReactNode;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

const FormField = ({
  label,
  placeholder,
  type = "text",
  error,
  icon,
  inputProps,
}: FormFieldProps) => {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-bold text-[#17233f]">
        {label}
      </label>

      <div className="flex h-[46px] items-center rounded-2xl border border-[#d8dde8] bg-white/70 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 focus-within:border-[#178f95] focus-within:shadow-[0_0_0_4px_rgba(23,143,149,0.12)]">
        <svg
          className="mr-3 h-5 w-5 text-[#7b8497]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          {icon}
        </svg>

        <input
          type={type}
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-[14px] font-medium text-[#17233f] outline-none placeholder:text-[#8993a6]"
          {...inputProps}
        />
      </div>

      {error && (
        <p className="mt-1.5 text-[12px] font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

type PasswordFieldProps = {
  label: string;
  placeholder: string;
  showPassword: boolean;
  onTogglePassword: () => void;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

const PasswordField = ({
  label,
  placeholder,
  showPassword,
  onTogglePassword,
  error,
  inputProps,
}: PasswordFieldProps) => {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-bold text-[#17233f]">
        {label}
      </label>

      <div className="flex h-[46px] items-center rounded-2xl border border-[#d8dde8] bg-white/70 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 focus-within:border-[#178f95] focus-within:shadow-[0_0_0_4px_rgba(23,143,149,0.12)]">
        <svg
          className="mr-3 h-5 w-5 text-[#7b8497]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 11c.828 0 1.5.672 1.5 1.5S12.828 14 12 14s-1.5-.672-1.5-1.5S11.172 11 12 11z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 11V8a5 5 0 00-10 0v3M6 11h12v9H6z"
          />
        </svg>

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-[14px] font-medium text-[#17233f] outline-none placeholder:text-[#8993a6]"
          {...inputProps}
        />

        <button
          type="button"
          onClick={onTogglePassword}
          className="ml-3 text-[#7b8497] transition hover:text-[#178f95]"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-3.42"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.88 4.24A9.77 9.77 0 0112 4c6 0 9.75 8 9.75 8a17.9 17.9 0 01-2.19 3.2M6.61 6.61C3.73 8.48 2.25 12 2.25 12s3.75 8 9.75 8a9.9 9.9 0 004.18-.92"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {error && (
        <p className="mt-1.5 text-[12px] font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};
````

## File: Frontend/src/features/Pet Owner/pet details/components/PetIssueReportForm.tsx
````typescript
import {
  Calendar,
  ClipboardPlus,
  Info,
  PawPrint,
  Pencil,
  Send,
  ShieldPlus,
  Stethoscope,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../shared/components/Button/Button";
import {
  petIssueReportSchema,
  type PetIssueReportFormData,
} from "../schemas/petIssueReport.schema";
import { useAuth } from "@/features/Auth/hooks/authhook";
import { getPetsData, submitPetIssue, type PetResponse } from "../apis/pet.api";
import {
  getDoctorProfileData,
  type BookableSlot,
} from "@/features/Appointment/apis/doctorProfile.api";

interface PetIssueReportFormProps {
  preselectedPetId?: string;
  doctorId?: string;
  preselectedCheckupTime?: string;
  onSubmitSuccess?: (data: unknown) => void;
  onCancel?: () => void;
}

const PetIssueReportForm = ({
  preselectedPetId = "",
  doctorId,
  preselectedCheckupTime = "",
  onSubmitSuccess,
  onCancel,
}: PetIssueReportFormProps) => {
  const { user } = useAuth();
  const [pets, setPets] = useState<PetResponse[]>([]);
  const [loadingPets, setLoadingPets] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadPetsError, setLoadPetsError] = useState<string | null>(null);
  const [loadSlotsError, setLoadSlotsError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<BookableSlot[]>([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PetIssueReportFormData>({
    resolver: zodResolver(petIssueReportSchema),
    defaultValues: {
      petId: preselectedPetId,
      issue: "",
      appointmentType: "NORMAL_CHECKUP",
      checkupTime: preselectedCheckupTime,
    },
  });

  const fetchPets = async () => {
    setLoadingPets(true);
    setLoadPetsError(null);
    try {
      const data = await getPetsData();
      if (data) {
        setPets(data);
      }
    } catch {
      setLoadPetsError("Failed to load your pets. Please retry.");
    } finally {
      setLoadingPets(false);
    }
  };

  const fetchDoctorSlots = async () => {
    if (!doctorId) {
      setLoadSlotsError("Doctor is required to load appointment slots.");
      return;
    }

    setLoadingSlots(true);
    setLoadSlotsError(null);

    try {
      const data = await getDoctorProfileData(doctorId);
      setAvailableSlots(data?.availableSlots || []);
    } catch {
      setLoadSlotsError("Failed to load appointment slots. Please retry.");
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    fetchDoctorSlots();
  }, [doctorId]);

  useEffect(() => {
    if (preselectedPetId) {
      setValue("petId", preselectedPetId);
    }
  }, [preselectedPetId, setValue]);

  useEffect(() => {
    if (preselectedCheckupTime) {
      setValue("checkupTime", preselectedCheckupTime);
    }
  }, [preselectedCheckupTime, setValue]);

  const issue = watch("issue") || "";
  const appointmentType = watch("appointmentType");
  const selectedCheckupTime = watch("checkupTime");

  const onSubmit = async (data: PetIssueReportFormData) => {
    setSubmitError(null);
    console.log("Pet issue report:", data);
    const petOwnerId = user?.data?.id;
    if (!petOwnerId) {
      setSubmitError("You must be logged in to report a pet issue.");
      return;
    }

    if (!doctorId) {
      setSubmitError("Please select a doctor before booking an appointment.");
      return;
    }

    try {
      const result = await submitPetIssue({
        ...data,
        petOwnerId,
        doctorId,
      });

      if (result) {
        reset();
        if (onSubmitSuccess) {
          onSubmitSuccess(result);
          navigate(result.checkoutUrl);
        }

      } else {
        setSubmitError("Failed to submit issue report.");
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An error occurred while submitting the issue report.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#F3FAF7] px-4 py-8 text-[#17233F]">
      <section className="mx-auto max-w-md overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-emerald-100">
        <div className="relative h-40 bg-gradient-to-br from-[#F4FFFA] to-[#DFF5EA] px-6 py-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B8F5A] text-white">
            <ClipboardPlus size={22} />
          </div>

          <div className="relative z-10 mt-5">
            <h1 className="text-2xl font-black">Report Pet Issue</h1>
            <p className="mt-2 max-w-[250px] text-sm leading-5 text-slate-600">
              Tell us about your pet&apos;s health issue so we can assist you
              better
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=500&q=80"
            alt="Cat"
            className="absolute bottom-0 right-5 h-36 w-36 object-cover mix-blend-multiply"
          />

          <div className="absolute bottom-8 right-7 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-[#0B8F5A] shadow-sm">
            <ShieldPlus size={22} />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-5 py-6">
          {submitError && (
            <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-semibold text-red-600">
              {submitError}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-black">
              Select Pet <span className="text-red-500">*</span>
            </label>

            {loadPetsError && (
              <div className="mb-2 flex items-center justify-between rounded-xl bg-red-55 text-red-600 p-2 text-xs font-semibold border border-red-100">
                <span>{loadPetsError}</span>
                <button
                  type="button"
                  onClick={fetchPets}
                  className="rounded-lg bg-red-100 px-2 py-1 text-xs font-bold text-red-700 hover:bg-red-200 transition"
                >
                  Retry
                </button>
              </div>
            )}

            <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#0B8F5A] focus-within:ring-4 focus-within:ring-emerald-100">
              <span className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B8F5A]">
                <PawPrint size={18} />
              </span>

              <select
                {...register("petId")}
                className="h-full w-full bg-transparent text-sm font-semibold text-slate-500 outline-none"
              >
                <option value="">{loadingPets ? "Loading pets..." : "Choose your pet"}</option>
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name} - {pet.category} ({pet.breed})
                  </option>
                ))}
              </select>
            </div>

            {errors.petId && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                {errors.petId.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-black">
              Appointment Slot <span className="text-red-500">*</span>
            </label>

            {loadSlotsError && (
              <div className="mb-2 flex items-center justify-between rounded-xl border border-red-100 bg-red-50 p-2 text-xs font-semibold text-red-600">
                <span>{loadSlotsError}</span>
                <button
                  type="button"
                  onClick={fetchDoctorSlots}
                  className="rounded-lg bg-red-100 px-2 py-1 text-xs font-bold text-red-700 transition hover:bg-red-200"
                >
                  Retry
                </button>
              </div>
            )}

            {loadingSlots ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-500">
                Loading available slots...
              </div>
            ) : availableSlots.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.slice(0, 10).map((slot) => (
                  <button
                    key={`${slot.scheduleId}-${slot.startDateTime}`}
                    type="button"
                    onClick={() => setValue("checkupTime", slot.startDateTime)}
                    className={`rounded-xl border p-3 text-left text-xs font-black transition ${selectedCheckupTime === slot.startDateTime
                      ? "border-[#0B8F5A] bg-emerald-50 text-[#0B8F5A]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-[#0B8F5A]"
                      }`}
                  >
                    <span className="block text-[11px] uppercase text-slate-400">
                      {slot.day}
                    </span>
                    {slot.startTime} - {slot.endTime}
                  </button>
                ))}
              </div>
            ) : (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-500">
                No appointment slots available for this doctor.
              </p>
            )}

            <input type="hidden" {...register("checkupTime")} />

            {errors.checkupTime && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                {errors.checkupTime.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-black">
              Issue Details <span className="text-red-500">*</span>
            </label>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-[#0B8F5A] focus-within:ring-4 focus-within:ring-emerald-100">
              <div className="flex gap-3">
                <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#0B8F5A]">
                  <Pencil size={18} />
                </span>

                <textarea
                  {...register("issue")}
                  maxLength={500}
                  placeholder="Describe the issue your pet is facing..."
                  className="min-h-24 w-full resize-none bg-transparent text-sm font-semibold text-slate-600 outline-none placeholder:text-slate-400"
                />
              </div>

              <p className="text-right text-xs font-semibold text-slate-400">
                {issue.length}/500
              </p>
            </div>

            {errors.issue && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                {errors.issue.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-black">
              Appointment Type <span className="text-red-500">*</span>
            </label>

            <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4">
              <span className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0B8F5A]">
                <Calendar size={18} />
              </span>

              <select
                {...register("appointmentType")}
                className="h-full w-full bg-transparent text-sm font-semibold text-slate-500 outline-none"
              >
                <option value="NORMAL_CHECKUP">Normal Checkup</option>
              </select>
            </div>

            {errors.appointmentType && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                {errors.appointmentType.message}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-[#EFFBF5] p-4">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B8F5A] text-white">
                <Info size={16} />
              </div>

              <div>
                <h3 className="text-sm font-black text-[#0B8F5A]">
                  Appointment Type
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Choose normal checkup for regular pet health consultation.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setValue("appointmentType", "NORMAL_CHECKUP")}
              className={`w-full rounded-xl border p-3 text-left transition ${appointmentType === "NORMAL_CHECKUP"
                ? "border-[#0B8F5A] bg-white"
                : "border-slate-200 bg-white"
                }`}
            >
              <div className="flex items-start gap-3">
                <Stethoscope size={26} className="text-[#0B8F5A]" />
                <div>
                  <h4 className="text-sm font-black">Normal Checkup</h4>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Book a regular consultation for your pet&apos;s health issue.
                  </p>
                </div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                if (onCancel) onCancel();
              }}
            >
              Cancel
            </Button>

            <Button type="submit" isSubmitting={isSubmitting}>
              <span className="flex items-center justify-center gap-2">
                <Send size={17} />
                Submit Report
              </span>
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default PetIssueReportForm;
````

## File: Backend/app/routes/doctor.routes.js
````javascript
const express = require('express');
const authMiddlware = require('../middleware/auth.middleware');
const authenticateRole = require('../middleware/authorizeRole.middleware');
const doctorController = require('../controllers/doctor.controller');
const doctorScheduleController = require('../controllers/doctorSchedule.controller');
const { doctorLimiter } = require('../middleware/rateLimiter')

const Router = express.Router();

Router
    .route("/add/service")
    .post(doctorLimiter, authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.createDoctorServicePricing);

Router
    .route('/get/services')
    .get(doctorLimiter, authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.fetchDoctorServices);

Router
    .route('/edit/service')
    .patch(doctorLimiter, authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.updateDoctorService);

Router
    .route("/delete/service")
    .delete(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorController.deleteDoctorService
    );

Router
    .route('/appointments')
    .get(doctorLimiter, authMiddlware.protect, authenticateRole.authenticateUserRole('Doctor'), doctorController.fetchDoctorAppointments);

Router
    .route("/schedule")
    .post(
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorScheduleController.createDoctorSchedule
    );

Router
    .route("/schedule/me")
    .get(
        doctorLimiter,
        authMiddlware.protect,
        authenticateRole.authenticateUserRole("Doctor"),
        doctorScheduleController.getDoctorSchedule
    );

Router
    .route("/schedule/doctor/:doctorId")
    .get(doctorScheduleController.getDoctorSchedulesByDoctorId);



module.exports = Router;
````

## File: Backend/prisma/schema.prisma
````prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==============================================

enum VerificationStatus {
  PENDING
  APPROVED
  REJECTED
}

enum WeekDays {
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
  SUNDAY
}

enum PetCategory {
  DOG
  CAT
  REPTILE
  OTHER
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}

enum AppointmentPayment {
  PENDING
  COMPLETED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  CANCELLED
  REFUNDED
  SUCCEEDED
}

model User {
  id                String             @id @default(uuid())
  fullName          String
  username          String
  email             String             @unique
  isEmailVerified   Boolean            @default(false)
  password          String?
  phone             String             @default("")
  profileImageUrl   String             @default("Enter your Image")
  isActive          Boolean            @default(true)
  refreshToken      String?
  otp               String?
  createdAt         DateTime           @default(now())
  userRole          UserRole?
  doctors           Doctor?
  admin             Admin?
  doctorCertificate DoctorCertificate?
  pets              Pet[]
  petIssueReports   PetIssueReport[]
  doctorSkills      DoctorSkill[]

  @@index([fullName])
}

model Doctor {
  id              String             @id @default(uuid())
  userId          String             @unique
  isAvailable     Boolean            @default(false)
  education       String
  specialization  String
  address         String
  experience      Int
  fees            Int
  isVerified      VerificationStatus @default(PENDING)
  user            User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  doctorSchedules DoctorSchedule[]
  appointments    Appointment[]

  @@index([userId])
  @@index([specialization])
  @@index([fees])
  @@index([isAvailable])
  @@index([specialization, fees, isAvailable])
}

model DoctorCertificate {
  id        String @id @default(uuid())
  userId    String @unique
  publicUrl String
  publicId  String
  user      User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model DoctorSkill {
  id     String @id @default(uuid())
  userId String
  skill  String
  price  String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Admin {
  id        String   @id @default(uuid())
  userId    String   @unique
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}

model UserRole {
  id     String @id @default(uuid())
  userId String @unique
  role   String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model DoctorSchedule {
  id          String       @id @default(uuid())
  doctorId    String
  date        DateTime
  startTime   DateTime
  endTime     DateTime
  isBooked    Boolean      @default(false)
  doctor      Doctor       @relation(fields: [doctorId], references: [id])
  appointment Appointment? 
  @@unique([doctorId,startTime])
}

model Pet {
  id              String           @id @default(uuid())
  petOwnerId      String
  name            String
  age             Decimal          @db.Decimal(10, 2)
  breed           String
  category        PetCategory
  user            User             @relation(fields: [petOwnerId], references: [id])
  petIssueReports PetIssueReport[]
}

model PetIssueReport {
  id           String        @id @default(uuid())
  petOwnerId   String
  petId        String
  issue        String
  pet          Pet           @relation(fields: [petId], references: [id])
  user         User          @relation(fields: [petOwnerId], references: [id])
  appointments Appointment[]
}

model Appointment {
  id               String            @id @default(uuid())
  doctorId         String
  petIssueReportId String
  scheduleId       String            @unique 
  fees             Int
  paymentStatus    PaymentStatus     @default(PENDING)
  stripeSessionId  String?
  checkupTime      DateTime
  status           AppointmentStatus @default(PENDING)
  petIssueReport   PetIssueReport    @relation(fields: [petIssueReportId], references: [id])
  doctor           Doctor            @relation(fields: [doctorId], references: [id])
  doctorSchedule   DoctorSchedule    @relation(fields: [scheduleId], references: [id])
}
````

## File: Frontend/src/shared/components/Navbar/Navbar.tsx
````typescript
import { NavLink } from "react-router-dom";
import { User } from "lucide-react"; // Lightweight default user icon
import NAVLINK from "./navbar.data";
import Button from "../Button/Button";
import { useAuth } from "@/features/Auth/hooks/authhook";

const Navbar = () => {
  // Assuming useAuth returns { user, isAuthenticated } or similar based on standard patterns
  // and user object contains { name, role }
  const { user } = useAuth();

  const isPetOwner = user?.data.role === "PetOwner";

  return (
    /* Changed 'sticky top-0' to 'relative' to make it completely static */
    <nav className="fixed top-0 left-0 w-full  z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-2xl font-bold text-sky-900">
          Pets Veta
        </NavLink>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAVLINK.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive
                    ? "text-[#178f95]"
                    : "text-gray-600 hover:text-[#178f95]"
                  }`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side Actions: Conditional Auth UI */}
        <div className="hidden items-center gap-3 lg:flex">
          {isPetOwner ? (
            /* Authenticated PetOwner View */
            <div className="flex items-center gap-3 rounded-full bg-gray-50 border border-gray-100 py-1.5 pl-2 pr-4 transition hover:bg-gray-100">
              {user.data.image ? (
                <img
                  src="user"
                  alt={user.data.username}
                  className="h-8 w-8 rounded-full object-cover border border-[#178f95]/20"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#178f95]/10 text-[#178f95]">
                  <User size={18} />
                </div>
              )}
              <span className="text-sm font-semibold text-gray-700 select-none">
                {user.data.username}
              </span>
            </div>
          ) : (
            /* Guest / Unauthenticated View */
            <>
              <Button href="/login" variant="outline" size="sm">
                Login
              </Button>

              <NavLink
                to="/continue-as"
                className="rounded-lg bg-[#178f95] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#12757a]"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
````

## File: Frontend/src/routes/routes.tsx
````typescript
import AuthRouter from "../features/Auth/auth.route";
import { createBrowserRouter } from "react-router-dom";
import LandingPageRoutes from "../features/Landing Page/routes";
import Notfound from "../shared/components/Notfound/Notfound";
import { doctorDashboardRoutes } from "../features/Doctor/doctor.route";
import { doctorRoutes } from "../features/Appointment/appointment.routes";
import adminRoutes from "../features/Admin/admin.route";
import { doctorAppointmentRoutes } from "../features/Doctorcart/doctorAppointment.route";
import { petsRoutes } from "../features/Pet Owner/pet details/pets.route";
import { marketplaceRoutes } from "@/features/Marketplace/marketplace.route";
import { aiAssistantRoutes } from "@/features/AiAssistance/aiAssistant.route";
// import { paymentRoutes } from "@/features/Payment/payment.routes";
import { selectPetRoutes } from "@/features/Pet Owner/SelectPet/selectPet.route";
import { petProfileRoutes } from "@/features/Pet Owner/pet profile/petProfile.route";
import { petOwnerDashboardRoutes } from "@/features/PetOwnerDashboard/petOwnerDashboard.route";
const Router = createBrowserRouter([
  ...LandingPageRoutes,
  ...AuthRouter,
  ...doctorAppointmentRoutes,
  ...doctorRoutes,
  ...doctorDashboardRoutes,
  ...adminRoutes,
  ...petsRoutes,
  ...marketplaceRoutes,
  ...aiAssistantRoutes,
    ...selectPetRoutes,
    ...petProfileRoutes,
    ...petOwnerDashboardRoutes,
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default Router;
````
