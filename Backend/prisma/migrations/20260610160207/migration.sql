/*
  Warnings:

  - The `paymentStatus` column on the `Appointment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'SUCCEEDED';

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "AppointmentStatus" NOT NULL DEFAULT 'PENDING';
