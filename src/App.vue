<template>
  <div class="App">
    <router-view v-if="hasInitiallyConnected" />
    <AppLoader v-else class="App__loader" />
    <ConnectionStatus :is-connected="isConnected" />
  </div>
</template>

<script>
import ConnectionStatus from './components/ConnectionStatus.vue';
import AppLoader from './components/AppLoader.vue';

export default {
  name: 'App',
  components: {
    AppLoader,
    ConnectionStatus,
  },
  data() {
    return {
      hasInitiallyConnected: false,
      isConnected: false,
    };
  },
  mounted() {
    this.connectToSocketServer();
  },
  methods: {
    async connectToSocketServer() {
      try {
        await this.$socket.init();
        this.$socket.registerDisconnectHandler(this.handleDisconnection);
        this.$socket.registerReconnectHandler(this.handleReconnection);
        this.isConnected = true;
        this.hasInitiallyConnected = true;
      } catch (error) {
        console.error(error.message);
      }
    },
    handleDisconnection() {
      this.isConnected = false;
    },
    handleReconnection() {
      this.isConnected = true;
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
.App {
  position: relative;
  &__loader {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
  }
}
</style>
