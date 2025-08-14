import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

declare module 'vue-router' {
    interface RouteMeta {
        title: string
    }
}

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: { requiresAuth: true, title: "HomePage" }
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('../views/AuthView.vue')
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior() {
        return { top: 0 }
    },
    routes
});

export default router;
