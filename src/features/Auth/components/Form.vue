<template>
  <Form
    v-slot="{ meta, handleReset }"
    :validation-schema="authFormSchema"
    class="space-y-5"
    @submit="onSubmit"
  >
    <InputField
      id="userId"
      v-model="authForm.userId"
      label="User ID*"
      name="userId"
    />

    <InputField
      id="password"
      v-model="authForm.password"
      label="Password*"
      name="password"
      type="password"
    />

    <InputField
      v-if="type !== 'login'"
      id="confirmPassword"
      v-model="authForm.confirmPassword"
      label="Confirm Password*"
      name="confirmPassword"
      type="password"
    />

    <div
      v-if="type === 'login'"
      class="flex items-center mt-4"
    >
      <Field
        id="keepLoggedIn"
        v-model="authForm.keepLoggedIn"
        type="checkbox"
        :value="true"
        :unchecked-value="false"
        name="keepLoggedIn"
        class="h-4 w-4 text-blue-600 border-gray-300 rounded"
      />
      <label
        for="keepLoggedIn"
        class="ml-2 text-sm text-gray-700"
      >Keep me logged in</label>
    </div>

    <div class="flex space-x-4 mt-3">
      <button
        type="button"
        class="flex-1 bg-red-500 text-white py-2 px-4 rounded font-semibold hover:bg-red-600 transition"
        @click="handleReset"
      >
        Cancel
      </button>

      <button
        type="submit"
        :disabled="!meta?.valid || isLoading"
        class="flex-1 bg-black text-white py-2 px-4 rounded font-semibold hover:bg-gray-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {{ isLoading ? "Loading..." : type === "login" ? "Login" : "Register" }}
      </button>
    </div>

    <div class="text-center mt-4">
      <p class="text-sm text-gray-600">
        {{ type === "login" ? "No Account?" : "Already have an account?" }}
        <router-link
          :to="type === 'login' ? '/register' : '/'"
          class="text-sky-600 underline font-medium"
        >
          {{ type === "login" ? "Register here" : "Login here" }}
        </router-link>
      </p>
    </div>
  </Form>
</template>

<script lang="ts">
import * as yup from "yup";
import { computed, defineComponent, onMounted, reactive } from "vue";
import { Field, Form } from "vee-validate";

import InputField from "@/components/InputField.vue";
import { useAuth } from "@/composables/useAuth";

export default defineComponent({
  name: "AuthForm",
  components: { InputField, Form, Field },
  props: {
    mode: {
      type: String as () => "login" | "register",
      default: "",
    },
  },
  setup(props) {
    const { isLoading, isAuthenticated, onLogin, getUser } = useAuth();

    onMounted(() => {
      if (isAuthenticated.value) {
        getUser();
      }
    });

    const type = computed(() => props.mode);

    const initialValues = {
      userId: "",
      password: "",
      confirmPassword: "",
      keepLoggedIn: false,
    };

    const authForm = reactive(initialValues);

    const authFormSchema = computed(() => {
      if (props.mode === "register") {
        return yup.object({
          userId: yup.string().required("User ID is required."),
          password: yup.string().required("Password is required."),
          confirmPassword: yup
            .string()
            .required("Confirm password is required.")
            .oneOf([yup.ref("password")], "Passwords must match"),
        });
      } else {
        return yup.object({
          userId: yup.string().required("User ID is required."),
          password: yup.string().required("Password is required."),
        });
      }
    });

    const onSubmit = (value: typeof authForm) => {
      onLogin({
        username: value.userId,
        password: value.password,
        keepMeLogged: authForm.keepLoggedIn,
      });
    };

    return { authForm, onSubmit, authFormSchema, type, isLoading };
  },
});
</script>
