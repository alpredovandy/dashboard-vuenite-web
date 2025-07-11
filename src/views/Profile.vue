<template>
  <div class="px-4">
    <profile-feature />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProfileFeature from "../features/Profile/index.vue";

export default defineComponent({
  name: "ProfilePage",
  components: { ProfileFeature },
});
</script>
