<template>
  <div class="HomeHeader">
    <h1 class="HomeHeader__heading">
      {{ channel }}
    </h1>
    <LiveDisplay class="HomeHeader__live"/>
  </div>
</template>

<script>
import { channelName } from '../settings.json';
import LiveDisplay from './LiveDisplay.vue';

export default {
  name: 'HomeHeader',
  components: {
    LiveDisplay,
  },
  computed: {
    channel() {
      return channelName;
    },
  },
};
</script>

<style lang='scss'>
  @import '../Styles/global.scss';
  .HomeHeader {
    position: relative;
    padding: 5px 7px 25px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $main-font;
    &__heading {
      margin: 0;
      @include gt-medium(24, 1, 1);
      color: $main-font;
    }
  }
</style>
