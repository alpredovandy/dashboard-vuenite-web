import { ref, onMounted, onUnmounted } from "vue";

export function useScreen() {
  const isDesktop = ref(false);

  const checkScreenSize = () => {
    isDesktop.value = window.innerWidth >= 1024;
  };

  onMounted(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkScreenSize);
  });

  return { isDesktop };
}
