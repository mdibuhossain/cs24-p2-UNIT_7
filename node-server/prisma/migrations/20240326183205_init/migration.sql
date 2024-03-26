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

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "title" "RoleType" NOT NULL DEFAULT 'UNASSIGNED',

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_title_key" ON "UserRole"("title");
