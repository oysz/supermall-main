<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="item"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: ["goods"],
  data() {
    return {
      // goods: this.goods,
    };
  },
  watch: {
    goods: {
      immediate: true,
      handler() {
        // console.log(this.goods);
      },
    },
  },
  methods: {},
};
</script>

<style lang='less' scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0 10px 0;
  justify-content: space-around;
}
</style>
