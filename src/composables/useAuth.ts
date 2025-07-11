import { computed, ref } from "vue";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, KEEPME_LOGGED_IN } from "@/constants/configs";
import { login, register } from "@/services/authService";
import { useToast } from "vue-toastification";
import { AuthLoginRequestType, AuthRegisterRequestType } from "@/types/auth";
import { isEmpty } from "@/utils";

export function useAuth() {
  const toast = useToast();

  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const isAuthenticated = computed(() => !isEmpty(Cookies.get(ACCESS_TOKEN)));

  const onLogin = async (credentials: AuthLoginRequestType) => {
    isLoading.value = true;
    error.value = null;
    try {
      await login(credentials);
      toast.success("Login successfully.");
    } catch (err: any) {
      error.value = err?.message || "Login failed.";
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
    } catch (err: any) {
      error.value = err?.message || "Register failed.";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  const onLogout = async () => {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(KEEPME_LOGGED_IN);
  };

  return {
    error,
    isAuthenticated,
    isLoading,
    onLogin,
    onLogout,
    onRegister,
  };
}
