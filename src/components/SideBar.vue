<template>
    <div
        :class="[
            'menu bg-gray-800 text-white flex flex-col justify-between fixed top-0 left-0 bottom-0',
            isSidebarOpen ? 'w-64' : 'w-20',
        ]"
    >
        <div class="px-4 py-2 border-b border-gray-700 flex items-center h-16 relative">
            <span v-if="isSidebarOpen" class="text-xl font-bold whitespace-nowrap">
                {{ $t('appName') }}
            </span>

            <button
                @click="toggleSidebar"
                class="absolute rounded-md hover:bg-gray-700"
                :class="isSidebarOpen ? 'right-4' : 'left-1/2 -translate-x-1/2'"
            >
                <FontAwesomeIcon
                    :icon="isSidebarOpen ? faChevronLeft : faChevronRight"
                    class="text-gray-300 hover:text-white text-lg"
                />
            </button>
        </div>
        <ul class="mt-2 px-3 space-y-2 flex-1 overflow-y-auto">
            <li v-for="(link, index) in menuLinks" :key="index">
                <RouterLink
                    :to="link.to"
                    class="flex items-center p-3 rounded-lg"
                    :class="{
                        'bg-gray-700 text-indigo-400': $route.path === link.to,
                        'hover:bg-gray-700': $route.path !== link.to,
                    }"
                    v-tooltip="!isSidebarOpen ? $t(link.text) : ''"
                >
                    <FontAwesomeIcon
                        :icon="link.icon"
                        class="text-xl min-w-[24px]"
                        :class="isSidebarOpen ? 'mr-3' : 'mx-auto'"
                    />
                    <span v-if="isSidebarOpen" class="truncate">{{ $t(link.text) }}</span>
                </RouterLink>
            </li>
        </ul>
        <div class="p-3 border-t border-gray-700">
            <a
                :href="githubLink"
                target="_blank"
                class="flex items-center p-2 rounded-lg hover:bg-gray-700"
                v-tooltip="!isSidebarOpen ? $t('githubRepo') : ''"
            >
                <FontAwesomeIcon
                    :icon="faGithub"
                    class="text-xl min-w-[24px]"
                    :class="isSidebarOpen ? 'mr-3' : 'mx-auto'"
                />
                <span v-if="isSidebarOpen" class="truncate">{{ $t('githubRepo') }}</span>
            </a>
        </div>
    </div>
</template>

<script setup>
import { useScreenSize } from '@/composables/useScreenSize';
import { useStrava } from '@/composables/useStrava';
import { faGithub, faStrava } from '@fortawesome/free-brands-svg-icons';
import {
    faHome,
    faCalendar,
    faStopwatch,
    faChevronLeft,
    faChevronRight,
    faGear,
    faPersonRunning,
    faMap,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';

const { isPortrait } = useScreenSize();

const isSidebarOpen = useLocalStorage('isSidebarOpen', !isPortrait.value);
const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);

const { stravaAccessToken } = useStrava();

const menuLinks = computed(() => [
    { to: '/', text: 'home', icon: faHome },
    { to: '/day-program', text: 'dayProgram', icon: faPersonRunning },
    { to: '/calendar', text: 'calendar', icon: faCalendar },
    ...(stravaAccessToken.value ? [{ to: '/activities', text: 'activities', icon: faStrava }] : []),
    ...(stravaAccessToken.value ? [{ to: '/map', text: 'map', icon: faStrava }] : []),
    { to: '/map', text: 'map', icon: faMap },
    { to: '/vma', text: 'vma', icon: faStopwatch },
    { to: '/settings', text: 'settings', icon: faGear },
]);

const githubLink = 'https://github.com/TheoLaperrouse/MarathonProgram';
</script>

<style scoped>
/* Animation pour les transitions */
.fa-icon {
    flex-shrink: 0;
}
</style>
