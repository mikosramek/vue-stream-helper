import io from 'socket.io-client';

class SocketClient {
  init = () => {
    this.socket = io('localhost:9999');
    this.socket.emit('handshake');
    return new Promise((res, rej) => {
      this.socket.on('returnedHandshake', res);
      setTimeout(() => {
        rej(new Error('Connection Timeout'));
      }, 4000);
    });
  }

  registerMessageHandler = (callback) => {
    this.socket.on('message', callback);
  }
}

export default SocketClient;
