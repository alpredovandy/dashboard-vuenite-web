<template>
  <div class="mb-4 relative">
    <label
      :for="id"
      class="block text-sm font-medium text-gray-700 mb-1"
    >{{
      label
    }}</label>
    <div class="relative">
      <!-- Input -->
      <Field
        :id="id"
        v-model="localValue"
        :name="name"
        :type="currentType"
        :placeholder="placeholder"
        :class="[
          'w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          className,
        ]"
        validation-on-input
      />

      <!-- Password toggle icon -->
      <button
        v-if="type === 'password'"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
        type="button"
        aria-label="Toggle password visibility"
        @click="togglePassword"
      >
        <!-- Eye (show) icon -->
        <eye-icon v-if="showPassword" />

        <!-- Eye (hide) icon -->
        <eye-slash-icon v-if="!showPassword" />
      </button>
    </div>
    <!-- Error message -->
    <ErrorMessage
      :name="name"
      class="text-red-500 text-sm mt-1"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Field, ErrorMessage } from "vee-validate";

import EyeSlashIcon from "./icons/EyeSlashIcon.vue";
import EyeIcon from "./icons/EyeIcon.vue";

export default defineComponent({
  components: { Field, ErrorMessage, EyeIcon, EyeSlashIcon },
  props: {
    label: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    modelValue: { type: String as () => string | number, default: "" },
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
