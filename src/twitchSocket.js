import express from 'express';
import http from "http";
import socket from 'socket.io';
import bodyParser from 'body-parser';
import tmi from 'tmi.js';
import { channelName } from './settings.json';

const expressApp = express();
const httpServer = http.createServer(expressApp);
const io = socket(httpServer, { serveClient: false }); /* eslint import/order: off */

const port = process.env.SERVER_PORT || 9000;

expressApp.use(bodyParser.json({ limit: '50mb' }));
expressApp.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
}));

expressApp.get('/', (req, res) => {
  res
    .status(200)
    .send({
      message: 'Socket server on.',
      port: `Server listening on port ${port}`,
      // body    : JSON.stringify(req.body, null, 2),
      // query   : JSON.stringify(req.query, null, 2)
    })
    .end();
});


// client.on('connected', onConnectedHandler);
// client.on('cheer', onCheerHandler);
// client.on('subscription', onSubscriptionHandler);



const TWITCH_OPTIONS = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [
    channelName,
  ],
};

const Socket = function() {
  this.socket = null;
  this.client = null;
}
Socket.prototype.init = function() {
  io.on('connection', (socket) => {
    this.socket = socket;
    socket.on('handshake', async () => {
      try {
        await this.clientInit();
        socket.emit('returnedHandshake');
      }
      catch (error) {
        console.error(error.message);
      }
    });
  });

  httpServer.listen(port, () => {
    console.info(`listening on *:${port}`);
  });
  this.client = new tmi.client(TWITCH_OPTIONS);
  this.client.on('message', (target, context, msg, self) => { this.onMessageHandler(target, context, msg, self) });
}
Socket.prototype.sendMessageToClient = function(context, msg) {
  if (this.socket) {
    this.socket.emit('message', { context, msg });
  }
}
Socket.prototype.clientInit = async function() {
  console.info(
    '*************\nConnect to: ',
    channelName,
    '\nBot username: ', process.env.BOT_USERNAME,
    '\n*************',
  );
  try {
    await this.client.connect();
  }
  catch (error) {
    console.error(error.message);
  }
}
Socket.prototype.onMessageHandler = function(target, context, msg, self) {
  this.sendMessageToClient(context, msg);
  console.info('context :', context, 'twitchSocket.js@94');
  if (self) return;
  this.client.say(target, 'Message Received');
}

export default Socket;
