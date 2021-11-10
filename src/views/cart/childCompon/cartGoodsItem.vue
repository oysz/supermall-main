<template>
  <div class="wrapper">
    <div class="goods-wrapper">
      <check-btn :is-check="product.checked" @click.native="checkClick" />
      <div class="goodsImg" @click="goDetail(product.iid)">
        <img :src="product.img" alt="" />
      </div>
      <div class="goods-info" @click="goDetail(product.iid)">
        <p class="title">{{ product.title }}</p>
        <p class="desc">{{ product.desc }}</p>
        <div class="info_bottom">
          <span>￥{{ product.price }}</span>
          <span>X{{ product.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入相关组件
import checkBtn from "@/components/content/checkbox/checkBtn.vue";
import { goDetail } from "@/common/mixin";
export default {
  name: "cartGoodsItem",
  props: ["product"],
  mixins: [goDetail],
  components: {
    checkBtn,
  },
  data() {
    return {};
  },
  methods: {
    checkClick() {
      // 修改当前商品的是否选中状态
      this.$store.commit("CHECKED", this.product);
    },
  },
};
</script>

<style lang='less' scoped>
.goods-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 2px solid rgba(100, 100, 100, 0.2);
  .goodsImg {
    margin: 0 10px;
    img {
      width: 80px;
      height: 110px;
      border-radius: 5px;
    }
  }
  .goods-info {
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .title {
    }
    .desc {
      margin: 20px 0;
      font-size: 12px;
      color: rgb(160, 160, 160);
    }
    .info_bottom {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 20px;
      }
      span:first-child {
        color: var(--color-tint);
      }
      span:last-child {
        color: rgb(157, 77, 3);
      }
    }
  }
}
</style>
