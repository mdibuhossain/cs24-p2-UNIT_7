-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('UNASSIGNED', 'SYSTEM_ADMIN', 'STS_MANAGER', 'LANDFILL_MANAGER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200),
    "email" VARCHAR(200) NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "RoleType" NOT NULL DEFAULT 'UNASSIGNED',
    "stsId" INTEGER,
    "landfillId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "title" "RoleType" NOT NULL DEFAULT 'UNASSIGNED',

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "reg_no" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "loaded_cost" INTEGER NOT NULL,
    "unloaded_cost" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sts" (
    "id" SERIAL NOT NULL,
    "ward" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Landfill" (
    "id" SERIAL NOT NULL,
    "capacity" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Landfill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sts_vehicle_record" (
    "id" SERIAL NOT NULL,
    "waste" INTEGER NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "stsId" INTEGER,
    "reg_no" INTEGER,

    CONSTRAINT "sts_vehicle_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dump_record" (
    "id" SERIAL NOT NULL,
    "weight" INTEGER NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "landfillId" INTEGER,
    "vehicleId" INTEGER,
    "stsId" INTEGER,

    CONSTRAINT "dump_record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_title_key" ON "Role"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_reg_no_key" ON "Vehicle"("reg_no");

-- CreateIndex
CREATE UNIQUE INDEX "Sts_ward_key" ON "Sts"("ward");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "Sts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_landfillId_fkey" FOREIGN KEY ("landfillId") REFERENCES "Landfill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sts_vehicle_record" ADD CONSTRAINT "sts_vehicle_record_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "Sts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sts_vehicle_record" ADD CONSTRAINT "sts_vehicle_record_reg_no_fkey" FOREIGN KEY ("reg_no") REFERENCES "Vehicle"("reg_no") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dump_record" ADD CONSTRAINT "dump_record_landfillId_fkey" FOREIGN KEY ("landfillId") REFERENCES "Landfill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dump_record" ADD CONSTRAINT "dump_record_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dump_record" ADD CONSTRAINT "dump_record_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "Sts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
