import axios from 'axios';
import io from './io';

const OPTIONS_FILE_NAME = 'gw2-options.json';
const defaultOptions = {
  version: '0.0.1',
  apiKey: '',
  itemLimit: 5,
  commandKey: '!gw2',
};

const GuildWars = function () {
  this.name = 'Guild Wars 2';
  this.version = '0.0.1';
  this.commandList = {
    account: {
      endpoint: 'https://api.guildwars2.com/v2/account',
      function: () => this.getAccountDetails(),
    },
    buying: {
      endpoint: 'https://api.guildwars2.com/v2/commerce/transactions/current/buys',
      function: () => this.getCurrentTransactions('buying'),
    },
    selling: {
      endpoint: 'https://api.guildwars2.com/v2/commerce/transactions/current/sells',
      function: () => this.getCurrentTransactions('selling'),
    },
  };
  this.resolver = this.executeCall;
};

GuildWars.prototype.loadOptions = async function () {
  const data = await io.readFile(OPTIONS_FILE_NAME);
  if (data.version) {
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      this[key] = value;
    });
  } else {
    Object.entries(defaultOptions).forEach((entry) => {
      const [key, value] = entry;
      this[key] = value;
    });
  }
};

GuildWars.prototype.updateOptions = function (updateOptions) {

};

GuildWars.prototype.executeCall = function (call) {
  if (this.apiKey === null) return new Error('No API key provided for Guild Wars 2 Plugin. (GW2_API)');
  const command = this.commandList[call];
  if (command) {
    return command.function();
  }
  return new Error('Command does not exist.');
};

GuildWars.prototype.axios = function (endpoint) {
  return new Promise((res, rej) => {
    axios({
      method: 'GET',
      url: endpoint,
      dataResponse: 'json',
      params: {
        access_token: this.apiKey,
      },
    }).then((response) => {
      res(response.data);
    }).catch((e) => {
      rej(new Error(e.message));
    });
  });
};

GuildWars.prototype.getItemInformation = function (itemIDs) {
  const calls = [];
  for (let i = 0; i < Math.min(itemIDs.length, this.itemLimit); i += 1) {
    calls.push(this.axios(
      `https://api.guildwars2.com/v2/items/${itemIDs[i]}`,
    ));
  }
  return new Promise((res, rej) => {
    Promise.all(calls).then(res).catch(rej);
  });
};

GuildWars.prototype.getAccountDetails = async function () {
  try {
    const { name, created, commander } = await this.axios(this.commandList.account.endpoint);
    return `The account ${name} was created ${created} and they ${commander ? 'are' : 'are not'} a commander.`;
  } catch (error) {
    return new Error(error.message);
  }
};

function convertCoins(amount) {
  let leftovers = amount;
  const gold = Math.floor(amount / 10000);
  leftovers -= gold * 10000;
  const silver = Math.floor(leftovers / 100);
  leftovers -= silver * 100;
  const copper = leftovers;
  return `${gold}g, ${silver}s, ${copper}c`;
}
GuildWars.prototype.getCurrentTransactions = async function (type) {
  try {
    const items = await this.axios(this.commandList[type].endpoint);
    const ids = [];
    for (let i = 0; i < items.length; i += 1) {
      ids.push(items[i].item_id);
    }
    const itemInformation = await this.getItemInformation(ids);
    let response = `Currently ${type} ${items.length} items on the TP: `;
    for (let i = 0; i < itemInformation.length; i += 1) {
      const { price, quantity } = items[i];
      const { name } = itemInformation[i];
      response += `${quantity} ${name}${quantity > 1 ? 's' : ''} for ${convertCoins(price)} each | `;
    }
    return response;
  } catch (error) {
    return new Error(error.message);
  }
};

export default GuildWars;
