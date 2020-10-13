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

  openOptions = () => {
    this.socket.emit('openOptions');
  }

  getOptions = () => {
    console.info('Is connected?', this.isConnected());
    this.socket.emit('get:options');
    return new Promise((res, rej) => {
      this.socket.on('return:options', res);
      setTimeout(() => {
        rej(new Error('Connection Timeout'));
      }, 4000);
    });
  }

  registerFileHandler = (pluginName, updateHandler) => {
    this.socket.emit('registerFileReader', { optionsName: pluginName });
    this.socket.on(`${pluginName}:data`, updateHandler);
    const update = (newData) => {
      this.socket.emit(`${pluginName}:update`, newData);
    };
    const get = () => {
      this.socket.emit(`${pluginName}:get`);
    };
    return [get, update];
  }

  clearFileHandler = (pluginName) => {
    this.socket.off(`${pluginName}:data`, null);
  }

  isConnected = () => this.socket.connected

  registerDisconnectHandler = (callback) => this.socket.on('disconnect', callback)

  registerReconnectHandler = (callback) => this.socket.on('reconnect', callback)
}

export default SocketClient;
