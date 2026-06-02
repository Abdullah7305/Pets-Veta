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
