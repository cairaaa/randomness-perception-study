import { defineStore } from "pinia";
import { ref } from "vue";

export const useSurveyStore = defineStore("survey", () => {
  const participantId = ref<string | null>(null);
  const surveyVersion = ref<string>("1.0.0");
  const startedAt = ref<number | null>(null);
  const completedAt = ref<number | null>(null);

  
  function startSurvey(): void {
    participantId.value = crypto.randomUUID();
    startedAt.value = Date.now();
  }

  function completeSurvey(): void {
    completedAt.value = Date.now();
    console.log(participantId, surveyVersion, startedAt, completedAt);
  }

  return {
    participantId,
    surveyVersion,
    startedAt,
    completedAt,
    startSurvey,
    completeSurvey
  };
});