import { createRouter, createWebHistory } from "vue-router";
import { useSurveyStore } from "@/stores/surveyStore";
import Welcome from "@/views/Welcome.vue";
import CoinFlip from "@/views/CoinFlip.vue";
import Questions1 from "@/views/Questions1.vue";
import Questions2 from "@/views/Questions2.vue";
import ThankYou from "@/views/ThankYou.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Welcome },
    { path: "/coin-flip", component: CoinFlip },
    { path: "/questions-1", component: Questions1 },
    { path: "/questions-2", component: Questions2 },
    { path: "/thank-you", component: ThankYou }
  ]
});

router.beforeEach((to) => {
  const surveyStore = useSurveyStore();
  const requiredStep = to.meta.step as number;
  if (
    to.path !== "/" &&
    surveyStore.participantId === null
  ) {
    return "/";
  }
  if (
    requiredStep !== undefined &&
    requiredStep > surveyStore.currentStep
  ) {
    return "/";
  }
  return true;
});

router.afterEach(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

export default router;
