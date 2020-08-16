<template>
  <div class="ChatContainer">
    <ChatMessage
      v-for="(message, index) of messages"
      :key="index"
      v-bind="message"
      :number="index"
    />
  </div>
</template>

<script>
import ChatMessage from './ChatMessage.vue';

export default {
  name: 'ChatContainer',
  components: {
    ChatMessage,
  },
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    this.$socket.registerMessageHandler(this.handleIncomingMessage);
    this.messages.push({
      color: '#D9876B',
      username: 'magicmiko2',
      mod: false,
      subscriber: false,
      msg: 'This is a test message',
    });
    this.messages.push({
      color: '#D9876B',
      username: 'magicmiko2',
      mod: false,
      subscriber: false,
      msg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus incidunt, labore! Aliquam placeat quas ratione reiciendis sed vel voluptates. Quae?',
    });

    // this.testInterval = setInterval(() => {
    //   this.messages.push({
    //     color: '#D9876B',
    //     username: 'magicmiko2',
    //     mod: false,
    //     subscriber: false,
    //     msg: 'This is a test message',
    //   });
    //   this.scrollChat();
    // }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.testInterval);
  },
  methods: {
    handleIncomingMessage({ context, msg }) {
      const {
        color, username, mod, subscriber,
      } = context;
      // const displayName = context['display-name'];
      this.messages.push({
        color,
        username,
        mod,
        subscriber,
        msg,
      });
      this.scrollChat();
    },
    scrollChat() {
      this.$nextTick(() => {
        this.$el.scrollTo(0, this.$el.scrollHeight);
      });
    },
  },
};
</script>

<style lang='scss'>
  @import '../Styles/global.scss';
  .ChatContainer {
    position: relative;
    color: $main-font;
    overflow-y: scroll;
    background-color: darken($main-background, 30);
  }
</style>
