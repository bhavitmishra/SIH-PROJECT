import express from "express";
import cors from "cors";
import axios from "axios"
import { ok } from "assert";
import { Parser } from "json2csv";
import FormData from "form-data";


const app = express();
app.use(cors());
app.use(express.json()); // NOW the body is readable

app.post("/dropzero_webhook", async(req, res) => {
  const payload = req.body;

  console.log(" Received payload from college server:");
  console.log(payload);
  const parser = new Parser();
  const csv = parser.parse(payload);

  console.log(csv);
  

 try {
 
const form = new FormData();
form.append("file", Buffer.from(csv), "students.csv");

const backendData = await axios.post(
  "http://localhost:2025/api/upload-students",
  form,
  { headers: form.getHeaders() }
);

  console.log("backendData status:", backendData.status);
  console.log("backendData data:", backendData.data);

  return res.json({ msg: "sucessfull" });
} catch (e: any) {
  console.log("❌ Error calling main backend:");
  console.log("status:", e?.response?.status);
  console.log("data:", e?.response?.data);
  return res.status(500).json({ msg: "failed to hit main backend" });
}
});

app.listen(3333, () => {
  console.log("🚀 Webhook listening on port 3333");
});
