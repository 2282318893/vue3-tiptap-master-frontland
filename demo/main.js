import {
    createApp
} from "vue";

import "@/styles/reset.scss";
import "@/styles/editor.scss";

import App from "./App.vue";
import AntdCom from "@/plugins/antd-vue";
import XTiptapPlugin from "@/index";

//引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入路由
import router from '@/router/index'

// 引入 pinia
import {
    createPinia
} from 'pinia'
const pinia = createPinia()

const app = createApp(App);
app.use(AntdCom).use(XTiptapPlugin).use(ElementPlus).use(router).use(pinia).mount("#app");