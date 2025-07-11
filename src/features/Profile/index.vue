<template>
  <div
    class="grid grid-cols-1 md:grid-cols-[240px_1fr] p-4 md:p-6 gap-6 md:gap-8"
  >
    <div class="fixed top-10 right-5 z-50">
      <button
        v-if="!isDesktop"
        class="p-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md"
        @click="toggleSidebar"
      >
        <menu-icon
          v-if="!isSidebarOpen"
          class="w-6 h-6"
        />
        <x-icon
          v-else
          class="w-6 h-6"
        />
      </button>
      <button
        v-else
        class="flex hover:text-sky-600 items-center text-gray-700 ml-0 md:ml-4 text-sm md:text-base whitespace-nowrap gap-2"
        @click="logout"
      >
        <logout-icon class="w-5 h-5" />
        <span class="mr-2">Logout</span>
      </button>
    </div>

    <div
      :class="[
        'md:pr-8 md:block',
        'md:relative md:mt-[4.25em]',
        'fixed inset-y-0 left-0 z-40 w-64 bg-white md:bg-transparent shadow-lg md:shadow-none transform transition-transform duration-300',
        { '-translate-x-full': !isSidebarOpen && !isDesktop }, // Slide out on mobile when closed
        { 'translate-x-0': isSidebarOpen || isDesktop }, // Slide in on mobile when open, always visible on desktop
      ]"
    >
      <nav class="space-y-4 md:space-y-6 p-4 md:p-0">
        <a
          v-for="item in sidebarItems"
          :key="item.name"
          href="#"
          :class="[
            'block text-gray-800 hover:text-gray-900 transition-colors duration-200 pb-2 text-sm md:text-base',
            activeItem === item.name
              ? 'font-semibold border-b-2 border-gray-800'
              : 'border-b border-dotted border-gray-400',
          ]"
          @click.prevent="
            setActiveItem(item.name);
            isSidebarOpen = isDesktop;
          "
        >
          {{ item.title }}
        </a>
      </nav>
      <button
        v-if="!isDesktop"
        class="my-4 px-4 underline text-sky-600"
        @click="logout"
      >
        Logout
      </button>
    </div>

    <div
      v-if="isSidebarOpen && !isDesktop"
      class="fixed inset-0 bg-black bg-opacity-50 z-30"
      @click="isSidebarOpen = false"
    />

    <div class="flex-1 md:col-span-1">
      <div class="items-start gap-y-8 md:gap-x-16">
        <div
          class="col-span-1 md:col-span-2 flex items-center justify-between mb-4 md:mb-12"
        >
          <div class="flex items-center flex-grow">
            <h1 class="text-2xl md:text-4xl text-gray-900 mr-2 md:mr-4">
              My <b>Profile</b>
            </h1>
            <div class="h-0.5 bg-gray-800 flex-grow hidden md:block" />
          </div>
          <div v-show="!isLoading && activeItem === SIDEBAR_TYPE.basic">
            <button
              v-if="!isEditing"
              class="flex items-center text-gray-700 hover:text-gray-900 underline ml-0 md:ml-4 text-sm md:text-base whitespace-nowrap"
              @click="toggleEditMode"
            >
              <span class="mr-2">Edit profile</span>
              <edit-icon class="w-5 h-5" />
            </button>
            <button
              v-else
              class="flex items-center text-gray-700 hover:text-gray-900 underline ml-0 md:ml-4 text-sm md:text-base whitespace-nowrap gap-2"
              @click="toggleEditMode"
            >
              <ChevronLeftIcon class="w-5 h-5" />
              <span class="mr-2">Go back to My Profile</span>
            </button>
          </div>
        </div>

        <div
          v-if="isLoading"
          class="my-[7.5em] md:my-[15em]"
        >
          <spinner />
        </div>
        <div v-else>
          <div
            v-if="!isEditing && activeItem === SIDEBAR_TYPE.basic"
            class="grid grid-cols-1 md:grid-cols-[auto_1fr] items-start gap-y-8 mt-10 md:gap-x-16"
          >
            <div class="flex items-center justify-center mx-auto md:mx-0">
              <img
                :src="avatar"
                class="w-20 h-20 md:w-24 md:h-24 rounded-full"
              >
            </div>
            <div class="space-y-6 md:space-y-8">
              <div>
                <label
                  class="block text-base md:text-lg font-semibold text-gray-900"
                >Name</label>
                <p class="text-gray-700 text-base md:text-lg italic">
                  {{ profile?.name ?? "-" }}
                </p>
              </div>
              <div>
                <label
                  class="block text-base md:text-lg font-semibold text-gray-900"
                >Email</label>
                <p class="text-gray-700 text-base md:text-lg italic">
                  {{ profile?.email ?? "-" }}
                </p>
              </div>
              <div>
                <label
                  class="block text-base md:text-lg font-semibold text-gray-900"
                >Password</label>
                <p class="text-gray-700 text-base md:text-lg italic">
                  {{ profile?.password ? "********" : "-" }}
                </p>
              </div>
            </div>
          </div>

          <div
            v-if="isEditing && activeItem === SIDEBAR_TYPE.basic"
            class="grid grid-cols-1 md:grid-cols-[auto_1fr] items-start gap-y-8 mt-10 md:gap-x-16"
          >
            <div class="flex items-center justify-center mx-auto md:mx-0">
              <img
                :src="avatar"
                class="w-20 h-20 md:w-24 md:h-24 rounded-full"
              >
            </div>

            <Form
              v-slot="{ meta, handleReset }"
              :validation-schema="userFormSchema"
              class="space-y-5"
              @submit="onSubmit"
            >
              <input-field
                id="name"
                v-model="userForm.name"
                label="Name*"
                name="name"
              />

              <input-field
                id="email"
                v-model="userForm.email"
                label="Email*"
                name="email"
              />

              <input-field
                id="password"
                v-model="userForm.password"
                label="Password*"
                name="password"
                type="password"
              />

              <div
                class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-3"
              >
                <button
                  type="button"
                  class="flex-1 text-neutral-600 py-2 border border-neutral-600 px-4 font-semibold rounded hover:bg-neutral-50 transition"
                  @click="handleReset"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="!meta?.valid || isLoading"
                  class="flex-1 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 font-semibold transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {{ isLoading ? "Loading..." : "Update" }}
                </button>
              </div>
            </Form>
          </div>

          <additional v-if="activeItem === SIDEBAR_TYPE.additional" />
          <spouce v-if="activeItem === SIDEBAR_TYPE.spouse" />
          <personal v-if="activeItem === SIDEBAR_TYPE.personal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as yup from "yup";

import {
  ref,
  watch,
  defineComponent,
  reactive,
  computed,
  onMounted,
} from "vue";
import { Form } from "vee-validate";

import {
  Edit as EditIcon,
  Menu as MenuIcon,
  X as XIcon,
  ChevronLeft as ChevronLeftIcon,
  LogOut as LogoutIcon,
} from "lucide-vue-next";

import { useAuth } from "@/composables/useAuth";
import { useDesktop } from "@/composables/useDesktop";
import { useProfile } from "@/composables/useProfile";

import InputField from "@/components/InputField.vue";
import Spinner from "@/components/Spinner.vue";

import { getAvatarByName } from "@/utils";

import Additional from "./components/Additional.vue";
import Spouce from "./components/Spouce.vue";
import Personal from "./components/Personal.vue";

import { sidebarItems, SIDEBAR_TYPE } from "../configs";

export default defineComponent({
  name: "ProfileFeature",
  components: {
    Form,
    InputField,
    Additional,
    Spouce,
    Personal,
    Spinner,
    EditIcon,
    MenuIcon,
    XIcon,
    ChevronLeftIcon,
    LogoutIcon,
  },
  setup() {
    const { onLogout } = useAuth();
    const { error, profile, isLoading, getProfile, onUpdate } = useProfile();
    const { isDesktop } = useDesktop();

    const activeItem = ref(SIDEBAR_TYPE.basic);
    const isSidebarOpen = ref(false);
    const isEditing = ref(false);

    const initialValues = {
      name: "",
      email: "",
      password: "",
    };

    const userForm = reactive({ ...initialValues });

    onMounted(async () => {
      await getProfile();

      if (profile.value) {
        Object.assign(userForm, {
          name: profile.value.name || "",
          email: profile.value.email || "",
          password: "",
        });
      }
    });

    watch(
      isDesktop,
      (newValue) => {
        if (newValue) {
          isSidebarOpen.value = true; // Sidebar always open on desktop
        } else {
          isSidebarOpen.value = false; // Sidebar starts closed on mobile
        }
      },
      { immediate: true }
    );

    watch(isSidebarOpen, (newValue) => {
      if (!isDesktop.value) {
        // Only apply on mobile
        document.body.style.overflow = newValue ? "hidden" : "";
      } else {
        document.body.style.overflow = ""; // Ensure reset on desktop
      }
    });

    const avatar = computed(() => {
      const name = profile.value ? profile.value.name : "";
      return getAvatarByName(name);
    });

    const userFormSchema = computed(() =>
      yup.object({
        name: yup.string().required("Name is required."),
        email: yup
          .string()
          .required("Email is required.")
          .email("Email must be a valid email"),
        password: yup.string().required("Password is required."),
      })
    );

    const onSubmit = (values: typeof userForm) => {
      onUpdate({
        id: profile?.value?.id ?? "",
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (!error.value) {
        toggleEditMode();
      }
    };

    const setActiveItem = (itemName: SIDEBAR_TYPE) =>
      (activeItem.value = itemName);

    const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);

    const toggleEditMode = () => (isEditing.value = !isEditing.value);

    const logout = () => {
      onLogout();
      window.location.replace("/");
    };

    return {
      avatar,
      profile,
      SIDEBAR_TYPE,
      sidebarItems,
      userForm,
      userFormSchema,
      isLoading,
      activeItem,
      isSidebarOpen,
      isDesktop,
      isEditing,
      logout,
      onSubmit,
      setActiveItem,
      toggleSidebar,
      toggleEditMode,
    };
  },
});
</script>
