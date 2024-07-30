import Calendar from '@/views/CalendarPage.vue';
import DailyProgram from '@/views/DayProgramPage.vue';
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
            name: 'daily-program',
            component: DailyProgram,
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: Calendar,
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
