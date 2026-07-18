import { defineStore } from "pinia";
import { ref } from "vue";

export const useSurveyStore = defineStore("survey", () => {
  const participantId = ref<string | null>(null);
  const surveyVersion = ref<string>("1.0.0");
  const startedAt = ref<number | null>(null);
  const completedAt = ref<number | null>(null);
  const currentStep = ref(0);
  
  function startSurvey(): void {
    participantId.value = crypto.randomUUID();
    startedAt.value = Date.now();
  }

  function completeSurvey(): void {
    completedAt.value = Date.now();
  }

  function setStep(step: number): void {
    currentStep.value = step;
  }

  function reset(): void {
    participantId.value = null;
    startedAt.value = null;
    completedAt.value = null;
    currentStep.value = 0;
  }

  return {
    participantId,
    surveyVersion,
    startedAt,
    completedAt,
    currentStep,
    startSurvey,
    completeSurvey,
    setStep,
    reset
  };
});