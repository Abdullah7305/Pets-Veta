/*
  Warnings:

  - You are about to drop the column `appointmentType` on the `PetIssueReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PetIssueReport" DROP COLUMN "appointmentType";

-- DropEnum
DROP TYPE "PatientAppointmentType";
