<template>
    <div
        :class="[
            'menu bg-gray-800 text-white flex flex-col justify-between',
            isSidebarOpen ? 'min-w-[225px]' : 'min-w-[80px]',
        ]"
    >
        <ul class="mt-4 ml-6">
            <li class="py-4" v-for="(link, index) in menuLinks" :key="index">
                <RouterLink
                    :class="{ 'text-indigo-400': $route.path === link.to }"
                    :to="link.to"
                    class="flex items-center"
                >
                    <FontAwesomeIcon
                        :icon="link.icon"
                        v-tooltip="!isSidebarOpen ? $t(link.text) : ''"
                        class="mr-4 text-2xl"
                    />
                    <span v-if="isSidebarOpen">{{ $t(link.text) }}</span>
                </RouterLink>
            </li>
        </ul>
        <a :href="githubLink" target="_blank" class="flex items-center py-4 ml-6">
            <FontAwesomeIcon
                :icon="faGithub"
                v-tooltip="!isSidebarOpen ? $t('githubRepo') : ''"
                class="mr-4 text-2xl"
            />
            <span v-if="isSidebarOpen">{{ $t('githubRepo') }}</span>
        </a>
        <button
            v-if="!isPortrait"
            @click="toggleSidebar"
            :class="[
                'absolute bottom-4 rounded-full border border-gray-600 bg-gray-800 p-2 hover:bg-gray-700',
                isSidebarOpen ? 'left-[209px]' : 'left-[64px]',
            ]"
        >
            <FontAwesomeIcon :icon="isSidebarOpen ? faChevronLeft : faChevronRight" class="text-xl" />
        </button>
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
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';

const { width, height } = useScreenSize();
const isPortrait = computed(() => height.value > width.value);
const isSidebarOpen = useLocalStorage('isSidebarOpen', !isPortrait.value);
const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);

const { stravaAccessToken } = useStrava();

const menuLinks = computed(() => [
    { to: '/', text: 'home', icon: faHome },
    { to: '/day-program', text: 'dayProgram', icon: faPersonRunning },
    { to: '/calendar', text: 'calendar', icon: faCalendar },
    ...(stravaAccessToken.value ? [{ to: '/activities', text: 'activities', icon: faStrava }] : []),
    { to: '/vma', text: 'vma', icon: faStopwatch },
    { to: '/settings', text: 'settings', icon: faGear },
]);

const githubLink = 'https://github.com/TheoLaperrouse/MarathonProgram';
</script>
<style scoped>
.menu {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
}
</style>
