<script setup lang="ts">
import { useRouter } from "vue-router";
import { useResponsesStore } from "@/stores/responsesStore";
import Button from "@/components/Button.vue";
import Question from "@/components/Question.vue";

const router = useRouter();
const responsesStore = useResponsesStore();

function nextPage(): void {
  router.push("/questions-2");
}
</script>

<template>
  <h2>About Your Sequence</h2>
  <div class="questions">
    <Question
      v-model="responsesStore.confidence"
      question="How confident are you that your sequence appears random?"
      :options="[
        { label: '5 - Extremely confident', value: '5' },
        { label: '4', value: '4' },
        { label: '3', value: '3' },
        { label: '2', value: '2' },
        { label: '1 - Not confident at all', value: '1' }
      ]"
    />
    <Question
      v-model="responsesStore.difficulty"
      question="How difficult did you find this task?"
      :options="[
        { label: '5 - Very difficult', value: '5' },
        { label: '4', value: '4' },
        { label: '3', value: '3' },
        { label: '2', value: '2' },
        { label: '1 - Very easy', value: '1' }
      ]"
    />
    <Question
      v-model="responsesStore.avoidPatterns"
      question="While creating your sequence, did you try to avoid obvious patterns (for example, HTHTHT)?"
      :options="[
        { label: 'Yes', value: 'yes' },
        { label: 'Somewhat', value: 'somewhat' },
        { label: 'No', value: 'no' },
        { label: 'Not sure', value: 'not_sure' }
      ]"
    />
    <Question
      v-model="responsesStore.avoidStreaks"
      question="While creating your sequence, did you intentionally try to avoid long streaks (for example, HHHHH)?"
      :options="[
        { label: 'Yes', value: 'yes' },
        { label: 'Somewhat', value: 'somewhat' },
        { label: 'No', value: 'no' },
        { label: 'Not sure', value: 'not_sure' }
      ]"
    />
    <Button :disabled="!responsesStore.page1Complete" @click="nextPage">
      Next ->
    </Button>
  </div>
</template>
