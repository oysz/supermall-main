<template>
  <div class="bottomBar">
    <div class="left">
      <span>
        <span class="icon"> </span>
        <span>客服</span>
      </span>
      <span>
        <span class="icon"> </span>
        <span>店铺</span>
      </span>
      <span class="cart" @click="toCart">
        <div>
          <img src="../../../assets/img/tabbar/shopcart.svg" />
          <i class="badge" v-if="cartBadge">{{ cartBadge }}</i>
        </div>
        <span>购物车</span>
      </span>
    </div>
    <div class="right">
      <span class="cart" @click="addCart">加入购物车</span>
      <span class="buy" @click="buyNow">购买(未开发)</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DetailBottomBar",
  data() {
    return {
      // isCurrent: false,
    };
  },
  computed: {
    ...mapGetters({ cartBadge: "totalGoodsNum" }),
  },
  methods: {
    toCart() {
      // this.isCurrent = !this.isCurrent;
      this.$router.push("/cart");
    },
    // 将商品添加到购物车
    addCart() {
      this.$emit("addCart");
    },
    // 立即购买
    buyNow() {
      this.$emit("buyNow");
    },
  },
};
</script>

<style lang='less' scoped>
.bottomBar {
  position: fixed;
  display: flex;
  height: 55px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-background);
  z-index: 2;

  .left,
  .right {
    display: flex;
    flex: 1;
    text-align: center;
    span {
      display: block;
      flex: 1;
    }
  }
  .left {
    .cart {
      position: relative;
      top: 9px;
      div {
        width: 30px;
        margin: 0 auto;
        img {
          width: 30px;
          height: 30px;
        }
        .badge {
          position: absolute;
          top: -7px;
          padding: 1px 3px;
          border-radius: 100%;
          color: #fff;
          background-color: red;
        }
      }
    }
    span.icon {
      display: inline-block;
      margin: 3px 0;
      width: 30px;
      height: 30px;
      background: url("~@/assets/img/detail/detail_bottom.png") no-repeat;
      background-size: 90%;
    }
    span:first-child > span.icon {
      background-position: 0 -60px;
    }
    span:nth-child(2) > span.icon {
      background-position: 0 -115px;
    }
  }
  .right {
    span {
      font-size: 17px;
      line-height: 55px;
    }
    span.cart {
      background-color: rgb(255, 221, 16);
    }
    span.buy {
      background-color: rgb(123, 63, 74);
      color: #fff;
    }
  }
}
</style>
