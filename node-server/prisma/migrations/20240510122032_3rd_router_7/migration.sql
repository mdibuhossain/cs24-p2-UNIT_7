/*
  Warnings:

  - You are about to drop the column `collectionRoute` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfHire` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `paymentRatePerHour` on the `User` table. All the data in the column will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "collectionRoute",
DROP COLUMN "dateOfBirth",
DROP COLUMN "dateOfHire",
DROP COLUMN "jobTitle",
DROP COLUMN "paymentRatePerHour",
ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "Workfoce" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "dateOfHire" TIMESTAMP(3),
    "jobTitle" TEXT,
    "paymentRatePerHour" TEXT,
    "contact" TEXT,
    "collectionRoute" TEXT,
    "contractorManagerId" INTEGER,

    CONSTRAINT "Workfoce_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workfoce" ADD CONSTRAINT "Workfoce_contractorManagerId_fkey" FOREIGN KEY ("contractorManagerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
