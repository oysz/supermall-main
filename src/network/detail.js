import { request } from "./request";

// 请求商品接口
export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid,
    },
  });
}

//请求推荐商品
export function getRecommend(iid) {
  return request({
    url: "/recommend",
    params: {
      iid,
    },
  });
}

// 将商品基本信息过滤到类中
export class GoodsInfo {
  constructor(itemInfo, columns, services) {
    this.desc = itemInfo.desc;
    this.title = itemInfo.title;
    this.iid = itemInfo.iid;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.realPrice = itemInfo.lowNowPrice;
    this.discount = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.services = services;
  }
}

// 将店铺信息整合
export class shopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.cSells = shopInfo.cSells;
    this.cGoods = shopInfo.cGoods;
    this.score = shopInfo.score;
    this.cFans = shopInfo.cFans;
  }
}

// 参数整合
export class paramsInfo {
  constructor(info, rule) {
    if (info) {
      this.info = info.set;
    }
    if (rule) {
      this.rule = rule.tables[0];
    }
  }
}
