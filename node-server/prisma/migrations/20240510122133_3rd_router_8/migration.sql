/*
  Warnings:

  - You are about to drop the `Workfoce` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workfoce" DROP CONSTRAINT "Workfoce_contractorManagerId_fkey";

-- DropTable
DROP TABLE "Workfoce";

-- CreateTable
CREATE TABLE "Workforce" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "dateOfHire" TIMESTAMP(3),
    "jobTitle" TEXT,
    "paymentRatePerHour" TEXT,
    "contact" TEXT,
    "collectionRoute" TEXT,
    "contractorManagerId" INTEGER,

    CONSTRAINT "Workforce_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workforce" ADD CONSTRAINT "Workforce_contractorManagerId_fkey" FOREIGN KEY ("contractorManagerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
