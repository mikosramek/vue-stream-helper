import SocketClient from '../Utils/ServerIO';

export default {
  install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$socket = new SocketClient();
  },
};
