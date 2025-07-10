import { computed, ref } from "vue";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/configs";
import { login, getAuthUser } from "@/services/authService";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export function useAuth() {
  const toast = useToast();
  const router = useRouter();

  const user = ref<unknown | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const isAuthenticated = computed(() => !!Cookies.get(ACCESS_TOKEN));

  const onLogin = async (credentials: {
    username: string;
    password: string;
    keepMeLogged: boolean;
  }) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await login(credentials);
      user.value = response;

      toast.success("Login successfully.");
      router.push("/profile");
    } catch (error: any) {
      error.value = error?.message || "Auth services something wrong.";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  const getUser = async () => {
    if (isAuthenticated.value) return;
    try {
      const response = await getAuthUser();
      user.value = response;
    } catch (err: any) {
      error.value = err.message || "Get user data something wrong.";
    }
  };

  return { isAuthenticated, user, error, isLoading, onLogin, getUser };
}
