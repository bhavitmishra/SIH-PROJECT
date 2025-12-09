/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Enroll_no` on the `Student` table. All the data in the column will be lost.
  - Added the required column `enroll_no` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "Enroll_no",
ADD COLUMN     "enroll_no" TEXT NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("enroll_no");
