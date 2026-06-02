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
