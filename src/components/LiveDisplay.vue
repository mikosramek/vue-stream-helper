<template>
  <div class="LiveDisplay">
    <p class="LiveDisplay__copy">
      live
    </p>
  </div>
</template>

<script>
export default {
  name: 'LiveDisplay',
};
</script>

<style lang='scss'>
  @import '../Styles/global.scss';
  .LiveDisplay {
    position: relative;
    @include gt-light(18, 1, 1);
    padding: 15px;
    background-color: $live-background;
    border-radius: 200px;
    &__copy {
      margin: 0;
      text-transform: uppercase;
      color: $main-font;
    }
  }
</style>
