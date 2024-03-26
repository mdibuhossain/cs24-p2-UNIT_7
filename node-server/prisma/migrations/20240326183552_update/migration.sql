/*
  Warnings:

  - You are about to drop the `User_Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User_Role";

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "title" "RoleType" NOT NULL DEFAULT 'UNASSIGNED',

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_title_key" ON "Role"("title");
