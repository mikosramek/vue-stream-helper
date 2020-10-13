<template>
  <div class="GuildWars2ItemGoalsItem">
    <img :src="item.icon" alt="" class="GuildWars2ItemGoalsItem__image">
    <div class="GuildWars2ItemGoalsItem__dark-overlay"></div>
    <p class="GuildWars2ItemGoalsItem__target">{{ item.target - item.current }}</p>
  </div>
</template>

<script>
export default {
  name: 'GuildWars2ItemGoalsItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang='scss'>
  @import '@/Styles/global.scss';
  .GuildWars2ItemGoalsItem {
    position: relative;
    height: 64px;
    width: 64px;
    &__image {
      position: relative;
      z-index: 1;
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
    }
    &__dark-overlay {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(black, 0.3);
    }
    &__target {
      margin: 0;
      position: absolute;
      bottom: 2px;
      right: 4px;
      z-index: 3;
      color: white;
      text-shadow: 0 2px 4px black;
      @include gt-medium(18, 0, 1);
    }
  }
</style>
