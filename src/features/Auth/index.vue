<template>
  <div class="max-w-lg w-full">
    <div
      class="flex flex-col items-center mb-[2.5em] md:mb-[2em] text-center"
    >
      <h1
        class="text-3xl sm:text-4xl font-normal underline italic md:mb-4 text-gray-800"
      >
        Welcome to <span class="font-bold text-sky-600">myApp</span>
      </h1>
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
