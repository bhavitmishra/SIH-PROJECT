"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// webhook-server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // ✅ parse JSON body
app.post("/ietwebhook/attendance", (req, res) => {
    console.log("📩 Webhook received data:", req.body);
    // You could save this to DB, log it, or trigger other workflows
    res.json({ message: "✅ Webhook received successfully!" });
});
app.listen(3333, () => {
    console.log("🚀 Webhook server running on port 3333");
});
