/*
  Warnings:

  - Added the required column `disciplineId` to the `teachersDisciplines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teachersDisciplines" ADD COLUMN     "disciplineId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
