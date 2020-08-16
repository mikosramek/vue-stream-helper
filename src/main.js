import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import SocketClient from './plugins/SocketClient';

Vue.config.productionTip = false;
Vue.use(SocketClient);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
