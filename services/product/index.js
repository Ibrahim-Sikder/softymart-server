"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./src/app/config"));
const db_1 = require("./src/app/utils/db");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_1.default)());
app.use((0, morgan_1.default)('dev'));
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', service: config_1.default.service_name || 'product' });
});
const serviceName = config_1.default.service_name || "inventory";
(0, db_1.connectDB)().then(() => {
    app.listen(config_1.default.port, () => {
        console.log(`✅ ${serviceName} is running on port ${config_1.default.port}`);
    });
});
