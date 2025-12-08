import fs from "fs";
import csv from "csv-parser";
import type { StudentRow } from "../types";

export const parseCSV = (path: string): Promise<StudentRow[]> => {
  return new Promise((resolve, reject) => {
    const rows: StudentRow[] = [];

    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (data) => rows.push(data))
      .on("end", () => resolve(rows))
      .on("error", (err) => reject(err));
  });
};
