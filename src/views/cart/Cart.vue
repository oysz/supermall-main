<template>
  <div class="cart-box">
    <!-- 顶部navbar区 -->
    <nav-bar>
      <h4 slot="center">购物车({{ cartLeng }})</h4>
    </nav-bar>
    <scroll class="scrollWrapper">
      <div v-if="!cartList.length" class="box">购物车空空如也~</div>
      <!-- 商品列表 -->
      <cart-goods-item
        v-else
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      />
    </scroll>
    <!-- 底部商品汇总 -->
    <cart-button-bar class="btn-bar" @goBuy="goBuy" />

    <!-- 模态框 -->
    <totast v-if="isShowTotast" :msg="msg" />
  </div>
</template>

<script>
// 引入相关组件
import navBar from "@/components/common/navbar/NavBar.vue";
import cartGoodsItem from "./childCompon/cartGoodsItem.vue";
import cartButtonBar from "./childCompon/cartButtonBar.vue";
// 引入scroll插件
import Scroll from "@/components/common/scroll/Scroll.vue";

import { showToast } from "@/common/mixin";

import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "Cart",
  components: {
    navBar,
    cartGoodsItem,
    cartButtonBar,
    Scroll,
  },
  mixins: [showToast],
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    ...mapGetters(["cartLeng"]),
    ...mapState(["cartList"]),
  },
  methods: {
    ...mapActions(["buy"]),
    goBuy() {
      clearTimeout("timer");
      this.timer = setTimeout(() => {
        this.buy()
          .then((res) => {
            // 购买成功
            this.msg = res;
            this.toastMixin();
          })
          .catch((error) => {
            // 购买失败
            this.msg = error;
            this.toastMixin();
          });
      }, 500);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.cart-box {
  height: 100vh;
  .scrollWrapper {
    position: absolute;
    top: 44px;
    bottom: calc(49px + 49px);
    left: 0;
    right: 0;
    .box {
      text-align: center;
    }
  }
  .btn-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    height: 49px;
  }
}
</style>