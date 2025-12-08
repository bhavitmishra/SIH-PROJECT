import xlsx from "xlsx";
import type { StudentRow } from "../types"; 

export default function parseXLSX(filePath: string) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error("No sheets found in uploaded file");
  }

  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" could not be read`);
  }

  const sheetData = xlsx.utils.sheet_to_json<StudentRow>(sheet);
  return sheetData;
}
