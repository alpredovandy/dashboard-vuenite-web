<template>
  <header class="flex flex-row justify-between py-5 px-7">
    <logo />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Logo from "./icons/Logo.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  components: { Logo },
});
</script>
