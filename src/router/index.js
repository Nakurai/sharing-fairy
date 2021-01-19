import { createRouter, createWebHistory } from "vue-router";
import Send from "../views/Send.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Send,
  },
  {
    path: "/send",
    name: "Send",
    component: Send,
  },
  {
    path: "/receive",
    name: "Receive",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "receive" */ "../views/Receive.vue"),
  },
  {
    path: "/peers",
    name: "Peers",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "peers" */ "../views/Peers.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
