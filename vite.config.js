import vue from "@vitejs/plugin-vue";
import path from "node:path";

/** @type {import('vite').UserConfig} */
export default {
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
  },
};
