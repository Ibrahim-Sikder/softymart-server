import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./app/utils/db";
import config from "./app/config";
import { categoryRoutes } from "./app/modules/category/category.router";


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", service: config.service_name || "inventory" });
});
app.use("/api/v1/categories", categoryRoutes);

const port = process.env.PORT || 4000;
const serviceName = config.service_name || "inventory";

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`✅ ${serviceName} is running on port ${config.port}`);
  });
});
