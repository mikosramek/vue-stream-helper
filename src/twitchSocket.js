import express from 'express';
import http from 'http';
import socket from 'socket.io';
import bodyParser from 'body-parser';
import tmi from 'tmi.js';
import { channelName } from './settings.json';
import fileIO from './Node/io';

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

const Socket = function (createSubWindow) {
  this.socket = null;
  this.client = null;
  this.room = null;
  this.roomCode = channelName;
  this.commands = {
    resolvers: {},
    pluginObjects: {},
  };
  this.registeredOptions = {};
  this.createSubWindow = createSubWindow;
};
Socket.prototype.init = function () {
  io.on('connection', (socket) => {
    socket.join(this.roomCode);
    console.info('Socket has connected.');

    socket.on('get:options', () => {
      console.log('Return options.');
      socket.emit('return:options', this.getLoadedPluginOptions());
    });
    socket.on('update:options', (updatedOptions) => {
      console.info('update:options', updatedOptions, 'twitchSocket.js@84');
    });
    socket.on('openOptions', () => {
      console.log('Creating option windows.');
      this.createSubWindow(500, 300, 'options');
    });

    socket.on('registerFileReader', (data) => {
      const { optionsName } = data;
      socket.on(`${optionsName}:update`, (newOptions) => {
        // write to file
        console.log(newOptions);
      });
      socket.on(`${optionsName}:get`, async () => {
        // get file
        const fileData = await fileIO.readFile(`${optionsName}.json`);
        socket.emit(`${optionsName}:data`, fileData);
      });
    });

    if (this.socket) {
      socket.emit('returnedHandshake');
      return;
    }
    this.socket = socket;
    socket.on('handshake', async () => {
      try {
        await this.clientInit();
        socket.emit('returnedHandshake');
      } catch (error) {
        console.error(error.message);
      }
    });
  });

  httpServer.listen(port, () => {
    console.info(`listening on *:${port}`);
  });
  this.client = new tmi.client(TWITCH_OPTIONS);
  this.client.on('message', (target, context, msg, self) => { this.onMessageHandler(target, context, msg, self); });
};
Socket.prototype.sendMessageToClient = function (context, msg) {
  if (this.socket) {
    io.to(this.roomCode).emit('message', { context, msg });
  }
};
Socket.prototype.clientInit = async function () {
  console.info(
    '*************\nConnect to: ',
    channelName,
    '\nBot username: ', process.env.BOT_USERNAME,
    '\n*************',
  );
  console.log(this.getLoadedPlugins());
  try {
    await this.client.connect();
  } catch (error) {
    console.error(error.message);
  }
};
Socket.prototype.onMessageHandler = function (target, context, msg, self) {
  this.sendMessageToClient(context, msg);
  if (self) return;
  const message = msg.split(' ');
  if (!this.commands[message[0]]) return;
  const key = message[0];
  // check for basic commands (ie !help)

  // check for advanced commands (ie !gw2 account)
  const command = message[1];
  this.handleCommand(target, key, command);
  //   .then((message) => {
  //   this.client.say(target, 'Message Received');
  // }).catch((error) => {
  //   this.client.say(target, error.message);
  // });
};

Socket.prototype.handleCommand = async function (target, key, command) {
  const func = (this.commands.resolvers[key]).bind(this.commands.pluginObjects[key]);
  try {
    const response = await func(command);
    console.log('response :', response, 'twitchSocket.js@127');
    this.client.say(target, response);
    return response;
  } catch (error) {
    return new Error(error);
  }
};

Socket.prototype.registerCommandPlugin = async function (Plugin) {
  const newPlugin = new Plugin();
  await newPlugin.loadOptions();
  if (!newPlugin.commandKey) return new Error('No commandKey string defined in plugin object.');
  if (!newPlugin.commandList) return new Error('No commandList object defined in plugin object.');
  if (!newPlugin.resolver) return new Error('No executeCommand function defined in plugin object.');
  this.commands[newPlugin.commandKey] = newPlugin.commandList;
  this.commands.resolvers[newPlugin.commandKey] = newPlugin.resolver;
  this.commands.pluginObjects[newPlugin.commandKey] = newPlugin;
  return true;
};

Socket.prototype.getLoadedPlugins = function () {
  return Object.entries(this.commands.pluginObjects).reduce((total, current) => `${total + current[1].name} `, 'Loaded plugins: ');
};

Socket.prototype.getLoadedPluginOptions = function () {
  console.info(this.commands.pluginObjects, 'twitchSocket.js@167');

  const pluginArray = Object.entries(this.commands.pluginObjects);
  return pluginArray.map(([key, value]) => {
    const {
      commandKey, name, version, commandList,
    } = value;
    return {
      name,
      commandKey,
      version,
      commandList,
    };
  });
};

export default Socket;
