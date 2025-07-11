import { createApp } from "vue";
import App from "./App.vue";
import { routes, router } from "./router";
import "./index.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp(App);

if (import.meta.hot) {
  const removeRoutes = [];

  for (const route of routes) {
    removeRoutes.push(router.addRoute(route));
  }
}

app.use(Toast, {
  timeout: 1500,
});
app.use(router);
app.mount("#app");
