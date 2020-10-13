<template>
  <div v-show="showConnection" class="ConnectionStatus">
    <span :class="statusClass"></span>
    {{ status }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ConnectionStatus',
  props: {
    isConnected: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isShowing: true,
    };
  },
  computed: {
    ...mapState({
      showConnection: (state) => state.showConnection,
    }),
    status() {
      return this.isConnected ? 'Connected' : 'Disconnected';
    },
    statusClass() {
      return [
        'ConnectionStatus__indicator',
        {
          'ConnectionStatus__indicator--live': this.isConnected,
        },
      ];
    },
  },
};
</script>

<style lang='scss'>
  @import '../Styles/global.scss';
  .ConnectionStatus {
    display: flex;
    align-items: center;
    @include gt-medium(16, 1, 1);
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: $main-font;
    padding: 5px 10px;
    border-radius: 15px;
    &__indicator {
      display: block;
      width: 15px;
      height: 15px;
      border-radius: 20px;
      margin-right: 5px;
      background-color: $offline-background;
      &--live {
        background-color: $live-background;
      }
    }
  }
</style>
