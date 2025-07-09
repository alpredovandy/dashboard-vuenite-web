<template>
  <Form
    @submit="onSubmit"
    :validation-schema="formLoginSchema"
    class="space-y-5"
  >
    <!-- User ID -->
    <InputField
      label="User ID"
      id="userId"
      name="userId"
      v-model="formLogin.userId"
      placeholder="Enter your user ID"
    />

    <!-- Password -->
    <InputField
      label="Password"
      id="password"
      name="password"
      v-model="formLogin.password"
      type="password"
      placeholder="Enter your password"
    />

    <!-- Keep me logged in -->
    <div class="flex items-center">
      <input
        type="checkbox"
        id="keepLoggedIn"
        v-model="formLogin.keepLoggedIn"
        class="h-4 w-4 text-blue-600 border-gray-300 rounded"
      />
      <label for="keepLoggedIn" class="ml-2 text-sm text-gray-700"
        >Keep me logged in</label
      >
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      class="w-full bg-black text-white py-2 px-4 rounded font-semibold hover:bg-gray-800 transition"
    >
      Login
    </button>
  </Form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { Form } from "vee-validate";
import InputField from "@/components/InputField.vue";
import * as yup from "yup";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/configs";

export default defineComponent({
  name: "FormLogin",
  components: { InputField, Form },
  setup() {
    const formLogin = reactive({
      userId: "",
      password: "",
      keepLoggedIn: false,
    });

    const formLoginSchema = yup.object({
      userId: yup.string().required("User ID is required."),
      password: yup.string().required("Password is required."),
    });

    const onSubmit = (values: typeof formLogin) => {
      console.log("fox Form submitted with:", values);

      if (values.keepLoggedIn) {
        // Save a persistent cookie for 1 year
        Cookies.set(ACCESS_TOKEN, "session-token", { expires: 365 });
      } else {
        // Remove the cookie if exists
        Cookies.remove(ACCESS_TOKEN);
      }
    };

    return { formLogin, onSubmit, formLoginSchema };
  },
});
</script>
