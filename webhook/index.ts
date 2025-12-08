import express from "express";
import cors from "cors";
import axios from "axios"
import { ok } from "assert";
const app = express();
app.use(cors());
app.use(express.json()); // NOW the body is readable

app.post("/dropzero_webhook", async(req, res) => {
  const payload = req.body;

  console.log("📩 Received payload from college server:");
  console.log(payload);

  try {
    if(!payload)
    {
      return res.json({
        msg : "invalid data"
      });

    }
    const backendData = await axios.post("http://localhost:2025/api/v1/webhook_catcher/" , payload);
    if(backendData)
    {
      return res.json({
        msg : "sucessfull"
      })
    }
  } catch (e) {
    console.log(e , "Error caught");
  }

  return res.json({
    message: "JSON received successfully",
    count: Array.isArray(payload) ? payload.length : 1
  });
});

app.listen(3333, () => {
  console.log("🚀 Webhook listening on port 3333");
});
