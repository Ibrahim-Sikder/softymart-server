import express from 'express' ;
import morgan from 'morgan';
import cors from 'cors'
import { connectDB } from './src/app/utils/db';
import config from './src/config';

const app = express() 
app.use(cors()) 
app.use(express())
app.use(morgan('dev'))

app.get('/health', (_req, res)=>{
    res.status(200).json({status: 'ok', service:config.service_name || 'product'})
})

const serviceName = config.service_name || "inventory";

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`✅ ${serviceName} is running on port ${config.port}`);
  });
});
