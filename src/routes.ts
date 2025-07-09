import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import NotFound from "./views/NotFound.vue";

export const routes = [
  { path: "/", component: Login, meta: { title: "Login" } },
  { path: "/profile", component: Profile, meta: { title: "Profile" } },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    meta: { title: "Page not found" },
  },
];
