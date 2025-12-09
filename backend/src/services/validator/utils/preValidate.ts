import type { StudentRow } from "../types.js";

export const preValidateRow = (row: StudentRow) => {
    const errors: string[] = [];

    // Validate roll
    if (!row.roll_no || row.roll_no.trim() === "") {
        errors.push("Invalid roll number");
    }

    // Validate name
    if (!row.name || row.name.trim() === "" || typeof row.name !== "string") {
        errors.push("Invalid name");
    }

    // Validate attendance
    if(row.attendance === null || row.attendance === "" || row.attendance === undefined) {
        row.attendance = 0;
    }
    else {
        const attendanceNum = Number(row.attendance);
        if (isNaN(attendanceNum) || attendanceNum < 0 || attendanceNum > 100) {
            errors.push("Invalid attendance");
        } else {
            row.attendance = attendanceNum;
        }
    }

    // Validate marks
    if(row.marks === null || row.marks === "" || row.marks === undefined) {
        row.marks = 0;
    }
    else {
        const marksNum = Number(row.marks);
        if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
            errors.push("Invalid marks");
        } else {
            row.marks = marksNum;
        }
    }

    // Validate feesPaid
    // if(row.feesPaid === null || row.feesPaid === "" || row.feesPaid === undefined) {
    //     row.feesPaid = 0;
    // }
    // else {
    //     const feesPaidNum = Number(row.feesPaid);
    //     if (isNaN(feesPaidNum) || feesPaidNum < 0) {
    //         errors.push("Invalid fees paid");
    //     } else {
    //         row.feesPaid = feesPaidNum;
    //     }
    // }

    return { row, errors };
}