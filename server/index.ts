import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB, getAllMessages } from './src/database/database';
import bodyParser = require('body-parser');
import { Message } from './src/models/schemas';

const PORT = 8000;

dotenv.config();
const env = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.get('/messages', (req, res) => {
  getAllMessages().then((msgs) => {
    res.send({ messages: msgs });
  });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

connectDB(env.MONGODB_USER!, env.MONGODB_PASS!, env.MONGODB_DATABASE!).catch(
  console.dir
);
