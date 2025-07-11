<template>
  <div class="flex items-center justify-center px-4 min-h-[calc(75vh)]">
    <auth-feature />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthFeature from "../features/Auth/index.vue";

export default defineComponent({
  name: "AuthPage",
  components: { AuthFeature },
});
</script>
