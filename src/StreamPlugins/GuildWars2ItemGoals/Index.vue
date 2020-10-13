<template>
  <div :style="columnStyling" class="GuildWars2ItemGoalsIndex">
    <GuildWars2ItemGoalsItem
      v-for="(item, index) of itemList" :key="index"
      :item=item
      :style="itemStyling"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import itemData from '../../data/tpItemsOrganized.json';
import GuildWars2ItemGoalsItem from '../../components/GuildWars2ItemGoalsItem.vue';

export default {
  name: 'GuildWars2ItemGoalsIndex',
  components: { GuildWars2ItemGoalsItem },
  data() {
    return {
      items: [
        {
          id: 19976,
          target: 99,
          current: 0,
        },
        {
          id: 19976,
          target: 99,
          current: 0,
        },
        {
          id: 19976,
          target: 99,
          current: 0,
        },
        {
          id: 19976,
          target: 99,
          current: 0,
        },
        {
          id: 44941,
          target: 12000,
          current: 800,
        },
        {
          id: 44941,
          target: 12000,
          current: 800,
        },
        {
          id: 44941,
          target: 12000,
          current: 800,
        },
        {
          id: 19976,
          target: 99,
          current: 0,
        },
      ],
      options: {
        columns: 2,
        spacing: 5,
      },
    };
  },
  computed: {
    itemList() {
      return this.items.map((item) => {
        const { id } = item;
        const data = itemData[id];
        return {
          ...item,
          ...data,
        };
      });
    },
    columnStyling() {
      return {
        width: `${64 * this.options.columns + this.options.spacing * 2}px`,
        left: `${this.options.spacing}px`,
        top: `${this.options.spacing}px`,
      };
    },
    itemStyling() {
      const size = `calc(${100 / this.options.columns}% - ${this.options.spacing}px)`;
      return {
        width: size,
        marginRight: `${this.options.spacing}px`,
        marginBottom: `${this.options.spacing}px`,
      };
    },
  },
  mounted() {
    this.getGoalData();
    this.setConnectionShow(false);
  },
  beforeDestroy() {
    this.$socket.clearFileHandler();
  },
  methods: {
    ...mapMutations([
      'setConnectionShow',
    ]),
    async getGoalData() {
      const [get, update] = this.$socket.registerFileHandler('gw2Goals', this.handleOptionsUpdate);
      this.getData = get;
      this.updateData = update;
      this.getData();
    },
    handleOptionsUpdate(data) {
      if (Object.entries(data).length === 0) {
        this.updateData(this.items);
      } else {
        this.items = data;
      }
    },
    saveOptions() {
      // get updated info
      this.updateData(this.options);
    },
  },
};
</script>

<style lang='scss'>
  .GuildWars2ItemGoalsIndex {
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }
</style>
