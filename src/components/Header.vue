<template>
  <header class="flex flex-row justify-between py-5 px-7">
    <logo />
    <button
      v-if="isAuthenticated && isDesktop"
      class="flex hover:text-sky-600 items-center text-gray-700 hover:text-gray-900 ml-0 md:ml-4 text-sm md:text-base whitespace-nowrap gap-2"
      @click="onLogout"
    >
      <logout-icon class="w-5 h-5" />
      <span class="mr-2">Logout</span>
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LogOut as LogoutIcon } from "lucide-vue-next";

import { useAuth } from "@/composables/useAuth";
import { useDesktop } from "@/composables/useDesktop";

import Logo from "./icons/Logo.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  components: { Logo, LogoutIcon },
  setup() {
    const { isDesktop } = useDesktop();
    const { isAuthenticated, onLogout } = useAuth();

    return { isAuthenticated, onLogout, isDesktop };
  },
});
</script>
