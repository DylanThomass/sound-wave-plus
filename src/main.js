import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router";
import { setupVant } from "./plugins/vant";
import "./assets/styles/index.scss";
import "./assets/styles/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/fonts.css";
import "./assets/styles/vant-custom.css"; // 引入自定义的 Vant 样式

// 开发环境下引入vconsole
if (process.env.NODE_ENV === "development") {
  const VConsole = require("vconsole");
  new VConsole();
}

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 配置Vant
setupVant(app);

app.use(pinia);
app.use(router);
app.mount("#app");
