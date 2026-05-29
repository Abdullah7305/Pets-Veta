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

    console.log("⏳ Injecting 500 mock doctors into PostgreSQL...");

    for (let i = 1; i <= 500; i++) {
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




// giveDoctorState()
//     .then((mesg) => {
//         console.log("Pending Doctors are", mesg);
//     })

