import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  service_name: process.env.SERVICE_NAME,
  default_pass: process.env.default_pass,
  jwt_access_secret: process.env.JWT_ACCESS_SECRETE,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRETE,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  super_admin_password: process.env.super_admin_password,
  salt_rounds: process.env.SALT_ROUNDS,

};

