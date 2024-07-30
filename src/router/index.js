import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';
import Calendar from '@/views/CalendarPage.vue';
import DailyProgram from '@/views/DayProgramPage.vue';
import Settings from '@/views/SettingsPage.vue';

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
            path: '/settings',
            name: 'settings',
            component: Settings,
        },
    ],
});

export default router;
