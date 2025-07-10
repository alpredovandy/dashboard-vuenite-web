<template>
  <div class="p-4 text-center">
    <h1 class="text-6xl font-bold text-neutral-600 mb-4">
      404
    </h1>
    <h2 class="text-2xl font-semibold mb-4">
      Page Not Found
    </h2>
    <p class="mb-6 text-gray-600 italic">
      Sorry, the page you're looking for doesn't exist.
    </p>
    <router-link
      to="/"
      class="inline-block px-6 py-2 border-2 border-neutral-600 text-neutral-600 font-semibold rounded-full hover:bg-neutral-50 transition"
    >
      Return to Home
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFoundPage",
});
</script>
