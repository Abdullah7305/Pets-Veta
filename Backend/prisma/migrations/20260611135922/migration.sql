/*
  Warnings:

  - A unique constraint covering the columns `[doctorId,startTime]` on the table `DoctorSchedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DoctorSchedule_doctorId_startTime_key" ON "DoctorSchedule"("doctorId", "startTime");
