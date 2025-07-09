<template>
  <div class="flex flex-col">
    <div
      class="flex items-center justify-center h-fit md:h-[500px] lg:max-h-screen xl:h-fit overflow-hidden px-4"
    >
      <div class="w-full max-w-xl rounded-lg p-6 sm:p-8">
        <div class="flex flex-col items-center mb-[3.5em] text-center">
          <h1 class="text-3xl sm:text-4xl font-normal mb-4 text-gray-800">
            Welcome to <span class="font-bold">myApp</span>
          </h1>
          <div class="w-full sm:w-[14em] border-t-2 border-gray-600 mt-4" />
        </div>
        <FormLogin />
      </div>
    </div>
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
