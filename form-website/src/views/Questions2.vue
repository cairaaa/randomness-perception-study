<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCoinFlipStore } from "@/stores/coinFlipStore";
import { useResponsesStore } from "@/stores/responsesStore";
import { useSurveyStore } from "@/stores/surveyStore";
import Button from "@/components/Button.vue";
import Question from "@/components/Question.vue";
import type { SurveySubmission } from "@repo/shared/types";

const router = useRouter();
const coinFlipStore = useCoinFlipStore();
const responsesStore = useResponsesStore();
const surveyStore = useSurveyStore();

const submitting = ref(false);

async function submitSurvey(): Promise<void> {
  if (submitting.value) {
    return;
  }
  submitting.value = true;

  const submission: SurveySubmission = {
    survey: {
      surveyVersion: surveyStore.surveyVersion,
      startedAt: surveyStore.startedAt,
      completedAt: surveyStore.completedAt
    },

    responses: {
      confidence: responsesStore.confidence,
      difficulty: responsesStore.difficulty,
      avoidPatterns: responsesStore.avoidPatterns,
      avoidStreaks: responsesStore.avoidStreaks,
      ageGroup: responsesStore.ageGroup,
      education: responsesStore.education,
      statisticsExperience: responsesStore.statisticsExperience
    },

    coinFlip: {
      flips: coinFlipStore.flips,
      startTime: coinFlipStore.startTime
    }
  };

  try {
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(submission)
    });
    if (!response.ok) {
      throw new Error("Failed to submit survey");
    }
    console.log(await response.json());
  } catch (error) {
    console.error("Survey submission failed:", error);
  }
}

async function nextPage(): Promise<void> {
  surveyStore.completeSurvey();
  await submitSurvey();
  surveyStore.setStep(4);
  router.push("/thank-you");
}
</script>

<template>
  <p class="page-header">Page 4 of 4</p>
  <h2>Background Information</h2>
  <div class="questions">
    <Question
      v-model="responsesStore.ageGroup"
      question="What is your age group?"
      :options="[
        { label: '18-21', value: '18_21' },
        { label: '22-25', value: '22_25' },
        { label: '26-29', value: '26_29' },
        { label: '30-35', value: '30_35' },
        { label: '36+', value: '36_plus' }
      ]"
    />
    <Question
      v-model="responsesStore.education"
      question="What is your highest completed level of education?"
      :options="[
        { label: 'Elementary school or below', value: 'elementary_or_below' },
        { label: 'High school', value: 'high_school' },
        { label: 'Bachelor\'s degree or equivalent', value: 'bachelors' },
        { label: 'Master\'s degree', value: 'masters' },
        { label: 'Doctorate', value: 'doctorate' },
        { label: 'Other', value: 'other' }
      ]"
    />
    <Question
      v-model="responsesStore.statisticsExperience"
      question="What best describes your experience with probability or statistics?"
      :options="[
        { label: 'I have no experience', value: 'none' },
        { 
          label: 'I\'ve taken one or a few introductory courses', 
          value: 'intro_courses'
        },
        {
          label: 'I\'ve studied it extensively (e.g., multiple advanced courses or as part of my degree/program)',
          value: 'advanced_study'
        },
        { label: 'Through self-study', value: 'self_study' },
        { label: 'Other', value: 'other' }
      ]"
    />
    <Button :disabled="!responsesStore.page2Complete || submitting" @click="nextPage">
      {{ submitting ? "Submitting survey..." : "Submit" }}
    </Button>
  </div>
</template>
