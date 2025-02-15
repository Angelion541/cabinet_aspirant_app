import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST_RESOURCE,
  port: process.env.DB_PORT_RESOURCE,
  database: process.env.DB_NAME_RESOURCE,
  user: process.env.DB_USER_RESOURCE,
  password: process.env.DB_PASSWORD_RESOURCE,
});

export default { pool }