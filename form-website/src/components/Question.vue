<script setup lang="ts">
import type { QuestionOption } from "@repo/shared/types";

interface Props {
  modelValue: string | null;
  question: string;
  options: QuestionOption[];
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
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
  align-items: flex-start;
  cursor: pointer;
  width: 100%;
  display: flex;
  gap: 0.5rem;

  span:last-child {
    flex: 1;
    min-width: 0;
    overflow-wrap: break-word;
    text-align: left;
  }
}

.question-box {
  border: 2px solid lightgray;
  border-radius: 32px;
  padding: 1.5rem;
  background-color: #f8f8f8;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
}

.question {
  margin-bottom: 0.75rem;
}

.question-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
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