import Activities from '@/views/ActivitiesPage.vue';
import Calendar from '@/views/CalendarPage.vue';
import DayProgram from '@/views/DayProgramPage.vue';
import Home from '@/views/HomePage.vue';
import Settings from '@/views/SettingsPage.vue';
import VMA from '@/views/VMAPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/day-program',
            name: 'day-program',
            component: DayProgram,
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: Calendar,
        },
        {
            path: '/activities',
            name: 'activities',
            component: Activities,
            beforeEnter: (to, from, next) => {
                const token = localStorage.getItem('stravaAccessToken');
                if (token) {
                    next();
                } else {
                    next('/');
                }
            },
        },
        {
            path: '/vma',
            name: 'vma',
            component: VMA,
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
        },
    ],
});

export default router;
