"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // NOW the body is readable
app.post("/dropzero_webhook", (req, res) => {
    const payload = req.body;
    console.log("📩 Received payload from college server:");
    console.log(payload);
    return res.json({
        message: "JSON received successfully",
        count: Array.isArray(payload) ? payload.length : 1
    });
});
app.listen(3333, () => {
    console.log("🚀 Webhook listening on port 3333");
});
