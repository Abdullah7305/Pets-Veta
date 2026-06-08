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


