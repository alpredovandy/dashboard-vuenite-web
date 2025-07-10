<template>
  <div class="spinner">
    <!-- You can customize the spinner here -->
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="#888"
        stroke-width="5"
        fill="none"
        stroke-linecap="round"
        stroke-dasharray="31.415, 31.415"
        stroke-dashoffset="0"
        transform="rotate(-90 25 25)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadSpinner",
});
</script>

<style>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
