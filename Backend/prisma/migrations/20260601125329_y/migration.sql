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
