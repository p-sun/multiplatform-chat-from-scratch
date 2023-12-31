import io from 'socket.io-client';
import { Message } from '../models/models';

export class SocketClient {
  socket = io('http://localhost:8080', {
    withCredentials: true,
    extraHeaders: {
      'my-custom-header': 'abcd',
    },
  });

  onMessage: (msg: Message) => void = () => {};

  getSocketId() {
    return this.socket.id;
  }

  constructor() {
    this.createClientIO();
  }

  private createClientIO() {
    this.socket.io.on('error', (error) => {
      console.log('SOCKET connection error', error);
    });

    this.socket.on('connect', () => {
      console.log('SOCKET connection success on socket.id', this.socket.id);
      this.socket.emit('chat message', { hello: 'world' }, this.socket.id);
    });

    this.socket.on('chat message', (msg, anotherSocketId) => {
      if (anotherSocketId !== this.socket.id) {
        this.onMessage(msg as Message);
      }
    });
  }
}
