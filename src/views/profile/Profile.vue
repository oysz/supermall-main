<template>
  <div class="proflie">
    <!-- navbar -->
    <nav-bar class="navbar">
      <div slot="center">个人中心</div>
    </nav-bar>
    <!-- 登录 -->
    <div class="userLogin">
      <img
        class="headImg"
        src="@/assets/img/profile/avatar.svg"
        @click="goLogin"
      />
      <div class="userbing">
        <div>
          <h3>测试账号</h3>
          <p>
            <span>
              <img src="@/assets/img/profile/phone.svg" />
            </span>
            暂无绑定手机号
          </p>
        </div>
        <div v-if="isMeet" class="addMoney" @click="gift">点击领取见面礼</div>
      </div>
    </div>
    <!-- balance -->
    <div class="userBalance">
      <div>
        <p>
          <span>{{ userInfo.balance.toFixed(2) }}</span
          >元
        </p>
        <p>我的余额</p>
      </div>
      <div>
        <p>
          <span>{{ userInfo.discount }}</span
          >个
        </p>
        <p>我的优惠</p>
      </div>
      <div>
        <p>
          <span>{{ userInfo.point }}</span
          >分
        </p>
        <p>我的积分</p>
      </div>
    </div>
    <!-- message -->
    <div class="userMsg">
      <div @click="toCart">
        <span><img src="../../assets/img/profile/cart.svg" alt="" /></span>
        <p>我的购物车</p>
      </div>
      <div class="split" @click="toMyGoods">
        <span><img src="../../assets/img/profile/shopping.svg" alt="" /></span>
        <p>
          已购商品<i v-if="getMyGoods">{{ getMyGoods }}</i>
        </p>
      </div>
      <div>
        <span><img src="../../assets/img/profile/message.svg" alt="" /></span>
        <p>我的消息</p>
      </div>
      <div>
        <span><img src="../../assets/img/profile/pointer.svg" alt="" /></span>
        <p>积分商城</p>
      </div>
      <div>
        <span><img src="../../assets/img/profile/vip.svg" alt="" /></span>
        <p>会员卡</p>
      </div>
    </div>
    <!-- 模态框 -->
    <totast v-if="isShowTotast" :msg="msg" />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import { showToast } from "@/common/mixin";
export default {
  components: { NavBar },
  mixins: [showToast],
  name: "Profile",
  data() {
    return {
      isMeet: !sessionStorage.getItem("isMeet"),
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapGetters(["getMyGoods"]),
  },
  methods: {
    ...mapActions(["addMoney"]),
    toCart() {
      this.$router.push("/cart");
    },
    goLogin() {
      this.$router.push("/login");
    },
    gift() {
      this.addMoney().then((res) => {
        this.msg = `成功领取${res}元！`;

        sessionStorage.setItem("balance", res);
        // console.log();

        this.toastMixin();
        // 数据本地化
      });
      this.isMeet = false;
      sessionStorage.setItem("isMeet", this.isMeet);
    },
    toMyGoods() {
      this.$router.push("/mygoods");
    },
  },
};
</script>

<style lang="less" scoped>
.proflie {
  height: 100vh;
  font-size: 13px;
  .navbar {
    position: relative;
    box-shadow: none;
  }
  .userLogin {
    display: flex;
    position: relative;
    top: -1px;
    background-color: var(--color-tint);
    padding: 20px;
    .headImg {
      flex: 2;
      width: 80px;
      height: 80px;
      margin-right: 10px;
    }
    .userbing {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      flex: 10;
      color: #fff;
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
          width: 20px;
          height: 20px;
        }
        h3 {
          font-weight: normal;
        }
      }
      .addMoney {
        box-shadow: 2px 2px 5px 2px rgba(224, 106, 95, 0.638);
        border-radius: 20px;
        padding: 10px;
      }
    }
  }
  .userBalance {
    display: flex;
    div {
      flex: 4;
      text-align: center;
      padding: 15px 10px;
      border-right: 1px solid #ccc;
      p {
        margin-bottom: 5px;
        span {
          font-size: 25px;
          font-weight: 550;
          color: rgb(224, 105, 95);
        }
      }
    }
  }
  .userMsg {
    border-top: 20px solid rgb(242, 242, 242);
    div {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      span {
        flex: 2;
        text-align: center;
        img {
          width: 23px;
          height: 25px;
        }
      }
      p {
        flex: 10;
      }
    }
    div.split {
      border-bottom: 20px solid rgb(242, 242, 242);
      i {
        padding: 1px 3px;
        background-color: red;
        color: #fff;
        border-radius: 100%;
      }
    }
  }
}
</style>