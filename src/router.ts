import { createRouter, createWebHistory } from "vue-router";

import { useAuth } from "./composables/useAuth";

export const routes = [
  {
    path: "/",
    component: () => import("./views/Auth.vue"),
    meta: { title: "Login" },
  },
  {
    path: "/register",
    component: () => import("./views/Auth.vue"),
    meta: { title: "Register" },
  },
  {
    path: "/profile",
    component: () => import("./views/Profile.vue"),
    meta: { title: "Profile", requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("./views/NotFound.vue"),
    meta: { title: "Page not found", noAuth: true },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const { isAuthenticated } = useAuth();

  const initialAuthRoute = routes.find((r) => r.meta?.requiresAuth);
  const fallbackPath = initialAuthRoute ? initialAuthRoute.path : "/";

  if (to.meta.noAuth) {
    return next();
  }

  if (isAuthenticated.value) {
    // User is logged in: only allow routes with requiresAuth: true
    if (!to.meta.requiresAuth) {
      // Block access to routes that don't require auth
      return next({ path: `${fallbackPath}` }); // or any route you prefer
    }
  } else {
    // User not logged in: keep your existing logic (allow or redirect)
    if (to.meta.requiresAuth) {
      return next({ path: "/" }); // redirect to login/home
    }
  }
  // Otherwise, allow navigation
  next();
});
