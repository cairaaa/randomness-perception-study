<script setup lang="ts">
import { onMounted } from "vue";
import { useSurveyStore } from "@/stores/surveyStore.ts";

const surveyStore = useSurveyStore();

onMounted(() => {
  surveyStore.reset();
});
</script>

<template>
  <p>Thank you for participating!</p>
</template>