export default {
  // 将商品添加到购物车
  addCartList({ state, commit }, payload) {
    return new Promise((reslove) => {
      let prodect = state.cartList.find((item) => item.iid === payload.iid);
      if (prodect) {
        // 同一商品点击多次加入购物车，只增加商品数量
        commit("ADDCOUNT", prodect);
        reslove("当前商品数量加1");
      } else {
        // 首次将一个商品加入购物车
        payload.count = 1;
        commit("ADDGOODS", payload);
        reslove("添加购物车成功！");
      }
    });
  },
  checkAllClick({ getters, commit }) {
    if (getters.isSelAll) {
      commit("NOCHECKALL");
    } else {
      commit("CHECKALL");
    }
  },
  // 在购物车内购买商品，加了一层判断
  buyInCart({ getters, dispatch }) {
    return new Promise((reslove, reject) => {});
  },
  // 商品购买（复用）
  buy({ state, commit, getters }) {
    return new Promise((reslove, reject) => {
      // 错误操作
      if (!getters.cartLeng) {
        reject("购物车空空如也");
      } else if (!getters.totalPrice) {
        reject("请选择购商品");
      } else {
        // reslove
        if (
          state.userInfo.balance >= getters.totalPrice &&
          state.userInfo.balance !== 0
        ) {
          commit("BUY", getters.totalPrice);
          reslove("购买成功！");
          // 向mutation提交选中的商品
          commit("DELGOODS", getters.delSel);
        } else {
          reject("余额不足！");
        }
      }
    });
  },

  // 测试操作
  addMoney({ commit }) {
    return new Promise((reslove) => {
      const money = Number((Math.random(1000) * 9999).toFixed(2));
      commit("ADDMONEY", money);
      reslove(money);
    });
  },
};
