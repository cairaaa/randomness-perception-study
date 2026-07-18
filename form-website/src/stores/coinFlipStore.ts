import { defineStore } from "pinia";
import { ref } from "vue";
import type { CoinSide, Flip } from "@repo/shared/types";

export const useCoinFlipStore = defineStore("coinFlip", () => {
  const flips = ref<Flip[]>([]);
  const startTime = ref<number | null>(null);

  function start(): void {
    flips.value = [];
    startTime.value = performance.now();
  }

  function addFlip(value: CoinSide): void {
    if (startTime.value == null) {
      return;
    }
    if (flips.value.length >= 50) {
      return;
    }

    flips.value.push({
      position: flips.value.length + 1,
      value,
      elapsedMs: Math.round(performance.now() - startTime.value)
    });
  }

  function reset(): void {
    flips.value = [];
    startTime.value = null;
  }

  return {
    flips,
    startTime,
    start,
    addFlip,
    reset
  };
});
