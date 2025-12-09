/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attendance` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `marks` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `roll_no` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Student` table. All the data in the column will be lost.
  - The required column `id` was added to the `Student` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `instituteId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InstituteType" AS ENUM ('COLLEGE', 'SCHOOL', 'COACHING', 'POLYTECHNIC');

-- CreateEnum
CREATE TYPE "InstituteLevel" AS ENUM ('SEMESTER', 'CLASS', 'BATCH');

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "attendance",
DROP COLUMN "marks",
DROP COLUMN "roll_no",
DROP COLUMN "subject",
ADD COLUMN     "classId" TEXT,
ADD COLUMN     "currentLevel" INTEGER,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "instituteId" TEXT NOT NULL,
ADD COLUMN     "parentEmail" TEXT,
ADD COLUMN     "parentPhone" TEXT,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "InstituteName" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "type" "InstituteType" NOT NULL,
    "levelType" "InstituteLevel" NOT NULL,
    "levels" INTEGER NOT NULL,

    CONSTRAINT "InstituteName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instituteId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "instituteId" TEXT NOT NULL,
    "mentorId" TEXT,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "credit" INTEGER,
    "classId" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentor" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instituteId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProgress" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "marks" INTEGER,
    "attendance" INTEGER,
    "payment" BOOLEAN,

    CONSTRAINT "StudentProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_email_key" ON "Mentor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProgress_studentId_subjectId_level_key" ON "StudentProgress"("studentId", "subjectId", "level");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "InstituteName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "InstituteName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentor" ADD CONSTRAINT "Mentor_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "InstituteName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentor" ADD CONSTRAINT "Mentor_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "InstituteName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgress" ADD CONSTRAINT "StudentProgress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgress" ADD CONSTRAINT "StudentProgress_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
