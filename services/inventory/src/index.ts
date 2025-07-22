import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./utils/db";
import config from "./config";


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", service: config.service_name || "inventory" });
});

const port = process.env.PORT || 4000;
const serviceName = config.service_name || "inventory";

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`✅ ${serviceName} is running on port ${config.port}`);
  });
});
