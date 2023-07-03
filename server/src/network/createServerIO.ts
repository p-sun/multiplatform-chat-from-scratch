import { Server } from 'socket.io';
import http from 'http';
import { Express } from 'express';

export function createServerIO(app: Express) {
  let server = http.createServer(app);
  let io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected to socket', socket.connected);

    socket.on('chat message', (msg, anotherSocketId) => {
      console.log('GOT chat message', msg, anotherSocketId);
      socket.emit('chat message', 'hello back from server!', socket.id);
    });

    socket.on('error', (err) => {
      if (err && err.message === 'unauthorized event') {
        socket.disconnect();
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected from socket');
    });
  });

  server.listen(8080, () => {
    console.log('Server socket is listening to on port', server.address());
  });

  return io;
}
