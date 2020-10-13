<template>
  <div class="Options">
    <h2 class="Options__heading">
      Options
    </h2>
    <ul class="Options__options-list">
      <li
        v-for="(optionGroup, index) of options"
        :key="index"
        class="Options__options-segment"
      >
        {{ optionGroup.name }} ||
        v{{ optionGroup.version }} ||
        {{ optionGroup.commandKey }} ||
        {{ optionGroup.commandList }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Options',
  data() {
    return {
      options: [],
    };
  },
  mounted() {
    this.getOptions();
  },
  methods: {
    async getOptions() {
      try {
        this.options = await this.$socket.getOptions();
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  metaInfo: {
    title: 'Options',
  },
};
</script>

<style lang='scss'>
  .Options {
    position: relative;
  }
</style>
