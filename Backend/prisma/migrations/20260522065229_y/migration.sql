/*
  Warnings:

  - Added the required column `fees` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "fees" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Doctor_userId_idx" ON "Doctor"("userId");

-- CreateIndex
CREATE INDEX "Doctor_specialization_idx" ON "Doctor"("specialization");

-- CreateIndex
CREATE INDEX "Doctor_fees_idx" ON "Doctor"("fees");

-- CreateIndex
CREATE INDEX "Doctor_isAvailable_idx" ON "Doctor"("isAvailable");

-- CreateIndex
CREATE INDEX "Doctor_specialization_fees_isAvailable_idx" ON "Doctor"("specialization", "fees", "isAvailable");

-- CreateIndex
CREATE INDEX "User_fullName_idx" ON "User"("fullName");
