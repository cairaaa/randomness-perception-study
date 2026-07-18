<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCoinFlipStore } from "@/stores/coinFlipStore.ts";
import { useSurveyStore } from "@/stores/surveyStore.ts";
import Button from "@/components/Button.vue";

const router = useRouter();
const coinFlipStore = useCoinFlipStore();
const surveyStore = useSurveyStore();

const started = ref(false);
const flipNumber = computed(() => coinFlipStore.flips.length + 1);
const sequence = computed(() => {
  return coinFlipStore.flips.map((flip) => flip.value).join("");
});
const finished = computed(() => coinFlipStore.flips.length === 50);

function startActivity(): void {
  started.value = true;
  coinFlipStore.start();
}

function nextPage(): void {
  surveyStore.setStep(2);
  router.push("/questions-1");
}
</script>

<template>
  <p class="page-header">Page 2 of 4</p>
  <div class=".text-box">
    <p>
      Imagine you flipped a fair coin 50 times.
    </p>
    <br>
    <p>
      Without actually flipping a coin or using any external tool, create a sequence of
      50 Heads or Tails that <strong>you believe looks as random as possible.</strong>
    </p>
    <br>
    <p>
      Enter your sequence by selecting the buttons “Heads” or “Tails” until all 50
      positions are filled.
    </p>
    <br>
  </div>
  <Button v-if="!started" @click="startActivity">
    Start
  </Button>
  <div v-if="started" class="coin-flip-activity">
    <p v-if="!finished">
      Progress: Flip {{ flipNumber }} of 50
    </p>
    <p v-else>
      Completed! (50 / 50)
    </p>
    <p class="sequence">
      Sequence: {{ sequence }}
    </p>
    <div class="coin-buttons">
      <button class="heads-button" @click="coinFlipStore.addFlip('H')">
        Heads
      </button>
      <button class="tails-button" @click="coinFlipStore.addFlip('T')">
        Tails
      </button>
    </div>
    <Button :disabled="!finished" @click="nextPage">
      Next ->
    </Button>
  </div>
</template>

<style lang="scss" scoped>
.button-container {
  justify-content: center;
}

.coin-flip-activity {
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    margin: 0.5rem 0;
  }

  .progress {
    font-size: 20px;
  }

  .sequence {
    width: 100%;
    max-width: 100%;
    overflow-wrap: break-word;
    word-break: break-all;
    text-align: center;
  }
}

.coin-buttons {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  width: 100%;
  gap: 20%;
  
  button {
    width: 12rem;
    height: 12rem;
    padding: 3.5rem;
    font-size: 32px;
    border-radius: 50%;
    border: 2px solid darkgray;
    cursor: pointer;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  }

  .heads-button {
    background-color: rgb(226, 154, 154);

    &:active {
      background-color: rgb(216, 144, 144);
    }
  }

  .tails-button {
    background-color: rgb(160, 160, 214);

    &:active {
      background-color: rgb(150, 150, 204);
    }
  }
}

@media screen and (max-width: 768px) {
  .coin-buttons {
    button {
      width: 10rem;
      height: 10rem;
      padding: 2rem;
      font-size: 24px;
    }
  }
}

@media screen and (max-width: 600px) {
  .coin-buttons {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    button {
      width: 12rem;
      height: 12rem;
      padding: 3.5rem;
      font-size: 32px;
    }
  }
}
</style>