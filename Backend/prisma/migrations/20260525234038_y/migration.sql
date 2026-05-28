/*
  Warnings:

  - You are about to drop the column `degreeLicenseUrl` on the `Doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "degreeLicenseUrl";

-- CreateTable
CREATE TABLE "DoctorCertificate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "publicUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,

    CONSTRAINT "DoctorCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DoctorCertificate_userId_key" ON "DoctorCertificate"("userId");

-- AddForeignKey
ALTER TABLE "DoctorCertificate" ADD CONSTRAINT "DoctorCertificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
