/*
  Warnings:

  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserRole";

-- CreateTable
CREATE TABLE "User_Role" (
    "id" SERIAL NOT NULL,
    "title" "RoleType" NOT NULL DEFAULT 'UNASSIGNED',

    CONSTRAINT "User_Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Role_title_key" ON "User_Role"("title");
