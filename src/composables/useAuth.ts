import { computed, ref } from "vue";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, KEEPME_LOGGED_IN } from "@/constants/configs";
import { login, register } from "@/services/authService";
import { useToast } from "vue-toastification";
import { AuthLoginRequestType, AuthRegisterRequestType } from "@/types/auth";

export function useAuth() {
  const toast = useToast();

  const token = ref<string | undefined>(Cookies.get(ACCESS_TOKEN));
  const user = ref<unknown | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const isAuthenticated = computed(() => !!token.value);

  const onLogin = async (credentials: AuthLoginRequestType) => {
    isLoading.value = true;
    error.value = null;
    try {
      await login(credentials);
      toast.success("Login successfully.");
    } catch (error: any) {
      error.value = error?.message || "Login services something wrong.";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  const onRegister = async (credentials: AuthRegisterRequestType) => {
    isLoading.value = true;
    error.value = null;
    try {
      await register(credentials);
      toast.success("Register successfully.");
    } catch (error: any) {
      error.value = error?.message || "Register services something wrong.";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  const onLogout = () => {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(KEEPME_LOGGED_IN);

    window.location.replace(window.location.origin + "/");
  };

  return {
    user,
    error,
    isAuthenticated,
    isLoading,
    onLogin,
    onLogout,
    onRegister,
  };
}
