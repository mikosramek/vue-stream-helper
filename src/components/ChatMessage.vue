<template>
  <div
    :style="rootStyle"
    class="ChatMessage"
  >
    <p
      :style="usernameStyle"
      class="ChatMessage__username"
    >
      {{ username }}:
    </p>
    <p class="ChatMessage__message">
      {{ msg }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: {
    color: {
      type: String,
      default: '#000000',
    },
    username: {
      type: String,
      default: '???',
    },
    mod: {
      type: Boolean,
      default: false,
    },
    subscriber: {
      type: Boolean,
      default: false,
    },
    number: {
      type: Number,
      required: true,
    },
    msg: {
      type: String,
      default: '',
    },
  },
  computed: {
    rootStyle() {
      return {
        backgroundColor: this.number % 2 === 0 ? '#222' : '#444',
      };
    },
    usernameStyle() {
      return {
        color: this.color,
      };
    },
  },
};
</script>

<style lang='scss'>
@import '../Styles/global.scss';
.ChatMessage {
  position: relative;
  display: flex;
  padding: 7px;
  align-items: flex-start;
  &__username,
  &__message {
    margin: 0;
  }
  &__username {
    margin-right: 5px;
    @include gt-medium(16, 1, 1);
  }
  &__message {
    margin-top: -0.02em;
    @include gt-light(14, 1, 1.3);
  }
}
</style>
