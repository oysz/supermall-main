<template>
  <div class="wrapper">
    <div class="clickAll">
      <check-btn :is-check="isSelAll" @click.native="isCheckAll" />
      <span class="small">全选</span>
    </div>
    <div class="totalPrice">
      <span class="small">合计：</span>
      <span
        >￥<span>{{ totalPrice }}</span></span
      >
    </div>
    <div class="goBuy" @click="goBuy">
      <span>去购买({{ totalNum }})</span>
    </div>
  </div>
</template>

<script>
import checkBtn from "@/components/content/checkbox/checkBtn.vue";
import CheckBtn from "../../../components/content/checkbox/checkBtn.vue";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "cartButtonBar",
  components: { checkBtn, CheckBtn },
  data() {
    return {};
  },
  activated() {},
  computed: {
    ...mapState(["cartList"]),
    ...mapGetters(["isSelAll", "totalPrice"]),

    totalNum() {
      // 返回勾选的总数
      return this.cartList.filter((item) => item.checked).length;
    },
  },
  methods: {
    ...mapActions(["checkAllClick"]),
    isCheckAll() {
      this.checkAllClick();
    },
    goBuy() {
      this.$emit("goBuy");
    },
  },
};
</script>

<style lang='less' scoped>
.wrapper,
.clickAll,
.totalPrice,
.goBuy {
  display: flex;
  align-items: center;
}
.wrapper {
  background-color: #fff;
  box-shadow: 0 -1px 5px 1px rgba(0, 0, 0, 0.186);
  div {
    height: 100%;
  }
  .clickAll {
    justify-content: center;
    height: auto;
    flex: 3;
    span {
      margin-left: 5px;
    }
  }
  .totalPrice {
    flex: 6;
    text-align: left;
    span:not(.small) {
      color: var(--color-high-text);
    }
  }
  .goBuy {
    flex: 3;
    justify-content: center;
    background-color: var(--color-tint);
    color: #fff;
  }
}
</style>
