import io from 'socket.io-client';

export function createClientIO() {
  const socket = io('http://localhost:8080', {
    withCredentials: true,
    extraHeaders: {
      'my-custom-header': 'abcd',
    },
  });
  socket.io.on('error', (error) => {
    console.log('SOCKET connection error', error);
  });

  socket.on('connect', () => {
    console.log('SOCKET connection success on socket.id', socket.id);
    socket.on('data', (data) => {
      console.log('Got data', data);
    });
    socket.emit('chat message', { hello: 'world' }, socket.id);

    socket.on('chat message', (msg, anotherSocketId) => {
      console.log('GOT chat message', msg, anotherSocketId);
    });
  });
}
