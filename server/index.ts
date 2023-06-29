import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/database';

dotenv.config();
const env = process.env;

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});
console.log('Directory', __dirname);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

connectDB(env.MONGODB_USER!, env.MONGODB_PASS!, env.MONGODB_DATABASE!).catch(
  console.dir
);
