import Ajv from "ajv";
import addFormats from "ajv-formats";
import { parseCSV } from "./utils/parseCsv";
import parseXLSX from "./utils/parseXLSX";
import { preValidateRow } from "./utils/preValidate";
import schema from "./schemas/student.schema.json";
import path from "path";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

export default async function validateFile(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();

  let rows = [];

  // 1) Parse depending on file type
  if (ext === ".csv") {
    rows = await parseCSV(filePath);
  } 
  else if (ext === ".xlsx") {
    rows = parseXLSX(filePath);
  } 
  else {
    throw new Error("Unsupported file format. Only CSV or XLSX allowed.");
  }

  const validData: any[] = [];
  const errors: any[] = [];
  let index = 1;

  // 2) Validate Each Row
  for (const row of rows) {
    // Pre-validate and sanitize values
    const { row: cleanedRow, errors: preErrors } = preValidateRow(row);

    // If pre-validation already fails badly, push error
    if (preErrors.length > 0) {
      errors.push({ row: index, data: cleanedRow, errors: preErrors });
      index++;
      continue;
    }

    // JSON Schema Validation
    const isValid = validate(cleanedRow);

    if (isValid) {
      validData.push(cleanedRow);
    } else {
      errors.push({
        row: index,
        data: cleanedRow,
        errors: validate.errors?.map((e) => e.message),
      });
    }

    index++;
  }

  return { validData, errors };
}
