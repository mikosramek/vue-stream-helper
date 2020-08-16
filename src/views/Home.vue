<template>
  <div class="Home">
    <HomeHeader
      class="Home__header"
    />
    <div class="Home__dashboard">
      <ChatContainer
        class="Home__chat"
      />
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
  }
</style>
