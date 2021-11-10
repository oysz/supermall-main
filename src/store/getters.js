export default {
  // 获取购物车商品数量
  cartLeng(state) {
    return state.cartList.length;
  },
  isSelAll(state) {
    // 根据商品选中情况来决定是否全选
    if (state.cartList.length) {
      return state.cartList.every((item) => item.checked);
    }
    return false;
  },
  // 选中的商品（用于删除已买商品）
  delSel(state) {
    if (state.cartList.length) {
      return state.cartList.filter((item) => item.checked);
    }
  },
  // 购物车商品数量
  totalGoodsNum(state) {
    return state.cartList.reduce((pre, item) => {
      return parseInt(pre) + parseInt(item.count);
    }, 0);
  },
  // 选中商品总价
  totalPrice(state) {
    // 过滤器链式累加器实现勾选的总价
    return state.cartList
      .filter((item) => item.checked)
      .reduce((pre, item) => {
        // 保留两位小数点
        let priceAll = parseFloat(pre) + parseFloat(item.price * item.count);
        return priceAll.toFixed(2);
      }, 0);
  },

  // 获取已购商品数量
  getMyGoods(state) {
    return state.myGoods.reduce((pre, cur) => {
      return parseInt(pre) + parseInt(cur.length);
    }, 0);
  },
};
