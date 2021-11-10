<template>
  <div class="wrapper">
    <nav-bar class="navbar">
      <div slot="left">
        <img src="@/assets/img/common/back.svg" @click="goBack" />
      </div>
      <div slot="center">已购商品</div>
    </nav-bar>
    <scroll class="goodsList">
      <div v-for="(item, index) in myGoods" :key="index">
        <div v-for="(item, index) in item" :key="index">
          <div class="goodsItem" @click="goDetail(item.iid)">
            <div class="top">
              <div>
                <img :src="item.shopImg" alt="" />
                <span>{{ item.shopName }}</span>
              </div>
              <span class="small">待发货</span>
            </div>
            <div class="bottom">
              <img :src="item.img" alt="" />
              <div class="titleBox">
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
              <div>
                <p class="small">
                  ￥<span>{{ item.price }}</span>
                </p>
                <p class="small">
                  共<span> {{ item.count }} </span>件
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import { goDetail } from "@/common/mixin";
import { mapState } from "vuex";
import Scroll from "@/components/common/scroll/Scroll.vue";
export default {
  components: { NavBar, Scroll },
  mixins: [goDetail],
  name: "myGoods",

  data() {
    return {};
  },
  computed: {
    ...mapState(["myGoods"]),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang='less' scoped>
.wrapper {
  background-color: #f4f4f4;
  height: 100vh;
  .navbar {
    background-color: #fff;
    text-align: center;
    box-shadow: 0 1px 5px 5px rgba(51, 51, 51, 0.118);
    div {
      color: rgb(51, 51, 51);
      img {
        width: 30px;
      }
    }
  }
  .goodsList {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 44px;
    left: 0;
    right: 0;
    div.goodsItem {
      padding: 10px;
      font-size: 16px;
      background-color: #fff;
      margin: 10px;
      border-radius: 10px;
      .top {
        display: flex;
        justify-content: space-between;
        div {
          img {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
        }
      }
      .bottom {
        display: flex;
        margin-top: 10px;
        img {
          width: 100px;
          height: 100px;
          border-radius: 10px;
        }
        div.titleBox {
          flex: 7;
          p.title {
            font-size: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          margin-left: 10px;
        }
        div:last-child {
          flex: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          text-align: center;
          p {
            span {
              color: red;
              font-size: 18px;
              font-weight: 550;
            }
          }
        }
      }
    }
  }
}
</style>
