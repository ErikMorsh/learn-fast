// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/groups",
    component: () => import("@/layouts/default/Default.vue"), // lazy load
    children: [
      {
        path: "/groups",
        name: "menu",
        components: {
          menuRoute: () => import("@/views/Menu.vue"),
          contentRoute: () => import("@/views/Content.vue"),
          panelRoute: () => import("@/views/Panel.vue"),
        },
        children: [
          {
            path: ":groupId",
            name: "group",
            components: {
              menuRoute: () => import("@/views/Menu.vue"),
              contentRoute: () => import("@/views/Content.vue"),
              panelRoute: () => import("@/views/Panel.vue"),
            },
            children: [
              {
                path: ":stageId",
                name: "stage",
                components: {
                  menuRoute: () => import("@/views/Menu.vue"),
                  contentRoute: () => import("@/views/Content.vue"),
                  panelRoute: () => import("@/views/Panel.vue"),
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
