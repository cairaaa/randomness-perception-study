import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useResponsesStore = defineStore("responses", () => {
  const confidence = ref<string | null>(null);
  const difficulty = ref<string | null>(null);
  const avoidPatterns = ref<string | null>(null);
  const avoidStreaks = ref<string | null>(null);
  const ageGroup = ref<string | null>(null);
  const education = ref<string | null>(null);
  const statisticsExperience = ref<string | null>(null);

  const page1Complete = computed(() => {
    return (
      confidence.value !== null &&
      difficulty.value !== null &&
      avoidPatterns.value !== null &&
      avoidStreaks.value !== null
    );
  });

  const page2Complete = computed(() => {
    return (
      ageGroup.value !== null &&
      education.value !== null &&
      statisticsExperience.value !== null
    );
  });

  return {
    confidence,
    difficulty,
    avoidPatterns,
    avoidStreaks,
    ageGroup,
    education,
    statisticsExperience,
    page1Complete,
    page2Complete
  };
});
