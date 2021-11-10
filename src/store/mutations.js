export default {
  ADDCOUNT(state, payload) {
    payload.count++;
  },
  ADDGOODS(state, payload) {
    // 默认选中商品和全选
    payload.checked = true;
    state.cartList.push(payload);
    // 本地化数据
    sessionStorage.setItem("cartList", JSON.stringify(state.cartList));
  },
  CHECKED(state, payload) {
    // 选中商品取反
    payload.checked = !payload.checked;
  },
  CHECKALL(state) {
    // 全选 操作
    state.cartList.forEach((item) => (item.checked = true));
  },
  NOCHECKALL(state) {
    // 取消全选 操作
    state.cartList.forEach((item) => (item.checked = false));
  },
  //购买操作
  BUY(state, payload) {
    state.userInfo.balance -= payload;
  },
  DELGOODS(state, payload) {
    // 过滤掉传来的产品
    state.cartList = state.cartList.filter((item) => !payload.includes(item));
    // if(payload)
    // 将已经购买的商品存入已购数组内
    state.myGoods.push(payload);
    // 本地化数据
    sessionStorage.setItem("myGoods", JSON.stringify(state.myGoods));
  },
  // 测试操作

  // 领取见面礼
  ADDMONEY(state, payload) {
    state.userInfo.balance += payload;
  },
};
