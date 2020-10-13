import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showConnection: true,
  },
  mutations: {
    setConnectionShow(state, newState) {
      state.showConnection = newState;
    },
  },
  actions: {
  },
  modules: {
  },
});
