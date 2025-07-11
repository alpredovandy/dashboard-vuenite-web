<template>
  <div class="my-10 md:my-6">
    <div
      class="grid grid-cols-1 md:grid-cols-[auto_1fr] items-start gap-y-8 md:gap-x-16"
    >
      <div class="space-y-6 md:space-y-8">
        <div>
          <label class="block text-base md:text-lg font-semibold text-gray-900">Home Address</label>
          <p class="text-gray-700 text-base md:text-lg italic">
            -
          </p>
        </div>
        <div>
          <label class="block text-base md:text-lg font-semibold text-gray-900">Country</label>
          <p class="text-gray-700 text-base md:text-lg italic">
            -
          </p>
        </div>
        <div>
          <label class="block text-base md:text-lg font-semibold text-gray-900">Date of Birth</label>
          <p class="text-gray-700 text-base md:text-lg italic">
            -
          </p>
        </div>
        <div>
          <label class="block text-base md:text-lg font-semibold text-gray-900">Gender</label>
          <p class="text-gray-700 text-base md:text-lg italic">
            -
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Additional",
});
</script>
