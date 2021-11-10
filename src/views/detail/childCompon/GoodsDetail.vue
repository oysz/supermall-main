<template>
  <!-- 如果数据还没加载，就不显示，防止报错 -->
  <div class="itemInfo" v-if="Object.keys(goodsInfo).length !== 0">
    <h3 class="title">{{ goodsInfo.title }}</h3>
    <section class="price">
      <span class="realPrice">￥{{ goodsInfo.realPrice }}</span>
      <span class="oldPrice small">{{ goodsInfo.oldPrice }}</span>
      <span
        class="discount"
        :style="{ backgroundColor: goodsInfo.discountBgColor }"
        v-if="goodsInfo.discount"
        >{{ goodsInfo.discount }}</span
      >
    </section>
    <section class="otherInfo small">
      <span>{{ goodsInfo.columns[0] }}</span>
      <span>{{ goodsInfo.columns[1] }}</span>
      <span>{{ goodsInfo.services[0].name }}</span>
    </section>
    <section class="server">
      <span v-for="index in goodsInfo.services.length - 1" :key="index">
        <img :src="goodsInfo.services[index].icon" alt="" />{{
          goodsInfo.services[index].name
        }}
      </span>
    </section>
  </div>
</template>

<script>
export default {
  name: "GoodsDetail",
  props: ["goodsInfo"],
  data() {
    return {};
  },
  beforeMount() {
    // console.log(this.goodsInfo);
  },
  methods: {},
};
</script>

<style lang='less' scoped>
.itemInfo {
  padding: 10px;
  .price {
    position: relative;
    margin: 10px 0;
    .realPrice {
      font-size: 18px;
      font-weight: 550;
      color: var(--color-high-text);
    }
    .oldPrice {
      text-decoration: line-through;
      margin: 0 5px;
    }
    .discount {
      position: absolute;
      top: -5px;
      padding: 3px 5px;
      font-size: 10px;
      border-radius: 10px;
      color: #fff;
      // background-color: var(--color-tint);
    }
  }
  .otherInfo {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  .server {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 12px;
    margin-top: 10px;
    img {
      width: 15px;
    }
  }
}
</style>
