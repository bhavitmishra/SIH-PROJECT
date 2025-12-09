"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const json2csv_1 = require("json2csv");
const form_data_1 = __importDefault(require("form-data"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // NOW the body is readable
app.post("/dropzero_webhook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const payload = req.body;
    console.log(" Received payload from college server:");
    console.log(payload);
    const parser = new json2csv_1.Parser();
    const csv = parser.parse(payload);
    console.log(csv);
    try {
        const form = new form_data_1.default();
        form.append("file", Buffer.from(csv), "students.csv");
        const backendData = yield axios_1.default.post("http://localhost:2025/api/upload-students", form, { headers: form.getHeaders() });
        console.log("backendData status:", backendData.status);
        console.log("backendData data:", backendData.data);
        return res.json({ msg: "sucessfull" });
    }
    catch (e) {
        console.log("❌ Error calling main backend:");
        console.log("status:", (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status);
        console.log("data:", (_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.data);
        return res.status(500).json({ msg: "failed to hit main backend" });
    }
}));
app.listen(3333, () => {
    console.log("🚀 Webhook listening on port 3333");
});
