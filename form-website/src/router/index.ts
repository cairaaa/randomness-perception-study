import { createRouter, createWebHistory } from "vue-router";
import Welcome from "@/views/Welcome.vue";
import CoinFlip from "@/views/CoinFlip.vue";
import Questions1 from "@/views/Questions1.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Welcome },
    { path: "/coin-flip", component: CoinFlip },
    { path: "/questions-1", component: Questions1 }
    // { path: "/questions-2", component: Questions2 },
    // { path: "/thank-you", component: ThankYou }
  ]
});

export default router;
