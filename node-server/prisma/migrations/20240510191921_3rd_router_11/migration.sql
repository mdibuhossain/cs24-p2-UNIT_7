-- AlterTable
ALTER TABLE "collection_plan" ADD COLUMN     "contractorId" INTEGER;

-- AddForeignKey
ALTER TABLE "collection_plan" ADD CONSTRAINT "collection_plan_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
