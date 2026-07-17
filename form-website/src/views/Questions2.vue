<script setup lang="ts">
import { useRouter } from "vue-router";
import { useResponsesStore } from "@/stores/responsesStore";
import Button from "@/components/Button.vue";
import Question from "@/components/Question.vue";

const router = useRouter();
const responsesStore = useResponsesStore();

function nextPage(): void {
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
        { label: 'Under 18', value: 'under_18' },
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
    <Button :disabled="!responsesStore.page2Complete" @click="nextPage">
      Submit
    </Button>
  </div>
</template>
