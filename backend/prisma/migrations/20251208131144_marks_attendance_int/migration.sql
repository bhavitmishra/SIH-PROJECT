/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `enroll_no` on the `Student` table. All the data in the column will be lost.
  - The `attendance` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `marks` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `Enroll_no` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "enroll_no",
ADD COLUMN     "Enroll_no" TEXT NOT NULL,
DROP COLUMN "attendance",
ADD COLUMN     "attendance" INTEGER,
DROP COLUMN "marks",
ADD COLUMN     "marks" INTEGER,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("Enroll_no");
