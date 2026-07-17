<script setup lang="ts">
import type { QuestionOption } from "@/types";

interface Props {
  modelValue: string | null;
  question: string;
  options: QuestionOption[];
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// import { watch } from "vue";
// import { useResponsesStore } from "@/stores/responsesStore";

// const responsesStore = useResponsesStore();

// watch(
//   responsesStore,
//   () => {
//     console.log(responsesStore.$state);
//   }
// );
</script>

<template>
  <div class="question-box">
    <p class="question">{{ question }}</p>
    <div class="question-buttons">
      <button
        v-for="option in options"
        :key="option.value"
        :class="{ selected: option.value === modelValue }"
        @click="emit('update:modelValue', option.value)"
      >
        <span class="circle"></span>
        <span>{{ option.label }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button {
  background-color: transparent;
  border: transparent;
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  text-align: left;
  cursor: pointer;
  width: 100%;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.question {
  margin-bottom: 0.75rem;
}

.question-buttons {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.5rem;
  width: max-content;
}

.circle {
  display: inline-block;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border: 1px solid #777777;
  border-radius: 50%;
}

.selected {
  .circle {
    background: #555555;
    border-color: #777777;
  }
}
</style>