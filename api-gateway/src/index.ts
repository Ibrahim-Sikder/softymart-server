import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || 'http://product-service:4001';
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || 'http://user-service:4002';

app.use(cors());
app.use(morgan('dev'));

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'API Gateway running' });
});

// ✅ Proxy to product service
app.use(
  '/product',
  createProxyMiddleware({
    target: PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/product': '' },
  })
);
// ✅ Proxy to product service
app.use(
  '/user',
  createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/user': '' },
  })
);

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});
