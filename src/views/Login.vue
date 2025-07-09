<template>
  <LoginFeature />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginFeature from "../features/Login/index.vue";

export default defineComponent({
  name: "LoginPage",
  components: { LoginFeature },
});
</script>
