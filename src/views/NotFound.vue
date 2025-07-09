<template>
  <div class="prose max-w-none">
    <h1>Not Found.</h1>
    <p>
      You’ve landed on a URL that doesnt seem to exist. Return
      <router-link to="/"> home </router-link>.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
});
</script>

<style scoped>
h1 {
  margin-bottom: 0;
}
</style>
