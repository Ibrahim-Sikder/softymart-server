import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config";
import { userRoutes } from "./app/user/user.route";
import { teanentRoute } from "./app/tenant/tenant.route";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import timeout from 'connect-timeout';
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/v1/health", (_req, res) => {
  res
    .status(200)
    .json({ status: "ok", service: config.service_name || "user" });
});

app.use(timeout('10s'));

// Handle timeout errors
app.use((req, res, next) => {
  if (!req.timedout) next();
});


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tenant", teanentRoute);

app.use(globalErrorHandler);
app.use(notFound);

const serviceName = config.service_name || "user";

// connectDB().then(() => {
//   app.listen(config.port, () => {
//     console.log(`✅ ${serviceName} is running on port ${config.port}`);
//   });
// });
export default app;
