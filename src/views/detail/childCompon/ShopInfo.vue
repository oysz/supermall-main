<template>
  <div class="shopInfo">
    <div class="shopName">
      <img :src="shopInfo.logo" alt="" />
      <span>{{ shopInfo.name }}</span>
      <span class="small"
        >粉丝数：<span>{{ shopInfo.cFans }}</span></span
      >
    </div>
    <div class="infoBox">
      <div class="left">
        <span>
          <p>{{ totalSell }}</p>
          <p>总销量</p>
        </span>
        <span>
          <p>{{ shopInfo.cGoods }}</p>
          <p>全部宝贝</p>
        </span>
      </div>
      <div class="right">
        <p v-for="(item, index) in shopInfo.score" :key="index">
          {{ item.name }}
          <span class="point" :class="{ better: item.isBetter }">
            {{ item.score }}
          </span>
          <span class="level" :class="{ betterLevel: item.isBetter }">
            {{ item.isBetter ? "高" : "低" }}
          </span>
        </p>
      </div>
      <div class="bottom">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopInfo",
  props: ["shopInfo"],
  data() {
    return {};
  },
  computed: {
    // 销量格式化
    totalSell() {
      const sell = this.shopInfo.cSells;
      const sellFormat =
        parseInt(sell / 10000) + "." + parseInt((sell % 10000) / 1000) + "w";

      return sell > 10000 ? sellFormat : sell;
    },
  },
  methods: {},
};
</script>

<style lang='less' scoped>
.shopInfo {
  padding: 10px;
  border-top: 5px solid rgb(220, 220, 220);
  border-bottom: 5px solid rgb(220, 220, 220);
  .shopName {
    position: relative;
    img {
      width: 50px;
    }
    span {
      margin-left: 10px;
      font-size: 16px;
    }
    span.small {
      position: absolute;
      font-size: 12px;
      bottom: 0;
      right: 5%;
      span {
        color: var(--color-tint);
      }
    }
  }
  .infoBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin: 10px 0;
    .left {
      display: flex;
      width: 50%;
      justify-content: center;
      span {
        p:first-child {
          font-size: 16px;
          padding-bottom: 10px;
          color: rgb(0, 0, 0);
        }
        margin-right: 20px;
      }
    }
    .right {
      width: 45%;
      p {
        margin-bottom: 10px;
        .better {
          color: var(--color-tint) !important;
        }
        span.point {
          margin: 0 5px;
          color: rgb(7, 163, 7);
        }

        span.level {
          float: right;
          color: #fff;
          padding: 2px;
          background-color: rgb(7, 163, 7);
        }
        .betterLevel {
          background-color: var(--color-tint) !important;
        }
      }
    }
    .bottom {
      padding: 8px 40px;
      margin-top: 10px;
      border-radius: 10px;
      background-color: rgb(242, 245, 252);
    }
  }
}
</style>
