-- AlterEnum
ALTER TYPE "RoleType" ADD VALUE 'CONTRACTOR_MANAGER';

-- AlterTable
ALTER TABLE "Sts" ADD COLUMN     "fine" DOUBLE PRECISION,
ADD COLUMN     "lastHour" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "collectionRoute" TEXT,
ADD COLUMN     "contact" TEXT,
ADD COLUMN     "contractorId" INTEGER,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "dateOfHire" TIMESTAMP(3),
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "paymentRatePerHouse" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "sts_receives" (
    "id" SERIAL NOT NULL,
    "waste" INTEGER NOT NULL,
    "typeOfWaste" TEXT NOT NULL,
    "reg_no" INTEGER,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "stsId" INTEGER,
    "contractorId" INTEGER,

    CONSTRAINT "sts_receives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contractor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "tin" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "workforce" INTEGER NOT NULL,
    "paymentPerTon" INTEGER NOT NULL,
    "requiredWasteAmount" INTEGER NOT NULL,
    "contractDuration" INTEGER NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stsId" INTEGER,

    CONSTRAINT "Contractor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection_plan" (
    "id" SERIAL NOT NULL,
    "area" TEXT NOT NULL,
    "collectionStart" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "numberOfLabour" INTEGER NOT NULL,
    "numberofVans" INTEGER NOT NULL,
    "expectedWaste" INTEGER NOT NULL,

    CONSTRAINT "collection_plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_contractId_key" ON "Contractor"("contractId");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_registrationId_key" ON "Contractor"("registrationId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sts_receives" ADD CONSTRAINT "sts_receives_reg_no_fkey" FOREIGN KEY ("reg_no") REFERENCES "Vehicle"("reg_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sts_receives" ADD CONSTRAINT "sts_receives_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "Sts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sts_receives" ADD CONSTRAINT "sts_receives_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contractor" ADD CONSTRAINT "Contractor_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "Sts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
