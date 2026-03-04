import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import SmartnessUi from "smartness-vue";
import App from "./App.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [{ path: "/", component: App }],
});

const app = createApp(App);
app.use(router);
app.use(SmartnessUi);
app.mount("#app");
