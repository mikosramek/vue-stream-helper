<template>
  <div class="Home">
    <HomeHeader
      class="Home__header"
    />
    <div class="Home__dashboard">
      <ChatContainer
        class="Home__chat"
      />
      <div class="Home__right-column">
        <button
          class="Home__options-button"
          @click="openOptions"
        >
          Options
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeader from '../components/HomeHeader.vue';
import ChatContainer from '../components/ChatContainer.vue';

export default {
  name: 'Home',
  components: {
    ChatContainer,
    HomeHeader,
  },
  methods: {
    openOptions() {
      this.$socket.openOptions();
    },
  },
};
</script>

<style lang="scss">
  @import '../Styles/global.scss';
  .Home {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: $main-background;
    &__dashboard {
      display: flex;
      align-items: center;
      flex-grow: 1;
    }
    &__chat {
      width: 40vw;
      height: 100%;
    }
    &__right-column {
      height: 100%;
    }
  }
</style>
