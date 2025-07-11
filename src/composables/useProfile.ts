import { ref } from "vue";
import { useToast } from "vue-toastification";

import {
  getProfile as getUserProfile,
  updateProfile,
} from "@/services/userService";
import { ProfileReqOrRespType, ProfileRequestType } from "@/types/profile";

import { useAuth } from "./useAuth";

export function useProfile() {
  const toast = useToast();

  const { isAuthenticated, onLogout } = useAuth();

  const profile = ref<ProfileReqOrRespType | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const getProfile = async () => {
    isLoading.value = true;
    error.value = null;

    if (!isAuthenticated.value) {
      error.value = "You must be logged in to view your profile.";
      toast.error(error.value);
      isLoading.value = false;
    }

    try {
      const data = await getUserProfile();
      profile.value = data;
    } catch (err: any) {
      error.value =
        err?.message.split(" matching:")[0] ||
        "Profile services something wrong.";
      toast.error(error.value);
      setTimeout(() => {
        onLogout();
      }, 1000);
    } finally {
      isLoading.value = false;
    }
  };

  const onUpdate = async (payload: ProfileRequestType) => {
    isLoading.value = true;
    error.value = null;
    try {
      await updateProfile(payload);
      toast.success("Updated profile successfully.");
    } catch (error: any) {
      error.value = error?.message || "Login services something wrong.";
      toast.error(error.value);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    profile,
    error,
    isLoading,
    getProfile,
    onUpdate,
  };
}
