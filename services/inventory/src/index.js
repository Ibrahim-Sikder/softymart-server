"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./utils/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Health check
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "OK", service: process.env.SERVICE_NAME || "inventory" });
});
// Routes
// app.use("/api/inventory", inventoryRoutes);
// Database + Server
const port = process.env.PORT || 4000;
const serviceName = process.env.SERVICE_NAME || "inventory";
(0, db_1.connectDB)().then(() => {
    app.listen(port, () => {
        console.log(`✅ ${serviceName} is running on port ${port}`);
    });
});
