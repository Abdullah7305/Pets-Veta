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