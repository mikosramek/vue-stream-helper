<template>
  <div class="App">
    <router-view v-if="isConnected" />
    <AppLoader v-else class="App__loader" />
  </div>
</template>

<script>
import AppLoader from './components/AppLoader.vue';

export default {
  name: 'App',
  components: {
    AppLoader,
  },
  data() {
    return {
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
        this.isConnected = true;
      } catch (error) {
        console.error(error.message);
      }
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
