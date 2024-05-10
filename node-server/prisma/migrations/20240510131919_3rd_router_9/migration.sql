/*
  Warnings:

  - You are about to drop the column `reg_no` on the `sts_receives` table. All the data in the column will be lost.
  - Added the required column `vehicleType` to the `sts_receives` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sts_receives" DROP CONSTRAINT "sts_receives_reg_no_fkey";

-- AlterTable
ALTER TABLE "sts_receives" DROP COLUMN "reg_no",
ADD COLUMN     "vehicleType" TEXT NOT NULL;
