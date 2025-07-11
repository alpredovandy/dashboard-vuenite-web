import { ref, onMounted, onUnmounted } from "vue";

export function useDesktop() {
  const isDesktop = ref(false);

  const checkScreenSize = () => {
    isDesktop.value = window.innerWidth >= 768;
  };

  onMounted(() => {
    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkScreenSize);
  });

  return { isDesktop };
}
