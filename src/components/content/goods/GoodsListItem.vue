<template>
  <div class="goodsItem" @click="goDetail(showIid)">
    <img v-lazy="showImg" :key="showImg" alt="" @load="imgLoad" />
    <div class="goodsBox">
      <p class="title">{{ goodsItem.title }}</p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="sale"><span class="small">已售</span>{{ showSale }}</span>
    </div>
  </div>
</template>

<script>
import { goDetail } from "@/common/mixin";
export default {
  name: "GoodsListItem",
  props: ["goodsItem"],
  mixins: [goDetail],
  data() {
    return {};
  },
  computed: {
    showIid() {
      return this.goodsItem.iid;
    },
    showImg() {
      return (
        // this.goodsItem.image ||
        this.goodsItem.img || this.goodsItem.show.img
      );
    },
    showSale() {
      return this.goodsItem.sale;
    },
  },
  methods: {
    // 解决图片刷新，来不及更新滑动高度bug
    imgLoad() {
      if (this.$route.path.includes("/home")) {
        this.$bus.$emit("homeItemImgLoad");
      } else if (this.$route.path.includes("/detail")) {
        this.$bus.$emit("detaliImgLoad");
      }
    },
  },
};
</script>

<style lang='less' scoped>
.goodsItem {
  width: 45%;
  margin: 8px 0;
  img {
    height: 85%;
    border-radius: 10px;
  }
  .goodsBox {
    text-align: center;
    color: var(--color-text);
    font-size: var(--font-size);
    .title {
      display: -webkit-box;
      margin: 5px 0;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .price {
      float: left;
      color: var(--color-high-text);
    }
    .sale {
      float: right;
    }
  }
}
</style>
