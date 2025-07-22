import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Docker কন্টেইনারে সার্ভিস নাম ব্যবহার করুন (localhost নয়)
const INVENTORY_SERVICE_URL =
  process.env.INVENTORY_SERVICE_URL || 'http://inventory-service:4000';

app.use(cors());
app.use(morgan('dev'));

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'API Gateway running' });
});

// ✅ Proxy to inventory service
app.use(
  '/inventory',
  createProxyMiddleware({
    target: INVENTORY_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/inventory': '' },
  })
);

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});
