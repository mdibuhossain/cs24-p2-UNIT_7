/*
  Warnings:

  - Changed the type of `contractId` on the `Contractor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `registrationId` on the `Contractor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Contractor" DROP COLUMN "contractId",
ADD COLUMN     "contractId" INTEGER NOT NULL,
DROP COLUMN "registrationId",
ADD COLUMN     "registrationId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_contractId_key" ON "Contractor"("contractId");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_registrationId_key" ON "Contractor"("registrationId");
