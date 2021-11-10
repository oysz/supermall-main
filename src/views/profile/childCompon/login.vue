<template>
  <div class="loginBox" :style="{ backgroundColor: bg[nowIndex] }">
    <nav-bar class="navbar" :style="{ backgroundColor: bg[nowIndex] }">
      <div slot="center">无须登录</div>
    </nav-bar>
    <div class="text">
      <h1 class="small">一些测试功能在该路由组件内编写</h1>
      <hr />
      <div class="changeColor">
        <h3>变换背景色</h3>
        <div>
          <span
            @click="activeColor(index)"
            v-for="(item, index) in 6"
            :key="index"
          ></span>
        </div>
      </div>
      <hr />
      <div class="xuan">
        <button @click="onXuan">{{ timer ? "关闭" : "开启" }}xuan模式</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
export default {
  components: { NavBar },
  name: "login",
  data() {
    return {
      bg: ["yellow", "red", "blue", "green", "purple", "pink"],
      nowIndex: 0,
      timer: null,
    };
  },
  methods: {
    activeColor(index) {
      this.nowIndex = index;
    },
    onXuan() {
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.nowIndex >= this.bg.length - 1
            ? (this.nowIndex = 0)
            : this.nowIndex++;
          console.log(this.nowIndex);
        }, 10);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
  deactivated() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style lang='less' scoped>
.loginBox {
  height: 100vh;
  .navbar {
    position: relative;
  }
  .text {
    text-align: center;
    h1.small {
      width: 100%;
      text-align: center;
    }
    .changeColor {
      div {
        display: flex;
        justify-content: space-around;
        span {
          width: 50px;
          height: 50px;
        }
        span:nth-child(1) {
          background-color: yellow;
        }
        span:nth-child(2) {
          background-color: red;
        }
        span:nth-child(3) {
          background-color: blue;
        }
        span:nth-child(4) {
          background-color: green;
        }
        span:nth-child(5) {
          background-color: purple;
        }
        span:nth-child(6) {
          background-color: pink;
        }
      }
    }
    .xuan {
      button {
        padding: 10px;
      }
    }
  }
}
</style>
