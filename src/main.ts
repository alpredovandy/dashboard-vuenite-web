import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import { routes } from "./routes";
import "./index.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: import.meta.hot ? [] : routes,
});

if (import.meta.hot) {
  const removeRoutes = [];

  for (const route of routes) {
    removeRoutes.push(router.addRoute(route));
  }
}

app.use(Toast);
app.use(router);
app.mount("#app");
