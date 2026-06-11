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
