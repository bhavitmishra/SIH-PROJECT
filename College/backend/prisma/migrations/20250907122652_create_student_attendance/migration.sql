-- CreateTable
CREATE TABLE "public"."StudentAttendance" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "attendance" INTEGER NOT NULL,

    CONSTRAINT "StudentAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentAttendance_id_key" ON "public"."StudentAttendance"("id");
