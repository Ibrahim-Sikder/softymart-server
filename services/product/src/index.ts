import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { productRoutes } from './app/route';
import config from './config';
import { connectDB } from './app/utils/db';
import { connectRabbitMQ } from './config/rabbitmq';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: config.service_name || 'product' });
});
app.use('/api/v1/', productRoutes)
const serviceName = config.service_name || 'product';

async function startServer() {
  try {

    await connectRabbitMQ();
    await connectDB();
    app.use('/api/v1/product', productRoutes);

    app.listen(config.port, () => {
      console.log(`✅ ${serviceName} is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('❌ Service Startup Failed:', error);
    process.exit(1);
  }
}

startServer();
