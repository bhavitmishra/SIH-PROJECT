/*
  Warnings:

  - You are about to drop the `StudentAttendance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."StudentAttendance";

-- CreateTable
CREATE TABLE "public"."Student" (
    "Enroll_no" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "attendance" DOUBLE PRECISION NOT NULL,
    "marks" DOUBLE PRECISION NOT NULL,
    "roll_no" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("Enroll_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_Enroll_no_key" ON "public"."Student"("Enroll_no");
