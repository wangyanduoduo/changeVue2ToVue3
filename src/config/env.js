/*
 * @Author: wy
 * @Date: 2023-12-27 11:22:39
 * @LastEditors: wy
 * @LastEditTime: 2023-12-27 15:15:33
 * @FilePath: /笔记/changeVue2ToVue3/src/config/env.js
 * @Description:
 */
/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = "";
let routerMode = "hash";
let imgBaseUrl = "";

if (process.env.NODE_ENV == "development") {
  imgBaseUrl = "//elm.cangdu.org/img/";
  baseUrl = "//cangdu.org:8001";
} else if (process.env.NODE_ENV == "production") {
  baseUrl = "//elm.cangdu.org";
  imgBaseUrl = "//elm.cangdu.org/img/";
}

export { baseUrl, routerMode, imgBaseUrl };
