<template>
  <div class="mb-4 relative">
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">{{
      label
    }}</label>
    <div class="relative">
      <!-- Input -->
      <Field
        v-model="localValue"
        :id="id"
        :name="name"
        :type="currentType"
        :placeholder="placeholder"
        :class="[
          'w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          className,
        ]"
      />

      <!-- Password toggle icon -->
      <button
        v-if="type === 'password'"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
        type="button"
        @click="togglePassword"
        aria-label="Toggle password visibility"
      >
        <!-- Eye (show) icon -->
        <svg
          v-if="showPassword"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <!-- Eye (hide) icon -->
        <svg
          v-if="!showPassword"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      </button>
    </div>
    <!-- Error message -->
    <ErrorMessage :name="name" class="text-red-500 text-sm mt-1" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  components: { Field, ErrorMessage },
  props: {
    label: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    modelValue: { type: [String, Number], required: true },
    type: { type: String, default: "text" },
    placeholder: { type: String, default: "" },
    className: { type: String, default: "" },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const localValue = ref(props.modelValue);
    const showPassword = ref(false);

    // Determine current input type based on toggle
    const currentType = ref(props.type);
    watch(showPassword, (val) => {
      if (props.type === "password") {
        currentType.value = val ? "text" : "password";
      }
    });

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    // Sync localValue with parent
    watch(
      () => props.modelValue,
      (val) => {
        if (val !== localValue.value) {
          localValue.value = val;
        }
      }
    );

    // Emit update
    watch(localValue, (val) => {
      emit("update:modelValue", val);
    });

    return {
      localValue,
      togglePassword,
      showPassword,
      currentType,
    };
  },
});
</script>
