/*
  Warnings:

  - The `kelas_semester` column on the `SKTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SKTM" DROP COLUMN "kelas_semester",
ADD COLUMN     "kelas_semester" INTEGER;
