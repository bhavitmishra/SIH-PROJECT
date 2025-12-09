-- CreateTable
CREATE TABLE "Student" (
    "Enroll_no" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roll_no" TEXT,
    "attendance" TEXT,
    "marks" TEXT,
    "subject" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("Enroll_no")
);
