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
