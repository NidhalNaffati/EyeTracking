import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RecordingView from "../views/RecordingView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/recording",
    name: "recording",
    component: RecordingView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
