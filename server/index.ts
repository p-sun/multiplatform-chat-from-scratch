import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { getMessagesFromConvo } from './src/network/queries';
import { connectDB } from './src/network/setupDB';
import { createServerIO } from './src/network/createServerIO';

const PORT = 8000;

dotenv.config();
const env = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const io = createServerIO(app);

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.get('/messages', (req, res) => {
  console.log('request convoId', req.query.convoId);
  getMessagesFromConvo(
    typeof req.query.convoId === 'string' ? req.query.convoId : undefined
  )
    .then((msgs) => {
      res.send({ messages: msgs });
      io.emit('message', req.body);
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

connectDB(env.MONGODB_USER!, env.MONGODB_PASS!, env.MONGODB_DATABASE!).catch(
  console.dir
);
