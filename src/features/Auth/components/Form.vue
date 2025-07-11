<template>
  <Form
    v-slot="{ meta, handleReset }"
    :validation-schema="authFormSchema"
    class="space-y-5"
    @submit="onSubmit"
  >
    <input-field
      v-if="type !== AUTH_FORM.login"
      id="name"
      v-model="authForm.name"
      label="Name*"
      name="name"
    />

    <input-field
      id="email"
      v-model="authForm.email"
      label="Email*"
      name="email"
    />

    <input-field
      id="password"
      v-model="authForm.password"
      label="Password*"
      name="password"
      type="password"
    />

    <input-field
      v-if="type !== AUTH_FORM.login"
      id="confirmPassword"
      v-model="authForm.confirmPassword"
      label="Confirm Password*"
      name="confirmPassword"
      type="password"
    />

    <div
      v-if="type === AUTH_FORM.login"
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

    <div class="flex flex-row justify-between space-x-4 mt-8">
      <button
        class="w-full text-red-500 py-2 bg-white border border-red-500 px-4 font-semibold rounded hover:bg-red-50 transition"
        @click="handleReset"
      >
        Cancel
      </button>

      <button
        type="submit"
        :disabled="!meta?.valid || isLoading"
        class="w-full bg-black/90 text-white py-2 px-4 rounded font-semibold hover:bg-gray-700/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isLoading ? "Loading..." : type === "login" ? "Login" : "Register" }}
      </button>
    </div>

    <div class="text-center mt-4">
      <p class="text-sm text-gray-600">
        {{
          type === AUTH_FORM.login
            ? "Don't have an account?"
            : "Already have an account?"
        }}
        <router-link
          :to="type === AUTH_FORM.login ? '/register' : '/'"
          class="text-sky-600 underline font-medium"
        >
          {{ type === AUTH_FORM.login ? "Register here" : "Login here" }}
        </router-link>
      </p>
    </div>
  </Form>
</template>

<script lang="ts">
import * as yup from "yup";
import { computed, defineComponent, reactive, watch } from "vue";
import { Field, Form } from "vee-validate";
import { useRouter } from "vue-router";

import InputField from "@/components/InputField.vue";
import { useAuth } from "@/composables/useAuth";

import { AUTH_FORM } from "../../configs";

export default defineComponent({
  name: "AuthForm",
  components: { InputField, Form, Field },
  props: {
    mode: {
      type: String as () => AUTH_FORM,
      default: "",
    },
  },
  setup(props) {
    const router = useRouter();
    const { isLoading, onLogin, onRegister } = useAuth();

    const type = computed(() => props.mode);

    const initialValues = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      keepLoggedIn: false,
    };

    const authForm = reactive({ ...initialValues });

    watch(
      () => props.mode,
      (newMode, oldMode) => {
        if (newMode !== oldMode) {
          // Resets all properties of authForm to their initial state
          Object.assign(authForm, initialValues);
        }
      },
      { immediate: true }
    );

    const authFormSchema = computed(() => {
      if (type.value === AUTH_FORM.login) {
        return yup.object({
          email: yup
            .string()
            .required("Email is required.")
            .email("Email must be a valid email"),
          password: yup.string().required("Password is required."),
        });
      } else {
        return yup.object({
          name: yup.string().required("Name is required."),
          email: yup
            .string()
            .required("Email is required.")
            .email("Email must be a valid email"),
          password: yup.string().required("Password is required."),
          confirmPassword: yup
            .string()
            .required("Confirm password is required.")
            .oneOf([yup.ref("password")], "Passwords must match"),
        });
      }
    });

    const onSubmit = (values: typeof authForm) => {
      if (type.value === AUTH_FORM.login) {
        onLogin({
          email: values.email,
          password: values.password,
          keepMeLogged: authForm.keepLoggedIn,
        }).then(() => {
          setTimeout(() => {
            router.push("/profile");
          }, 500);
        });
      } else {
        onRegister({
          name: values.name,
          email: values.email,
          password: values.password,
        }).then(() => {
          setTimeout(() => {
            router.push("/");
          }, 1500);
        });
      }
    };

    return { authForm, onSubmit, authFormSchema, type, AUTH_FORM, isLoading };
  },
});
</script>
