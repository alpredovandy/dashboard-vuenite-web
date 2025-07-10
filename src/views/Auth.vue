<template>
  <AuthFeature />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthFeature from "../features/Auth/index.vue";

export default defineComponent({
  name: "AuthPage",
  components: { AuthFeature },
});
</script>
