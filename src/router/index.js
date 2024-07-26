import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/daily-program',
            name: 'daily-program',
            component: Home,
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: Home,
        },
    ],
});

export default router;
