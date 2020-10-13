import Vue from 'vue';
import VueMeta from 'vue-meta';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import SocketClient from './plugins/SocketClient';

Vue.config.productionTip = false;
Vue.use(SocketClient);
Vue.use(VueMeta);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
