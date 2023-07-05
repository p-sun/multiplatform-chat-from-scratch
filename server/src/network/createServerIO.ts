import { Server } from 'socket.io';
import http from 'http';
import { Express } from 'express';
import { IMessage } from '../models/schemas';

export default class SocketServer {
  private socketChannel = 'chat message';
  private io: Server;

  constructor(app: Express) {
    this.io = this.createServerIO(app);
  }

  emitMessage(msg: IMessage, fromSocketId: String) {
    console.log('emit message', msg, fromSocketId);
    this.io.emit(this.socketChannel, msg, fromSocketId);
  }

  private createServerIO(app: Express) {
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
      console.log('A user connected to socket', socket.id);

      socket.on(this.socketChannel, (msg, anotherSocketId) => {
        console.log('GOT chat message', msg, anotherSocketId);
        // socket.emit(this.socketChannel, 'hello back from server!', socket.id);
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
}
