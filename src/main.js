/*
 * @Author: wy
 * @Date: 2023-12-27 11:22:39
 * @LastEditors: wy
 * @LastEditTime: 2023-12-27 15:53:48
 * @FilePath: /笔记/changeVue2ToVue3/src/main.js
 * @Description:
 */
import { createApp } from "vue";
import router from "./router/router";
import store from "./store";

import "./config/rem";

import App from "./App.vue";

createApp(App).use(router).use(store).mount("#app");
