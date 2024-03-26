/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `title` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "title",
ADD COLUMN     "title" "RoleList" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Role_title_key" ON "Role"("title");
