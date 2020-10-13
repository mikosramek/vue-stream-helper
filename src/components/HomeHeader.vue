<template>
  <div class="HomeHeader">
    <h1 class="HomeHeader__heading">
      {{ channel }}
    </h1>
  </div>
</template>

<script>
import { channelName } from '../settings.json';

export default {
  name: 'HomeHeader',
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
    padding: 5px 7px 5px;
    min-height: 45px;
    display: flex;
    align-items: flex-end;
    border-bottom: 1px solid $main-font;
    &__heading {
      margin: 0;
      @include gt-medium(24, 1, 1);
      color: $main-font;
    }
  }
</style>
