-- CreateTable
CREATE TABLE "PetPicture" (
    "id" TEXT NOT NULL,
    "publicUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "PetPicture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PetPicture" ADD CONSTRAINT "PetPicture_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
