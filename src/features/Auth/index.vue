<template>
  <div class="max-w-lg w-full">
    <div class="flex flex-col items-center mb-[4em] text-center">
      <h1 class="text-3xl sm:text-4xl font-normal mb-4 text-gray-800">
        Welcome to <span class="font-bold text-sky-600">myApp</span>
      </h1>
      <div class="w-full sm:w-[14em] border-t-2 border-gray-600 mt-1" />
    </div>
    <auth-form :mode="mode" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

import AuthForm from "../Auth/components/Form.vue";

export default defineComponent({
  name: "AuthFeature",
  components: { AuthForm },
  setup() {
    const route = useRoute();

    const mode = computed(() => {
      const path = route.path;

      if (path.includes("register")) return "register";
      // Default to login if not register
      return "login";
    });

    return { mode };
  },
});
</script>
