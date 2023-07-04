import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { getMessagesFromConvo } from './src/network/queries';
import { connectDB } from './src/network/setupDB';
import { createServerIO } from './src/network/createServerIO';
import cors from 'cors';

const PORT = 8000;

dotenv.config();
const env = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const io = createServerIO(app);

app.get('/', (req, res) => {
  res.send({ hello: 'Express + TypeScript Server' });
});

app.get('/messages', (req, res) => {
  getMessagesFromConvo(
    typeof req.query.convoId === 'string' ? req.query.convoId : undefined
  )
    .then((messages) => {
      res.send({ messages });
      io.emit('message', req.body);
      console.log('GET /messages | success ', messages.length, 'messages');
    })
    .catch((error) => {
      console.log('GET /messages | error', error);
      res.json({ error: error.message });
    });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

connectDB(env.MONGODB_USER!, env.MONGODB_PASS!, env.MONGODB_DATABASE!).catch(
  console.dir
);
