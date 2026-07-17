<script setup lang="ts">
defineProps<{
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <div class="button-container">
    <button
      :disabled="disabled"
      class="base-button"
      @click="emit('click')"
    >
      <slot></slot>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.button-container {
  display: flex;
  justify-content: flex-end;

  .base-button {
    background-color: transparent;
    border: 1px solid gray;
    border-radius: 24px;
    padding: 0.75rem;
    font-family: "Nunito", sans-serif;
    font-size: 18px;
    cursor: pointer;

    &:disabled {
      color: gray;
      border: 1px solid lightgray;
      cursor: default;
    }
  }
}
</style>