<template>
  <div class="max-w-lg w-full">
    <div class="flex flex-col items-center mb-[3em] text-center">
      <h1 class="text-3xl sm:text-4xl font-normal mb-4 text-gray-800">
        Welcome to <span class="font-bold">myApp</span>
      </h1>
      <div class="w-full sm:w-[14em] border-t-2 border-gray-600 mt-1" />
    </div>
    <FormLogin />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormLogin from "./components/Form.vue";

export default defineComponent({
  name: "LoginFeature",
  components: { FormLogin },
});
</script>
