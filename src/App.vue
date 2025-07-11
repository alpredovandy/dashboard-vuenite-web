<template>
  <div
    class="min-h-screen min-w-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex flex-col"
  >
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <div class="flex-1">
      <router-view />
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  components: { Header, Footer },
});
</script>
