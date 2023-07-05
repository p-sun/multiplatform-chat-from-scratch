import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { createNewMessage, getMessagesFromConvo } from './src/network/queries';
import { connectDB } from './src/network/setupDB';
import SocketServer from './src/network/createServerIO';
import cors from 'cors';
import { IMessage } from './src/models/schemas';

const PORT = 8000;

dotenv.config();
const env = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const io = new SocketServer(app);

app.get('/', (req, res) => {
  res.send({ hello: 'Express + TypeScript Server' });
});

app.get('/messages', (req, res) => {
  getMessagesFromConvo(
    typeof req.query.convoId === 'string' ? req.query.convoId : undefined
  )
    .then((messages) => {
      console.log('GET /messages | success ', messages.length, 'messages');
      res.send({ messages });
    })
    .catch((error) => {
      console.error('GET /messages | error', error);
      res.json({ error: error.message });
    });
});

app.post('/messages', (req, res) => {
  console.log('POST /messages | body', req.body);
  createNewMessage(req.body)
    .then((message) => {
      console.log('POST /messages | success ', message);
      res.send({ newMessage: message });
      io.emitMessage(message, req.body.fromSocketId);
    })
    .catch((error) => {
      console.error('POST /messages | error', error);
      res.json({ error: error.message });
    });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

connectDB(env.MONGODB_USER!, env.MONGODB_PASS!, env.MONGODB_DATABASE!).catch(
  console.dir
);
