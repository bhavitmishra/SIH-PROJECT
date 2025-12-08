import Ajv from "ajv";
import csvParser from "csv-parser";
import { preValidateRow } from "./utils/preValidate.js";
import schema from "./schemas/student.schema.json"


const ajv = new Ajv();
const validate = ajv.compile(schema);