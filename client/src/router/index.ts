import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { RouteNames } from "@/router/RouteNames";

declare module 'vue-router' {
    interface RouteMeta {
        title: string
    }
}

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        redirect: { name: RouteNames.auth},
        meta: {
            title: 'Home page'
        },
        children: [
            {
                path: '/auth',
                name: RouteNames.auth,
                component: () => import('../views/AuthView.vue'),
                meta: {
                    title: 'Auth page'
                }
            }
        ]
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
