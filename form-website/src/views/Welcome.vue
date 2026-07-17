<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../components/Button.vue";

const agreed = ref(false);
const router = useRouter();

function nextPage(): void {
  router.push("/coin-flip");
}
</script>

<template>
  <div class="text-box">
    <h1 class="text-box-title">Human Randomness Perception Study</h1>
    <p>
      Thank you for considering participating in this study. This project investigates
      how people perceive and generate random sequences. The survey takes approximately
      3 - 4 minutes to complete.
    </p>
    <br>
    <p>
      Participation is entirely voluntary, and requires you to be either 18 or older.
      You may stop the survey at any time before submitting your response. No personally
      identifying information is collected, and all responses are anonymous.
    </p>
    <br>
    <p>
      Your anonymous responses may be analyzed as part of a personal research project
      and may be included in research reports, a public GitHub repository, or a student
      research journal. 
    </p>
    <br>
    <p>
      This survey includes a brief interactive activity asking you to create a random
      sequence. Please complete the survey only once and do not use any external tools,
      such as a coin, random number generator, or AI assistant.
    </p>
    <br>
    <p>
      By selecting to agree and continuing, you confirm that you have read the
      information above and consent to participate in this study.
    </p>
  </div>
  <label>
    <input v-model="agreed" type="checkbox">
    I have read the information above and agree to participate.
  </label>
  <br><br>
  <Button :disabled="!agreed" @click="nextPage"/>
</template>

<style lang="scss" scoped>
label {
  display: flex;
  gap: 0.75rem;
  width: fit-content;

  input {
    transform: scale(1.5);
  }
}
</style>
