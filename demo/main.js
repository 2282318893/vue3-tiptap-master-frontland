import { createApp } from "vue";

import "@/styles/reset.scss";
import "@/styles/editor.scss";

import App from "./App.vue";
import AntdCom from "@/plugins/antd-vue";
import XTiptapPlugin from "@/index";

//引入element plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 引入路由
import router from "@/router/index";

// 引入 pinia
import { createPinia } from "pinia";

// 引入图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

//vuex
import store from "@/store.js";

import "@/assets/icon-font/iconfont.css";
import "@/assets/icon-font/iconfont.css";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import i18n from "@/i18n.js";

const pinia = createPinia();

const app = createApp(App);
app
	.use(AntdCom)
	.use(XTiptapPlugin)
	.use(ElementPlus)
	.use(router)
	.use(pinia)
	.use(store)
	.use(VueViewer)
	.use(i18n)
	.mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
