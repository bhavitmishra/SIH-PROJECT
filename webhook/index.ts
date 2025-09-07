// webhook-server.ts
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // ✅ parse JSON body
// chwcking for a pull request
app.post("/ietwebhook/attendance", (req: Request, res: Response) => {
  console.log("📩 Webhook received data:", req.body);

  // You could save this to DB, log it, or trigger other workflows
  res.json({ message: "✅ Webhook received successfully!" });
});

app.listen(3333, () => {
  console.log("🚀 Webhook server running on port 3333");
});
