/*
  Warnings:

  - You are about to drop the column `paymentRatePerHouse` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "paymentRatePerHouse",
ADD COLUMN     "paymentRatePerHour" DOUBLE PRECISION;
