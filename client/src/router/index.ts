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
        redirect: { name: RouteNames.login},
        meta: {
            title: 'Home page'
        },
        children: [
            {
                path: '/login',
                name: RouteNames.login,
                component: () => import('../views/AuthView.vue'),
                meta: {
                    title: 'Auth page'
                }
            },
            {
                path: '/sign',
                name: RouteNames.sign,
                component: () => import('../views/RegistrationView.vue'),
                meta: {
                    title: 'Registration page'
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
